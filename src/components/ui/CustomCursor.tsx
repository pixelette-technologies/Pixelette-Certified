"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const isHovering = useRef(false);

  useEffect(() => {
    // Only on devices with hover capability
    if (!window.matchMedia("(hover: hover)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    dot.style.display = "block";
    ring.style.display = "block";

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    const onEnterInteractive = () => {
      isHovering.current = true;
    };

    const onLeaveInteractive = () => {
      isHovering.current = false;
    };

    document.addEventListener("mousemove", onMove);

    // Track hover on interactive elements
    const observer = new MutationObserver(() => {
      document.querySelectorAll("a, button, [role='button'], input, textarea, select").forEach((el) => {
        el.addEventListener("mouseenter", onEnterInteractive);
        el.addEventListener("mouseleave", onLeaveInteractive);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // Initial bind
    document.querySelectorAll("a, button, [role='button'], input, textarea, select").forEach((el) => {
      el.addEventListener("mouseenter", onEnterInteractive);
      el.addEventListener("mouseleave", onLeaveInteractive);
    });

    let raf: number;
    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.35;
      pos.current.y += (target.current.y - pos.current.y) * 0.35;

      dot.style.transform = `translate(${target.current.x - 3}px, ${target.current.y - 3}px)`;
      ring.style.transform = `translate(${pos.current.x - 18}px, ${pos.current.y - 18}px) scale(${isHovering.current ? 1.4 : 1})`;

      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-accent z-[9999] pointer-events-none hidden"
        style={{ boxShadow: "0 0 8px rgba(20,170,169,0.5)" }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-9 h-9 rounded-full border border-accent/40 z-[9999] pointer-events-none hidden transition-transform duration-200"
      />
    </>
  );
}
