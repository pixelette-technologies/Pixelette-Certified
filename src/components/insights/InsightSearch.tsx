"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { insightsHref } from "@/data/insights";

interface InsightSearchProps {
  query: string;
  category?: string;
}

/** Compact search. Updates the query string so a result can be shared. */
export default function InsightSearch({ query, category }: InsightSearchProps) {
  const router = useRouter();
  const [value, setValue] = useState(query);

  useEffect(() => {
    setValue(query);
  }, [query]);

  useEffect(() => {
    const trimmed = value.trim();
    if (trimmed === query.trim()) return;
    const handle = window.setTimeout(() => {
      router.replace(insightsHref({ category, q: trimmed }), { scroll: false });
    }, 300);
    return () => window.clearTimeout(handle);
  }, [value, query, category, router]);

  return (
    <form
      role="search"
      action="/blog"
      method="get"
      className="w-full lg:w-[280px] lg:shrink-0"
      onSubmit={(event) => {
        event.preventDefault();
        router.replace(insightsHref({ category, q: value.trim() }), { scroll: false });
      }}
    >
      {category ? <input type="hidden" name="category" value={category} /> : null}
      <label htmlFor="insight-search" className="sr-only">
        Search insights
      </label>
      <input
        id="insight-search"
        name="q"
        type="search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Search insights"
        autoComplete="off"
        className="input"
      />
    </form>
  );
}
