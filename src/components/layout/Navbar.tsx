"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/lib/constants";
import Button from "@/components/ui/Button";
import { Menu, Close, ChevronDown, ArrowRight } from "@/components/ui/icons";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const pathname = usePathname();
  const reduce = useReducedMotion();

  // Close both menus on navigation. Reading pathname during render rather than
  // calling setState inside an effect avoids a cascading re-render.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMobileOpen(false);
    setServicesOpen(false);
    setMobileServicesOpen(false);
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

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-page">
      <nav className="wrap" aria-label="Main navigation">
        <div className="flex h-[var(--header-h)] items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center" aria-label="Pixelette Certified Home">
            <Image
              src="/logos/logo-green-text.svg"
              alt="Pixelette Certified, ISO 27001 and Compliance Consultancy UK"
              width={200}
              height={40}
              priority
              className="h-9 w-auto"
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-7 lg:flex">
            {NAV_ITEMS.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <button
                    className={cn(
                      "inline-flex min-h-[44px] items-center gap-1.5 text-[15px] transition-colors",
                      pathname.startsWith("/services")
                        ? "font-medium text-ink"
                        : "text-muted hover:text-ink"
                    )}
                    aria-expanded={servicesOpen}
                    aria-haspopup="true"
                    onClick={() => setServicesOpen((v) => !v)}
                  >
                    {item.label}
                    <ChevronDown
                      size={14}
                      className={cn("transition-transform duration-200", servicesOpen && "rotate-180")}
                    />
                  </button>

                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={reduce ? { duration: 0 } : { duration: 0.18 }}
                        className="fixed inset-x-0 top-[var(--header-h)] z-50 border-b border-line bg-page shadow-card"
                      >
                        <div className="wrap py-6">
                          <div className="grid grid-cols-5 gap-3.5">
                            {item.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                className={cn(
                                  "rounded-[4px] px-3 py-2.5 transition-colors",
                                  pathname === child.href
                                    ? "bg-band"
                                    : "hover:bg-band"
                                )}
                              >
                                <div
                                  className={cn(
                                    "text-[15px] font-medium leading-tight",
                                    pathname === child.href ? "text-brand" : "text-ink"
                                  )}
                                >
                                  {child.label}
                                </div>
                                <div className="small mt-1 text-[13px]">{child.description}</div>
                              </Link>
                            ))}
                          </div>
                          <div className="mt-4 flex justify-end border-t border-line pt-4">
                            <Link
                              href="/services"
                              className="flink text-[15px] font-medium text-brand hover:text-brand-hover"
                            >
                              View All Services <ArrowRight size={15} />
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
                    pathname === item.href
                      ? "font-medium text-ink"
                      : "text-muted hover:text-ink"
                  )}
                >
                  {item.label}
                </Link>
              )
            )}
          </div>

          {/* CTA + mobile toggle */}
          <div className="flex shrink-0 items-center gap-3">
            <Button href="/contact" size="sm" className="hidden sm:inline-flex">
              Book Your Assessment
            </Button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-[4px] text-ink transition-colors hover:bg-band lg:hidden"
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
              className="overflow-hidden border-t border-line lg:hidden"
            >
              <div className="space-y-1 py-4">
                {NAV_ITEMS.map((item) =>
                  item.children ? (
                    <div key={item.label}>
                      <button
                        onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                        className="flex min-h-[44px] w-full items-center justify-between px-2 text-[15px] font-medium text-ink"
                        aria-expanded={mobileServicesOpen}
                      >
                        {item.label}
                        <ChevronDown
                          size={15}
                          className={cn(
                            "text-muted transition-transform duration-200",
                            mobileServicesOpen && "rotate-180"
                          )}
                        />
                      </button>
                      <AnimatePresence>
                        {mobileServicesOpen && (
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
                        pathname === item.href ? "font-medium text-ink" : "text-muted hover:text-ink"
                      )}
                    >
                      {item.label}
                    </Link>
                  )
                )}
                <div className="px-2 pt-3">
                  <Button href="/contact" fullWidth>
                    Book Your Assessment
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
