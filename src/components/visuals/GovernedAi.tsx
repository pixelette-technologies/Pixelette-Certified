"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * An abstract system inside a control boundary. On entering the section the
 * nodes settle and the boundary becomes defined. Decorative: the four words
 * are published as text beside it.
 */

const NODES = [
  { x: 150, y: 132, jx: -22, jy: 16 },
  { x: 176, y: 118, jx: 18, jy: -14 },
  { x: 168, y: 154, jx: 14, jy: 18 },
  { x: 198, y: 146, jx: -12, jy: -16 },
  { x: 186, y: 174, jx: 20, jy: 8 },
  { x: 142, y: 166, jx: -16, jy: -10 },
];

const LINKS: [number, number][] = [
  [0, 1],
  [1, 3],
  [0, 2],
  [2, 4],
  [2, 5],
  [3, 4],
];

export default function GovernedAi() {
  const reduce = useReducedMotion();
  const ref = useRef<SVGSVGElement>(null);
  const [inView, setInView] = useState(false);
  const settled = reduce === true || inView;

  useEffect(() => {
    if (reduce) return;
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.5 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reduce]);

  return (
    <svg
      ref={ref}
      viewBox="0 0 340 300"
      className="h-auto w-full max-w-[420px] text-footer-accent"
      aria-hidden="true"
    >
      <rect
        x="48"
        y="36"
        width="244"
        height="228"
        rx="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        opacity={settled ? 0.85 : 0.28}
        strokeDasharray={settled ? "0" : "5 7"}
        style={{ transition: "opacity 800ms ease" }}
      />
      <g fill="none" stroke="currentColor" strokeWidth="1" opacity={settled ? 0.55 : 0.25}>
        {LINKS.map(([a, b]) => {
          const from = NODES[a];
          const to = NODES[b];
          const fx = settled ? from.x : from.x + from.jx;
          const fy = settled ? from.y : from.y + from.jy;
          const tx = settled ? to.x : to.x + to.jx;
          const ty = settled ? to.y : to.y + to.jy;
          return <line key={`${a}-${b}`} x1={fx} y1={fy} x2={tx} y2={ty} />;
        })}
      </g>
      {NODES.map((node, index) => (
        <circle
          key={index}
          cx={settled ? node.x : node.x + node.jx}
          cy={settled ? node.y : node.y + node.jy}
          r={index === 2 ? 5 : 3.5}
          fill="currentColor"
          style={{ transition: reduce ? "none" : "cx 900ms cubic-bezier(0.33, 1, 0.68, 1), cy 900ms cubic-bezier(0.33, 1, 0.68, 1)" }}
        />
      ))}
    </svg>
  );
}
