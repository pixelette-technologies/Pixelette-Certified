"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Close } from "@/components/ui/icons";
import AliceChat from "./AliceChat";

export default function AliceWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const closeRef = useRef<(() => void) | null>(null);
  const reduce = useReducedMotion();

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
            transition={reduce ? { duration: 0 } : undefined}
            className="group fixed bottom-6 right-6 z-50 flex items-center gap-3"
          >
            {/* Hover label */}
            <span className="pointer-events-none whitespace-nowrap
              rounded-[4px] border border-panel-line bg-footer
              px-4 py-2 text-xs font-medium text-footer-heading shadow-lg
              opacity-0 translate-x-2
              transition-all duration-300 ease-out
              group-hover:translate-x-0 group-hover:opacity-100">
              Need help with certifications?
            </span>

            <button
              onClick={() => setIsOpen(true)}
              className="relative flex h-14 w-14 shrink-0 items-center justify-center
                rounded-full bg-brand p-3 shadow-lg transition-colors duration-200
                hover:bg-brand-hover"
              aria-label="Open chat with Alice"
              title="Chat with Alice about certifications"
            >
              <img
                src="/logos/favicon.svg"
                alt="Alice"
                width={28}
                height={28}
                loading="lazy"
                decoding="async"
                className="h-7 w-7"
              />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={reduce ? { duration: 0 } : { duration: 0.2 }}
            className="fixed z-50
              bottom-0 right-0 left-0 top-0
              h-[100dvh] w-full
              md:bottom-6 md:right-6 md:left-auto md:top-auto
              md:w-[400px] md:h-[600px]
              rounded-none md:rounded-[12px] shadow-2xl overflow-hidden
              flex flex-col
              border-0 md:border border-panel-line"
            style={{ background: "var(--color-footer)" }}
          >
            {/* Header — pinned, never scrolls */}
            <div className="z-10 flex shrink-0 items-center justify-between border-b border-footer-line px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-panel-line p-1.5">
                  <img src="/logos/favicon.svg" alt="Alice" width={36} height={36} loading="lazy" decoding="async" className="h-full w-full" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-footer-heading">Alice</div>
                  <div className="mono text-[11px] tracking-[0.06em] text-footer-link">AI Accreditation Advisor</div>
                </div>
              </div>
              <button
                onClick={handleCloseClick}
                className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-[4px]
                  p-3 text-footer-link transition-colors hover:bg-footer-line hover:text-footer-heading"
                aria-label="Close chat"
              >
                <Close size={18} />
              </button>
            </div>

            {/* Chat area */}
            <AliceChat onClose={forceClose} onCloseRefReady={(fn) => { closeRef.current = fn; }} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
