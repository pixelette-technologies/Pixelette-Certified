"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight } from "@/components/ui/icons";

/**
 * Split-screen service selector. Six names on the left, one panel on the
 * right. A requirement filter highlights the relevant names without hiding
 * the rest, so the list stays stable.
 */

export interface ExplorerService {
  slug: string;
  name: string;
  summary: string;
  tags: string;
  frameworks: string;
  href: string;
}

interface Intent {
  id: string;
  label: string;
  line: string;
  slugs: string[];
}

const INTENTS: Intent[] = [
  {
    id: "certification",
    label: "Certification",
    line: "ISO 27001, ISO 42001 and SOC 2 readiness.",
    slugs: ["iso-27001", "iso-42001", "soc-2"],
  },
  {
    id: "customer",
    label: "Customer assurance",
    line: "Cyber assurance sits with these on the full services list.",
    slugs: ["iso-27001", "soc-2", "vciso"],
  },
  {
    id: "regulatory",
    label: "Regulatory compliance",
    line: "Business continuity is available where resilience is required.",
    slugs: ["privacy", "gcc-regulatory-compliance"],
  },
  {
    id: "governance",
    label: "Ongoing governance",
    line: "AI governance, vCISO and privacy, kept current between audits.",
    slugs: ["iso-42001", "vciso", "privacy"],
  },
];

interface ServiceExplorerProps {
  services: ExplorerService[];
}

export default function ServiceExplorer({ services }: ServiceExplorerProps) {
  const uid = useId();
  const [intentId, setIntentId] = useState<string | null>(null);
  const [active, setActive] = useState(services[0]?.slug ?? "");
  const intent = INTENTS.find((item) => item.id === intentId) ?? null;
  const shown = intent && !intent.slugs.includes(active) ? intent.slugs[0] : active;

  const current = services.find((service) => service.slug === shown) ?? services[0];

  function highlighted(slug: string) {
    if (!intent) return true;
    return intent.slugs.includes(slug);
  }

  function onTabKey(event: React.KeyboardEvent<HTMLDivElement>) {
    const keys = ["ArrowDown", "ArrowUp", "Home", "End"];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    const pool = intent ? services.filter((service) => intent.slugs.includes(service.slug)) : services;
    const index = pool.findIndex((service) => service.slug === shown);
    if (event.key === "Home") setActive(pool[0].slug);
    else if (event.key === "End") setActive(pool[pool.length - 1].slug);
    else if (event.key === "ArrowDown") setActive(pool[(index + 1) % pool.length].slug);
    else if (event.key === "ArrowUp") setActive(pool[(index - 1 + pool.length) % pool.length].slug);
  }

  return (
    <div>
      <div className="mb-8">
        <h3 className="h4">What are you working towards?</h3>
        <div role="group" aria-label="What are you working towards?" className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
          {INTENTS.map((item) => {
            const pressed = intentId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={pressed}
                className={cn(
                  "min-h-11 border-b text-[15px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand",
                  pressed ? "border-brand font-medium text-ink" : "border-transparent text-muted hover:text-ink"
                )}
                onClick={() => setIntentId((currentId) => (currentId === item.id ? null : item.id))}
              >
                {item.label}
              </button>
            );
          })}
        </div>
        <p className="small mt-3 min-h-[1.4em]">{intent?.line ?? ""}</p>
      </div>

      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <div
          role="tablist"
          aria-orientation="vertical"
          aria-label="Services"
          onKeyDown={onTabKey}
        >
          {services.map((service, index) => {
            const selected = service.slug === current.slug;
            const dim = !highlighted(service.slug);
            const panelId = `${uid}-panel`;
            const tabId = `${uid}-tab-${service.slug}`;
            return (
              <div key={service.slug} className="border-t border-line last:border-b">
                <button
                  id={tabId}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={panelId}
                  tabIndex={selected ? 0 : -1}
                  className={cn(
                    "flex min-h-[52px] w-full items-baseline gap-4 py-3 text-left transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
                    dim && "opacity-40",
                    selected ? "text-ink" : "text-muted hover:text-ink"
                  )}
                  onClick={() => setActive(service.slug)}
                  onFocus={() => setActive(service.slug)}
                  onMouseEnter={() => setActive(service.slug)}
                >
                  <span
                    className={cn("w-6 shrink-0 font-mono text-[12px] tracking-wide", selected ? "text-brand" : "text-soft")}
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className={cn("text-[17px] leading-snug", selected && "font-medium")}>{service.name}</span>
                </button>

                {selected && (
                  <div className="pb-5 pl-10 lg:hidden">
                    <ServiceDetail service={service} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div
          id={`${uid}-panel`}
          role="tabpanel"
          aria-labelledby={`${uid}-tab-${current.slug}`}
          className="hidden border-l border-brand pl-8 lg:block"
        >
          {current && <ServiceDetail service={current} />}
        </div>
      </div>
    </div>
  );
}

function ServiceDetail({ service }: { service: ExplorerService }) {
  return (
    <div>
      <h4 className="h3 max-w-[22ch]">{service.name}</h4>
      <p className="body mt-4 max-w-[46ch]">{service.summary}</p>
      <p className="small mt-6 font-medium text-ink">{service.tags}</p>
      <p className="small mt-1">{service.frameworks}</p>
      <Link href={service.href} className="flink mt-6 text-sm font-medium text-brand hover:text-brand-hover">
        Explore service <ArrowRight size={14} />
      </Link>
    </div>
  );
}
