"use client";

import dynamic from "next/dynamic";

const AliceWidget = dynamic(() => import("@/components/alice/AliceWidget"), {
  ssr: false,
});

export default function ClientShell() {
  return <AliceWidget />;
}
