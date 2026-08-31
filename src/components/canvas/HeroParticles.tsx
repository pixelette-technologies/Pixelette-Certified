"use client";

import { useEffect, useRef } from "react";

/* Cursor interaction, in one place so it can be tuned without reading the
   loop. REACH is the radius of influence in CSS px, FORCE the per-frame
   impulse at the centre of it, MAX the ceiling on accumulated displacement
   per frame, and DECAY how fast the push bleeds off once the cursor leaves. */
const CURSOR_REACH = 165;
const CURSOR_FORCE = 0.55;
const CURSOR_MAX = 2.6;
const CURSOR_DECAY = 0.92;

/**
 * A deliberately quiet drift behind the hero copy.
 *
 * The design system is flat and static, so this is the one exception: sparse,
 * slow enough to read as depth rather than as animation, but legible without
 * hunting for it. The alphas below are the tuning surface.
 *
 * Colour comes from the live tokens rather than literals, so the canvas
 * follows the palette the way every other surface does. The two-tone rule is
 * respected: the signal teal paints DOTS (solid marks, which is what the
 * signal role is for) and never the connecting lines, because those are thin
 * strokes on a light ground and the vault forbids signal there.
 *
 * Decorative only - aria-hidden, pointer-events-none, and it renders nothing
 * at all under prefers-reduced-motion.
 */
export default function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      /* ox/oy are the cursor's transient push. Base drift stays in vx/vy and
         is never modified, so the field always settles back to its own motion
         instead of gradually accelerating or stalling. */
      ox: number;
      oy: number;
      r: number;
    }[] = [];
    let visible = true;
    let running = false;

    /* Pointer is held in CLIENT coords and converted per frame, because the
       canvas moves under the page as it scrolls and the draw loop already has
       a fresh rect. Hover-capable devices only: on touch, pointermove fires
       during a scroll and would drag the field around under the user's thumb. */
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)");
    const pointer = { x: 0, y: 0, active: false };

    // Read from the live tokens. @theme static forces both into :root, so
    // these always resolve; if they ever did not, the canvas simply does not
    // paint, which is the right failure for a decorative layer. No hex
    // fallbacks here - check-legacy-tokens.mjs rejects them, correctly.
    const styles = getComputedStyle(document.documentElement);
    const dot = styles.getPropertyValue("--color-brand-signal").trim();
    const line = styles.getPropertyValue("--color-brand").trim();
    if (!dot || !line) return;

    const seed = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Density scales with area but is capped, so a 4K monitor does not get a
      // busier hero than a laptop.
      const count = Math.min(46, Math.round((rect.width * rect.height) / 23000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        vx: (Math.random() - 0.5) * 0.30,
        vy: (Math.random() - 0.5) * 0.30,
        ox: 0,
        oy: 0,
        r: 1.3 + Math.random() * 1.5,
      }));
    };

    const draw = () => {
      const ctx = canvas.getContext("2d");
      const rect = canvas.getBoundingClientRect();
      if (!ctx) return;
      ctx.clearRect(0, 0, rect.width, rect.height);

      // Cursor position in canvas space for this frame.
      const px = pointer.x - rect.left;
      const py = pointer.y - rect.top;
      const nudging =
        pointer.active && px > -CURSOR_REACH && px < rect.width + CURSOR_REACH &&
        py > -CURSOR_REACH && py < rect.height + CURSOR_REACH;

      for (const p of particles) {
        if (nudging) {
          const cx = p.x - px;
          const cy = p.y - py;
          const cd = Math.hypot(cx, cy);
          if (cd < CURSOR_REACH && cd > 0.5) {
            // Push outward, strongest at the cursor and easing to nothing at
            // the edge of reach. Squared falloff keeps the far field calm.
            const falloff = 1 - cd / CURSOR_REACH;
            const push = falloff * falloff * CURSOR_FORCE;
            p.ox += (cx / cd) * push;
            p.oy += (cy / cd) * push;
          }
        }

        // Clamp so a fast sweep displaces rather than flings.
        p.ox = Math.max(-CURSOR_MAX, Math.min(CURSOR_MAX, p.ox));
        p.oy = Math.max(-CURSOR_MAX, Math.min(CURSOR_MAX, p.oy));

        p.x += p.vx + p.ox;
        p.y += p.vy + p.oy;

        // The push is transient: it bleeds off and the base drift resumes.
        p.ox *= CURSOR_DECAY;
        p.oy *= CURSOR_DECAY;

        // wrap rather than bounce: no shoal forms along the edges
        if (p.x < -8) p.x = rect.width + 8;
        if (p.x > rect.width + 8) p.x = -8;
        if (p.y < -8) p.y = rect.height + 8;
        if (p.y > rect.height + 8) p.y = -8;
      }

      // Lines first, so dots sit on top of their own joins.
      ctx.strokeStyle = line;
      ctx.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.hypot(dx, dy);
          if (d > 130) continue;
          ctx.globalAlpha = (1 - d / 130) * 0.20;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }

      ctx.fillStyle = dot;
      ctx.globalAlpha = 0.58;
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const tick = () => {
      if (visible) draw();
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running || motionQuery.matches) return;
      running = true;
      seed();
      frame = requestAnimationFrame(tick);
    };

    const stop = () => {
      if (!running) return;
      running = false;
      cancelAnimationFrame(frame);
      const ctx = canvas.getContext("2d");
      const rect = canvas.getBoundingClientRect();
      if (ctx) ctx.clearRect(0, 0, rect.width, rect.height);
    };

    // Off-screen heroes cost nothing.
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    const onResize = () => {
      if (running) seed();
    };
    // Honour the OS setting being flipped mid-session, not just at mount.
    const onMotionChange = () => (motionQuery.matches ? stop() : start());

    /* Listening on the window rather than the canvas means the field reacts as
       the cursor approaches over the copy above it, not only on the strip of
       canvas not covered by text. The handler only records; all the work
       happens in the frame that follows. */
    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" && e.pointerType !== "pen") return;
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.active = true;
    };
    const onPointerLeave = () => {
      pointer.active = false;
    };

    window.addEventListener("resize", onResize);
    motionQuery.addEventListener("change", onMotionChange);
    if (canHover.matches) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      document.addEventListener("pointerleave", onPointerLeave);
    }
    start();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      motionQuery.removeEventListener("change", onMotionChange);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
