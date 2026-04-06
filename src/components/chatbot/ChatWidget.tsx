"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  role: "assistant" | "user";
  content: string;
}

const quickActions = [
  "What ISO do I need?",
  "How long does certification take?",
  "What does it cost?",
];

const FALLBACK_RESPONSES: Record<string, string> = {
  default:
    "Thanks for your question! For a detailed answer tailored to your situation, I'd recommend booking a free 30-minute gap analysis call with one of our consultants. Would you like me to help you set that up?",
  iso: "Based on what most UK technology companies need, ISO 27001 is usually the right starting point, it's required by enterprise clients globally. If you also sell to UK government, you'll want Cyber Essentials too. Our typical implementation runs 10–12 weeks from £8,500. Want me to book a free gap analysis call to assess your specific situation?",
  cost: "Our ISO 27001 fees start from £8,500, with total cost including certification body audit fees typically £13,000–£18,000 for most SMEs. Cyber Essentials starts from £1,800. vCISO retainers start from £2,800/month. Want a more specific estimate? A free gap analysis call can give you an exact figure.",
  time: "Our standard ISO 27001 implementation runs 10–12 weeks from kickoff to Stage 2 audit. Cyber Essentials takes just 2–3 weeks. More complex organisations may take 14–16 weeks. The timeline depends on your current security posture, a free gap analysis call will give you a specific timeline.",
  hello: "Hi! I'm Clara, your compliance assistant at Pixelette Certified. I can help you understand which certification you need, what it costs, and how long it takes. What would you like to know?",
};

function getResponse(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey"))
    return FALLBACK_RESPONSES.hello;
  if (lower.includes("iso") || lower.includes("cert") || lower.includes("which") || lower.includes("need"))
    return FALLBACK_RESPONSES.iso;
  if (lower.includes("cost") || lower.includes("price") || lower.includes("£") || lower.includes("much"))
    return FALLBACK_RESPONSES.cost;
  if (lower.includes("time") || lower.includes("long") || lower.includes("week") || lower.includes("fast"))
    return FALLBACK_RESPONSES.time;
  return FALLBACK_RESPONSES.default;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi, I'm Clara. Most people come here because a client or investor has asked for a certification they don't have yet. Is that what brought you here?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (text?: string) => {
    const msg = text || input.trim();
    if (!msg) return;
    setInput("");

    const userMessage: Message = { role: "user", content: msg };
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate typing delay
    await new Promise((r) => setTimeout(r, 800 + Math.random() * 700));

    const response = getResponse(msg);
    setMessages((prev) => [...prev, { role: "assistant", content: response }]);
    setIsTyping(false);
  };

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-accent to-accent-dark
              rounded-full shadow-glow-accent hover:shadow-glow-lg
              flex items-center justify-center text-white transition-all duration-500
              hover:-translate-y-1 hover:scale-105"
            aria-label="Open chat with Clara"
          >
            <MessageCircle className="h-6 w-6" />
            {/* Pulse ring */}
            <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-20" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[520px]
              glass-card rounded-2xl shadow-glow-lg
              flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-accent/5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <div className="font-bold text-white text-sm">Clara</div>
                  <div className="text-xs text-accent">Compliance Assistant</div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                aria-label="Close chat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex",
                    msg.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                      msg.role === "user"
                        ? "bg-accent text-white rounded-br-sm"
                        : "bg-white/10 text-gray-200 rounded-bl-sm"
                    )}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/10 rounded-2xl rounded-bl-sm px-4 py-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-accent/60 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 rounded-full bg-accent/60 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 rounded-full bg-accent/60 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick actions */}
            {messages.length <= 2 && (
              <div className="px-4 pb-2 flex flex-wrap gap-2">
                {quickActions.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSend(q)}
                    className="text-xs px-3 py-1.5 rounded-full border border-accent/30 text-accent
                      hover:bg-accent/10 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="px-4 pb-4 pt-2 border-t border-white/10">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask Clara anything..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5
                    text-sm text-white placeholder:text-gray-500
                    focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/30
                    transition-colors"
                  disabled={isTyping}
                />
                <button
                  type="submit"
                  disabled={isTyping || !input.trim()}
                  className="w-10 h-10 rounded-xl bg-accent hover:bg-accent-light
                    disabled:opacity-50 disabled:hover:bg-accent
                    flex items-center justify-center text-white transition-colors shrink-0"
                  aria-label="Send message"
                >
                  {isTyping ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
