"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/* How far up from the bottom edge a block must come before it starts to
   arrive. -10% means its top has to cross 90% of viewport height, which at a
   560ms shift leaves the motion finished well before the block reaches
   comfortable reading position. */
const ROOT_MARGIN = "0px 0px -10% 0px";

/**
 * Every scroll reveal on the site, in one file.
 *
 * It renders nothing, it is mounted once from ClientShell, and it finds its
 * work by attribute rather than by being wrapped around anything - so not one
 * section had to become a client component to animate. Add data-reveal="" to a
 * .wrap and it participates; remove it and it does not. globals.css never
 * learns which components exist.
 *
 * The order of operations in sweep() is the whole design, and it is not
 * arbitrary:
 *
 *   1. Build the observer FIRST. On an engine without IntersectionObserver the
 *      constructor throws here, before a single element has been hidden, and
 *      the page is left exactly as the server sent it.
 *   2. Measure the fold ONCE. Hiding does not affect layout - opacity and
 *      transform never do - but reading innerHeight once is cheaper and cannot
 *      drift mid-loop.
 *   3. Hide only what is already below the fold. Anything the user can see, or
 *      is about to see by a hair, is never touched: no attribute, no
 *      transition, no possible flash of visible-then-hidden. This is why there
 *      is no blocking inline script in <head> and no root class - the class of
 *      bug those exist to prevent cannot occur if you measure before you hide.
 *
 * Under prefers-reduced-motion this does nothing at all. That is an
 * optimisation; the guarantee is the !important reset in globals.css S8.
 */
export default function RevealObserver() {
  /* ClientShell lives in the root layout, so without this the effect would run
     once for the life of the tab and never see a new route's markup. */
  const pathname = usePathname();

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer: IntersectionObserver | null = null;
    let raf = 0;

    /* Hand every element back to the server's version of itself. Called on
       teardown and before a re-sweep, so a node React reused across a
       navigation cannot arrive carrying a stale state. CTASection occupies the
       same tree position on nearly every route and will be reused. */
    const reset = () => {
      observer?.disconnect();
      observer = null;
      document
        .querySelectorAll("[data-reveal-state]")
        .forEach((el) => el.removeAttribute("data-reveal-state"));
    };

    const sweep = () => {
      const targets = document.querySelectorAll<HTMLElement>("[data-reveal]");
      if (targets.length === 0) return;

      observer = new IntersectionObserver(
        (entries, obs) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            entry.target.setAttribute("data-reveal-state", "shown");
            /* One-shot. Scrolling back up must not re-hide anything: content
               that fades out as you scroll away is the fanciest thing on the
               internet and it is not what was asked for. */
            obs.unobserve(entry.target);
          }
        },
        { rootMargin: ROOT_MARGIN, threshold: 0 }
      );

      const fold = window.innerHeight;

      for (const el of targets) {
        if (el.getBoundingClientRect().top < fold) continue;
        el.setAttribute("data-reveal-state", "hidden");
        observer.observe(el);
      }
    };

    const start = () => {
      if (motionQuery.matches) return;
      /* Two frames of slack. On a client-side navigation this effect can run
         before the router has restored scroll to the top, and on a load with a
         #hash before the browser has jumped to the anchor. Every decision in
         sweep() is a measurement against the scroll position, so it has to
         happen after both. */
      raf = requestAnimationFrame(() => {
        raf = requestAnimationFrame(sweep);
      });
    };

    /* bfcache. Effects do not re-run on restore, and observer delivery on
       resume is not uniform across engines, so anything still hidden that is
       now on screen is shown outright rather than waited for. */
    const onPageShow = (event: PageTransitionEvent) => {
      if (!event.persisted) return;
      document
        .querySelectorAll<HTMLElement>('[data-reveal-state="hidden"]')
        .forEach((el) => {
          if (el.getBoundingClientRect().top < window.innerHeight) {
            el.setAttribute("data-reveal-state", "shown");
          }
        });
    };

    /* Honour the OS setting being flipped mid-session, not just at mount. The
       stylesheet has already made everything visible by the time this fires;
       all this does is stop the observer and clean the attributes off. */
    const onMotionChange = () => {
      cancelAnimationFrame(raf);
      reset();
      start();
    };

    start();
    motionQuery.addEventListener("change", onMotionChange);
    window.addEventListener("pageshow", onPageShow);

    return () => {
      cancelAnimationFrame(raf);
      reset();
      motionQuery.removeEventListener("change", onMotionChange);
      window.removeEventListener("pageshow", onPageShow);
    };
  }, [pathname]);

  return null;
}
