"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Send, Loader2, ArrowRight } from "lucide-react";
import { Turnstile } from "@marsidev/react-turnstile";
import { cn } from "@/lib/utils";
import type { ChatMessage } from "@/lib/alice/types";

const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

interface AliceChatProps {
  onClose: () => void;
  onCloseRefReady: (fn: () => void) => void;
}

export default function AliceChat({ onClose, onCloseRefReady }: AliceChatProps) {
  // Intake form state
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formCompleted, setFormCompleted] = useState(false);

  // Chat state
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [historyLoaded, setHistoryLoaded] = useState(false);
  const [showClosePopup, setShowClosePopup] = useState(false);
  const [ratingSubmitted, setRatingSubmitted] = useState(false);
  const [ratingState, setRatingState] = useState<"idle" | "submitting" | "done">("idle");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const visitorMessageCount = messages.filter((m) => m.role === "user").length;

  const handleCloseClick = useCallback(() => {
    if (visitorMessageCount >= 3 && !ratingSubmitted && ratingState === "idle") {
      setShowClosePopup(true);
    } else {
      onClose();
    }
  }, [visitorMessageCount, ratingSubmitted, ratingState, onClose]);

  useEffect(() => {
    onCloseRefReady(handleCloseClick);
  }, [handleCloseClick, onCloseRefReady]);

  // Load session ID and conversation history on mount
  useEffect(() => {
    const stored = localStorage.getItem("alice_session_id");
    if (stored) {
      setSessionId(stored);
      setFormCompleted(true); // returning visitor, skip form
      fetch(`/api/chat/history?sessionId=${encodeURIComponent(stored)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.messages && data.messages.length > 0) {
            setMessages(data.messages);
          }
        })
        .catch(() => {})
        .finally(() => setHistoryLoaded(true));
    } else {
      setHistoryLoaded(true);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    if (formCompleted) {
      inputRef.current?.focus();
    } else {
      nameInputRef.current?.focus();
    }
  }, [formCompleted]);

  // Handle intake form submission
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = formName.trim();
    const email = formEmail.trim();
    if (!name || !email) return;

    setFormSubmitting(true);

    // Send the first message with name and email to Alice
    const introMessage = `Hi, my name is ${name} and my email is ${email}.`;

    try {
      const requestBody: {
        message: string;
        history: { role: string; content: string }[];
        turnstileToken?: string;
      } = {
        message: introMessage,
        history: [],
      };

      if (turnstileToken) {
        requestBody.turnstileToken = turnstileToken;
      }

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      const data = await res.json();

      if (res.ok && data.reply) {
        setMessages([
          { role: "user", content: introMessage },
          { role: "assistant", content: data.reply },
        ]);
        if (data.sessionId) {
          setSessionId(data.sessionId);
          localStorage.setItem("alice_session_id", data.sessionId);
        }
        if (data.conversationId) {
          setConversationId(data.conversationId);
        }
        setFormCompleted(true);
      } else if (res.status === 403) {
        setMessages([
          { role: "user", content: introMessage },
          { role: "assistant", content: "Unable to verify your browser. Please refresh the page and try again." },
        ]);
        setFormCompleted(true);
      } else {
        setMessages([
          { role: "user", content: introMessage },
          { role: "assistant", content: data.error || "I'm having a brief technical issue. Please try again in a moment." },
        ]);
        setFormCompleted(true);
      }
    } catch {
      setMessages([
        { role: "user", content: introMessage },
        { role: "assistant", content: "I'm having a brief technical issue. Please try again in a moment." },
      ]);
      setFormCompleted(true);
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleRatingClick = async (rating: "helpful" | "not_helpful") => {
    if (!conversationId) { onClose(); return; }
    setRatingState("submitting");
    try {
      const response = await fetch("/api/alice/rating", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversationId, rating }),
      });
      if (response.ok) {
        setRatingState("done");
        setRatingSubmitted(true);
        setTimeout(() => { setShowClosePopup(false); onClose(); }, 1000);
      } else { setShowClosePopup(false); onClose(); }
    } catch { setShowClosePopup(false); onClose(); }
  };

  const handleSkipRating = () => { setShowClosePopup(false); onClose(); };

  const handleSend = async (text?: string) => {
    const msg = text || input.trim();
    if (!msg || isLoading) return;
    setInput("");

    const userMessage: ChatMessage = { role: "user", content: msg };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const history = messages.map((m) => ({ role: m.role, content: m.content }));
      const requestBody: {
        message: string;
        history: { role: string; content: string }[];
        sessionId?: string;
        turnstileToken?: string;
      } = { message: msg, history };

      if (sessionId) {
        requestBody.sessionId = sessionId;
      } else if (turnstileToken) {
        requestBody.turnstileToken = turnstileToken;
      }

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      const data = await res.json();

      if (res.status === 403) {
        if (data.error === "turnstile_required" || data.error === "turnstile_failed") {
          setMessages((prev) => [...prev, { role: "assistant", content: "Unable to verify your browser. Please refresh the page and try again." }]);
        } else {
          setMessages((prev) => [...prev, { role: "assistant", content: data.message || "Access denied. Please try again." }]);
        }
      } else if (res.ok && data.reply) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
        if (data.sessionId && data.sessionId !== sessionId) {
          setSessionId(data.sessionId);
          localStorage.setItem("alice_session_id", data.sessionId);
        }
        if (data.conversationId && !conversationId) {
          setConversationId(data.conversationId);
        }
      } else {
        setMessages((prev) => [...prev, { role: "assistant", content: data.error || "I'm having a brief technical issue. Please try again in a moment." }]);
      }
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "I'm having a brief technical issue. Please try again in a moment." }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!historyLoaded) {
    return (
      <div className="flex flex-col flex-1 min-h-0 items-center justify-center">
        <span className="text-xs text-gray-400 italic">Loading conversation...</span>
      </div>
    );
  }

  // Show intake form for new visitors
  if (!formCompleted) {
    return (
      <div className="flex flex-col flex-1 min-h-0 relative">
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="w-full max-w-sm">
            <div className="text-center mb-6">
              <h3 className="text-white text-lg font-bold mb-2">Welcome to Pixelette Certified</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                I'm Alice, your AI accreditation advisor. Enter your details below and I'll help you find the right certification for your business.
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label htmlFor="alice-name" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                  Your name
                </label>
                <input
                  ref={nameInputRef}
                  id="alice-name"
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Sarah"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5
                    text-sm text-white placeholder:text-gray-500
                    focus:outline-none focus:border-[#C9A84C]/50 focus:ring-1 focus:ring-[#C9A84C]/30
                    transition-colors"
                  disabled={formSubmitting}
                />
              </div>

              <div>
                <label htmlFor="alice-email" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                  Work email
                </label>
                <input
                  id="alice-email"
                  type="email"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  placeholder="e.g. sarah@company.com"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5
                    text-sm text-white placeholder:text-gray-500
                    focus:outline-none focus:border-[#C9A84C]/50 focus:ring-1 focus:ring-[#C9A84C]/30
                    transition-colors"
                  disabled={formSubmitting}
                />
              </div>

              <button
                type="submit"
                disabled={formSubmitting || !formName.trim() || !formEmail.trim()}
                className="w-full bg-[#C9A84C] hover:bg-[#d4b55c] text-[#0A1628] font-semibold
                  py-2.5 px-4 rounded-xl transition-colors disabled:opacity-50 disabled:hover:bg-[#C9A84C]
                  flex items-center justify-center gap-2"
              >
                {formSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    Start chatting <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Turnstile loads in background during form */}
        {siteKey && (
          <div style={{ visibility: "hidden", position: "absolute", pointerEvents: "none", width: 0, height: 0, overflow: "hidden" }}>
            <Turnstile
              siteKey={siteKey}
              onSuccess={(token) => setTurnstileToken(token)}
              onError={() => setTurnstileToken(null)}
              onExpire={() => setTurnstileToken(null)}
              options={{ theme: "dark", size: "invisible" }}
            />
          </div>
        )}
      </div>
    );
  }

  // Chat view (after form completed or returning visitor)
  return (
    <div className="flex flex-col flex-1 min-h-0 relative">
      {/* Messages */}
      <div className="flex-1 min-h-0 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map((msg, i) => (
          <div key={i} className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}>
            <div className={cn(
              "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
              msg.role === "user"
                ? "bg-[#C9A84C] text-[#0A1628] rounded-br-sm font-medium"
                : "bg-white/10 text-gray-200 rounded-bl-sm"
            )}>
              {msg.role === "assistant" && (
                <span className="block text-[10px] font-bold uppercase tracking-wider text-[#C9A84C] mb-1">Alice</span>
              )}
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white/10 rounded-2xl rounded-bl-sm px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]/70 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]/70 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]/70 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
                <span className="text-xs italic text-gray-400">Alice is thinking...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="px-4 pb-4 pt-2 border-t border-white/10 shrink-0">
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5
              text-sm text-white placeholder:text-gray-500
              focus:outline-none focus:border-[#C9A84C]/50 focus:ring-1 focus:ring-[#C9A84C]/30
              transition-colors"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="w-10 h-10 rounded-xl bg-[#C9A84C] hover:bg-[#d4b55c]
              disabled:opacity-50 disabled:hover:bg-[#C9A84C]
              flex items-center justify-center text-[#0A1628] transition-colors shrink-0"
            aria-label="Send message"
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </button>
        </form>
      </div>

      {/* Turnstile */}
      {siteKey && (
        <div style={{ visibility: "hidden", position: "absolute", pointerEvents: "none", width: 0, height: 0, overflow: "hidden" }}>
          <Turnstile
            siteKey={siteKey}
            onSuccess={(token) => setTurnstileToken(token)}
            onError={() => setTurnstileToken(null)}
            onExpire={() => setTurnstileToken(null)}
            options={{ theme: "dark", size: "invisible" }}
          />
        </div>
      )}

      {/* Close confirmation popup */}
      {showClosePopup && (
        <div
          className="absolute inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: "rgba(10, 22, 40, 0.85)", backdropFilter: "blur(4px)" }}
        >
          <div className="bg-[#0A1628] border border-[#C9A84C] rounded-lg p-6 shadow-2xl" style={{ width: "280px" }}>
            {ratingState === "done" ? (
              <div className="text-center py-4">
                <div className="text-[#C9A84C] text-4xl mb-2">{"\u2713"}</div>
                <div className="text-white text-base font-medium">Thanks for your feedback</div>
              </div>
            ) : (
              <>
                <h3 className="text-white text-lg font-semibold mb-1 text-center">Was Alice helpful?</h3>
                <p className="text-gray-400 text-xs mb-5 text-center">Your feedback helps us improve</p>
                <div className="flex gap-3 mb-3">
                  <button
                    onClick={() => handleRatingClick("helpful")}
                    disabled={ratingState === "submitting"}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2.5 px-4 rounded-lg font-medium disabled:opacity-50 transition-colors"
                  >
                    {"\uD83D\uDC4D"} Yes
                  </button>
                  <button
                    onClick={() => handleRatingClick("not_helpful")}
                    disabled={ratingState === "submitting"}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2.5 px-4 rounded-lg font-medium disabled:opacity-50 transition-colors"
                  >
                    {"\uD83D\uDC4E"} No
                  </button>
                </div>
                <button
                  onClick={handleSkipRating}
                  disabled={ratingState === "submitting"}
                  className="w-full text-gray-400 hover:text-gray-200 text-sm py-1 disabled:opacity-50"
                >
                  Skip
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
