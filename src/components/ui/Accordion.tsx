"use client";

import { useId, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Plus, Minus } from "./icons";

export interface AccordionItemData {
  question: string;
  answer: string;
  /** optional metadata line under the question, e.g. a category */
  meta?: string;
}

interface AccordionProps {
  items: AccordionItemData[];
  className?: string;
  /** Index open on mount. Was 0; now null — the system is quiet by default. */
  defaultOpenIndex?: number | null;
  allowMultiple?: boolean;
}

/**
 * The guide has no accordion, so this is derived from its Insights list:
 * divider-separated rows that expand in place.
 *
 * Two deliberate improvements over the previous implementation:
 *  1. Panels stay MOUNTED. The old version wrapped them in AnimatePresence, so
 *     only the open answer existed in the DOM — meaning every FAQ answer but
 *     one was invisible to crawlers and to in-page find.
 *  2. It honours useReducedMotion(). The CSS prefers-reduced-motion block
 *     cannot stop framer-motion, which writes inline transforms.
 */
export default function Accordion({
  items,
  className,
  defaultOpenIndex = null,
  allowMultiple = false,
}: AccordionProps) {
  const uid = useId();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState<number[]>(
    defaultOpenIndex === null ? [] : [defaultOpenIndex]
  );

  const toggle = (i: number) =>
    setOpen((prev) =>
      prev.includes(i)
        ? prev.filter((n) => n !== i)
        : allowMultiple
          ? [...prev, i]
          : [i]
    );

  return (
    <div className={cn("border-t border-line", className)}>
      {items.map((item, i) => {
        const isOpen = open.includes(i);
        const panelId = `${uid}-panel-${i}`;
        const buttonId = `${uid}-button-${i}`;

        return (
          <div key={i} className="border-b border-line">
            <h3>
              <button
                id={buttonId}
                type="button"
                onClick={() => toggle(i)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="flex w-full items-start justify-between gap-6 py-6 text-left"
              >
                <span>
                  <span className="h4 block">{item.question}</span>
                  {item.meta && <span className="src mt-1.5 block">{item.meta}</span>}
                </span>
                <span className="mt-0.5 shrink-0 text-brand">
                  {isOpen ? <Minus /> : <Plus />}
                </span>
              </button>
            </h3>

            <motion.div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              initial={false}
              animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
              transition={reduce ? { duration: 0 } : { duration: 0.24, ease: "easeInOut" }}
              className="overflow-hidden"
              aria-hidden={!isOpen}
            >
              <p className="body pb-6">{item.answer}</p>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
