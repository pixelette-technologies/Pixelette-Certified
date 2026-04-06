"use client";

import dynamic from "next/dynamic";

const ClaraWidget = dynamic(() => import("@/components/clara/ClaraWidget"), {
  ssr: false,
});

const CustomCursor = dynamic(() => import("@/components/ui/CustomCursor"), {
  ssr: false,
});

export default function ClientShell() {
  return (
    <>
      <ClaraWidget />
      <CustomCursor />
    </>
  );
}
