"use client";

import { useCountUp } from "@/hooks/useCountUp";

interface StatCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
}

export default function StatCounter({ value, suffix = "", prefix = "", label }: StatCounterProps) {
  const { count, ref } = useCountUp(value);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-extrabold text-accent mb-2">
        {prefix}{count}{suffix}
      </div>
      <div className="text-sm text-gray-400">{label}</div>
    </div>
  );
}
