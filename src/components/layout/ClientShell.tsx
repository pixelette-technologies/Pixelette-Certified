"use client";

import RevealObserver from "@/components/motion/RevealObserver";

export default function ClientShell() {
  return (
    <>
      {/* Statically imported, not dynamic: it is under 1KB, and the sooner it
          runs the smaller the window in which a band the user is about to
          scroll to has already gone past the fold un-hidden. */}
      <RevealObserver />
    </>
  );
}
