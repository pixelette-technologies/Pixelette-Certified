"use client";

import dynamic from "next/dynamic";

const ChatWidget = dynamic(() => import("@/components/chatbot/ChatWidget"), {
  ssr: false,
});

const CustomCursor = dynamic(() => import("@/components/ui/CustomCursor"), {
  ssr: false,
});

export default function ClientShell() {
  return (
    <>
      <ChatWidget />
      <CustomCursor />
    </>
  );
}
