"use client";

import dynamic from "next/dynamic";
import RevealObserver from "@/components/motion/RevealObserver";

const AliceWidget = dynamic(() => import("@/components/alice/AliceWidget"), {
  ssr: false,
});

export default function ClientShell() {
  return (
    <>
      {/* Statically imported, not dynamic: it is under 1KB, and the sooner it
          runs the smaller the window in which a band the user is about to
          scroll to has already gone past the fold un-hidden. */}
      <RevealObserver />
      <AliceWidget />
    </>
  );
}
