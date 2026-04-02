"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  dark?: boolean;
}

function AccordionItem({ question, answer, isOpen, onToggle, dark = true }: AccordionItemProps) {
  return (
    <div
      className={cn(
        "border-b",
        dark ? "border-white/10" : "border-gray-200"
      )}
    >
      <button
        onClick={onToggle}
        className={cn(
          "flex w-full items-center justify-between py-5 text-left font-semibold text-lg transition-colors",
          dark
            ? "text-white hover:text-accent"
            : "text-primary hover:text-accent-dark"
        )}
        aria-expanded={isOpen}
      >
        {question}
        <ChevronDown
          className={cn(
            "h-5 w-5 shrink-0 ml-4 transition-transform duration-200",
            isOpen && "rotate-180",
            dark ? "text-accent" : "text-accent-dark"
          )}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p
              className={cn(
                "pb-5 leading-relaxed",
                dark ? "text-gray-300" : "text-gray-600"
              )}
            >
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface AccordionProps {
  items: { question: string; answer: string }[];
  dark?: boolean;
  className?: string;
}

export default function Accordion({ items, dark = true, className }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className={className}>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          question={item.question}
          answer={item.answer}
          isOpen={openIndex === index}
          onToggle={() => setOpenIndex(openIndex === index ? null : index)}
          dark={dark}
        />
      ))}
    </div>
  );
}
