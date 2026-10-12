"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * One continuous pathway. Early stages are slightly dispersed; the last stage
 * is a locked grid. Hover or focus reveals a single sentence. On small
 * screens the same stages stack, because there is no hover.
 */

const STAGES = [
  {
    title: "Requirement",
    text: "Define the objective, the applicable frameworks and the outcome that has to be demonstrated.",
  },
  {
    title: "Right expertise",
    text: "Assign practitioners whose qualifications fit the standard, jurisdiction, sector and technical requirement.",
  },
  {
    title: "Assess and implement",
    text: "Identify the gaps and put proportionate controls and governance in place.",
  },
  {
    title: "Evidence and readiness",
    text: "Build the records that show those controls operating.",
  },
  {
    title: "Independent assurance",
    text: "Support the organisation through certification, attestation or assessment by the appropriate third party.",
  },
];

const GRID = [
  [0, 0],
  [14, 0],
  [0, 14],
  [14, 14],
] as const;

const JITTER = [
  [-16, 12],
  [18, -14],
  [-10, 18],
  [16, 10],
] as const;

export default function AssurancePathway() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [active, setActive] = useState(0);
  const resolved = reduce === true || inView;

  useEffect(() => {
    if (reduce) return;
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.45 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reduce]);

  return (
    <div ref={ref}>
      <ol className="hidden list-none lg:grid lg:grid-cols-5 lg:gap-6">
        {STAGES.map((stage, index) => (
          <li key={stage.title}>
            <button
              type="button"
              className="w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
            >
              <StageMarks index={index} resolved={resolved} emphasised={active === index} />
              <span className={cn("mt-4 block text-[15px] leading-snug", active === index ? "font-medium text-ink" : "text-muted")}>
                {stage.title}
              </span>
            </button>
          </li>
        ))}
      </ol>

      <p className="small mt-6 hidden min-h-[3.2rem] max-w-[62ch] lg:block" aria-live="polite">
        {STAGES[active].text}
      </p>

      <ol className="list-none border-l border-line lg:hidden">
        {STAGES.map((stage, index) => (
          <li key={stage.title} className="py-4 pl-5">
            <StageMarks index={index} resolved={resolved} emphasised />
            <h3 className="h4 mt-3">{stage.title}</h3>
            <p className="small mt-1.5">{stage.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

function StageMarks({
  index,
  resolved,
  emphasised,
}: {
  index: number;
  resolved: boolean;
  emphasised: boolean;
}) {
  const order = resolved || emphasised ? 1 : 0.12 + index * 0.22;

  return (
    <svg viewBox="-20 -18 56 52" className="h-12 w-14 text-brand" aria-hidden="true">
      {GRID.map(([gx, gy], dot) => {
        const [jx, jy] = JITTER[dot];
        const x = gx * order + jx * (1 - order);
        const y = gy * order + jy * (1 - order);
        return (
          <rect
            key={dot}
            x={x}
            y={y}
            width="8"
            height="8"
            fill={emphasised || index === STAGES.length - 1 ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1"
            style={{ transition: "x 700ms cubic-bezier(0.33, 1, 0.68, 1), y 700ms cubic-bezier(0.33, 1, 0.68, 1)" }}
          />
        );
      })}
    </svg>
  );
}
