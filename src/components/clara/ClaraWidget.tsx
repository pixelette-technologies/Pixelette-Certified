"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import ClaraChat from "./ClaraChat";

export default function ClaraWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const closeRef = useRef<(() => void) | null>(null);

  const handleCloseClick = useCallback(() => {
    if (closeRef.current) {
      closeRef.current();
    } else {
      setIsOpen(false);
    }
  }, []);

  const forceClose = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) handleCloseClick();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleCloseClick]);

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 group"
          >
            {/* Hover label */}
            <span className="pointer-events-none whitespace-nowrap
              bg-[#0A1628] border border-[#C9A84C]/50 text-white text-xs font-medium
              px-4 py-2 rounded-xl shadow-lg
              opacity-0 translate-x-2
              group-hover:opacity-100 group-hover:translate-x-0
              transition-all duration-300 ease-out">
              Need help with certifications?
            </span>

            <button
              onClick={() => setIsOpen(true)}
              className="w-16 h-16 bg-[#0A1628]
                rounded-full shadow-lg hover:shadow-xl
                flex items-center justify-center transition-all duration-300
                hover:-translate-y-1 hover:bg-[#111f38] relative shrink-0 p-3"
              aria-label="Open chat with Clara"
              title="Chat with Clara about certifications"
            >
              <img
                src="/logos/favicon.svg"
                alt="Clara"
                className="w-8 h-8 group-hover:scale-110 transition-transform duration-300"
              />
              <span className="absolute inset-0 rounded-full bg-[#C9A84C] animate-ping opacity-15" />
            </button>
          </motion.div>
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
            className="fixed z-50
              bottom-0 right-0 left-0 top-0
              h-[100dvh] w-full
              md:bottom-6 md:right-6 md:left-auto md:top-auto
              md:w-[400px] md:h-[600px]
              rounded-none md:rounded-2xl shadow-2xl overflow-hidden
              flex flex-col
              border-0 md:border border-white/10"
            style={{ background: "linear-gradient(145deg, #0A1628 0%, #0d1e35 50%, #0A1628 100%)" }}
          >
            {/* Header — pinned, never scrolls */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10
              bg-gradient-to-r from-[#0A1628] to-[#0d1e35] shrink-0 z-10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#0A1628] border border-[#C9A84C]/40
                  flex items-center justify-center shrink-0 p-1.5">
                  <img src="/logos/favicon.svg" alt="Clara" className="w-full h-full" />
                </div>
                <div>
                  <div className="font-bold text-white text-sm">Clara</div>
                  <div className="text-[11px] text-gray-400">AI Accreditation Advisor</div>
                </div>
              </div>
              <button
                onClick={handleCloseClick}
                className="p-3 min-w-[44px] min-h-[44px] rounded-lg hover:bg-white/10 text-gray-400
                  hover:text-white transition-colors flex items-center justify-center"
                aria-label="Close chat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Chat area */}
            <ClaraChat onClose={forceClose} onCloseRefReady={(fn) => { closeRef.current = fn; }} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
