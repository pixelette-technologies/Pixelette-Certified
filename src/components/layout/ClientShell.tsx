"use client";

import dynamic from "next/dynamic";

const AliceWidget = dynamic(() => import("@/components/alice/AliceWidget"), {
  ssr: false,
});

const CustomCursor = dynamic(() => import("@/components/ui/CustomCursor"), {
  ssr: false,
});

export default function ClientShell() {
  return (
    <>
      <AliceWidget />
      <CustomCursor />
    </>
  );
}
