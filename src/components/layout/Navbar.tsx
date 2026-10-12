"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { NAV_ITEMS, PRIMARY_CTA } from "@/lib/constants";
import Button from "@/components/ui/Button";
import { Menu, Close, ChevronDown, ArrowRight } from "@/components/ui/icons";

/**
 * Which nav item should show as active for a given path. Longest match wins,
 * so a more specific prefix is never overridden by a shorter one.
 */
function activeNavLabel(pathname: string): string | null {
  let best: { label: string; length: number } | null = null;

  for (const item of NAV_ITEMS) {
    const target = item.match ?? item.href;
    const isMatch = pathname === target || pathname.startsWith(`${target}/`);
    if (!isMatch) continue;
    if (!best || target.length > best.length) best = { label: item.label, length: target.length };
  }

  return best?.label ?? null;
}

/**
 * Seven items and a button do not fit comfortably at 1024px, so the full
 * desktop bar starts at the xl breakpoint and the drawer covers everything
 * below it. Dropdowns are compact panels anchored to their trigger rather than
 * a full-width mega-menu (§7).
 */
export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const pathname = usePathname();
  const activeLabel = activeNavLabel(pathname);
  const reduce = useReducedMotion();

  // Close every menu on navigation. Reading pathname during render rather than
  // calling setState inside an effect avoids a cascading re-render.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMobileOpen(false);
    setOpenMenu(null);
    setMobileSection(null);
  }

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);

  // Escape closes an open dropdown.
  useEffect(() => {
    if (!openMenu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMenu(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openMenu]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-page">
      <nav className="wrap" aria-label="Main navigation">
        <div className="flex h-[var(--header-h)] items-center justify-between gap-6">
          <Link href="/" className="flex shrink-0 items-center" aria-label="Pixelette Certified home">
            <Image
              src="/logos/logo-green-text.svg"
              alt="Pixelette Certified"
              width={200}
              height={40}
              priority
              className="h-9 w-auto"
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-6 xl:flex">
            {NAV_ITEMS.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenMenu(item.label)}
                  onMouseLeave={() => setOpenMenu(null)}
                >
                  <button
                    className={cn(
                      "inline-flex min-h-[44px] items-center gap-1.5 text-[15px] transition-colors",
                      activeLabel === item.label ? "font-medium text-ink" : "text-muted hover:text-ink"
                    )}
                    aria-expanded={openMenu === item.label}
                    aria-haspopup="true"
                    onClick={() => setOpenMenu((v) => (v === item.label ? null : item.label))}
                  >
                    {item.label}
                    <ChevronDown
                      size={14}
                      className={cn("transition-transform duration-200", openMenu === item.label && "rotate-180")}
                    />
                  </button>

                  <AnimatePresence>
                    {openMenu === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={reduce ? { duration: 0 } : { duration: 0.16 }}
                        className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-2"
                      >
                        <div
                          className={cn(
                            "rounded-card border border-line bg-page p-3 shadow-card",
                            item.children.length > 4 ? "w-[540px]" : "w-[260px]"
                          )}
                        >
                          <ul
                            className={cn(
                              "grid list-none gap-0.5",
                              item.children.length > 4 && "grid-cols-2"
                            )}
                          >
                            {item.children.map((child) => (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  className={cn(
                                    "block rounded-[4px] px-3 py-2.5 text-[14.5px] leading-snug transition-colors",
                                    pathname === child.href
                                      ? "bg-band font-medium text-brand"
                                      : "text-ink hover:bg-band"
                                  )}
                                >
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                          <div className="mt-2 border-t border-line px-3 pt-3">
                            <Link
                              href={item.href}
                              className="flink text-[14.5px] font-medium text-brand hover:text-brand-hover"
                            >
                              {item.allLabel} <ArrowRight size={14} />
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "inline-flex min-h-[44px] items-center text-[15px] transition-colors",
                    activeLabel === item.label ? "font-medium text-ink" : "text-muted hover:text-ink"
                  )}
                  aria-current={activeLabel === item.label ? "page" : undefined}
                >
                  {item.label}
                </Link>
              )
            )}
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <Button href={PRIMARY_CTA.href} size="sm" className="hidden sm:inline-flex">
              {PRIMARY_CTA.label}
            </Button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-[4px] text-ink transition-colors hover:bg-band xl:hidden"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <Close /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={reduce ? { duration: 0 } : { duration: 0.24 }}
              className="max-h-[calc(100vh-var(--header-h))] overflow-y-auto border-t border-line xl:hidden"
            >
              <div className="space-y-1 py-4">
                {NAV_ITEMS.map((item) =>
                  item.children ? (
                    <div key={item.label}>
                      <button
                        onClick={() => setMobileSection((v) => (v === item.label ? null : item.label))}
                        className="flex min-h-[44px] w-full items-center justify-between px-2 text-[15px] font-medium text-ink"
                        aria-expanded={mobileSection === item.label}
                      >
                        {item.label}
                        <ChevronDown
                          size={15}
                          className={cn(
                            "text-muted transition-transform duration-200",
                            mobileSection === item.label && "rotate-180"
                          )}
                        />
                      </button>
                      <AnimatePresence>
                        {mobileSection === item.label && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: "auto" }}
                            exit={{ height: 0 }}
                            transition={reduce ? { duration: 0 } : { duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="pb-2 pl-4">
                              {item.children.map((child) => (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  className="flex min-h-[44px] items-center px-2 text-[15px] text-muted hover:text-ink"
                                >
                                  {child.label}
                                </Link>
                              ))}
                              <Link
                                href={item.href}
                                className="flex min-h-[44px] items-center px-2 text-[15px] font-medium text-brand"
                              >
                                {item.allLabel}
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={cn(
                        "flex min-h-[44px] items-center px-2 text-[15px]",
                        activeLabel === item.label ? "font-medium text-ink" : "text-muted hover:text-ink"
                      )}
                    >
                      {item.label}
                    </Link>
                  )
                )}
                <div className="px-2 pt-3">
                  <Button href={PRIMARY_CTA.href} fullWidth>
                    {PRIMARY_CTA.label}
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
