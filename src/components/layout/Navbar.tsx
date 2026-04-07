"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/lib/constants";
import Button from "@/components/ui/Button";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-gradient-to-r from-[#032e2f]/95 via-primary/90 to-[#032e2f]/95 backdrop-blur-xl shadow-2xl shadow-black/30 border-b border-accent/10"
          : "bg-gradient-to-r from-[#032e2f]/60 via-primary/50 to-[#032e2f]/60 backdrop-blur-md"
      )}
    >
      {/* Top accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

      <nav className="max-w-7xl mx-auto px-4 sm:px-6" aria-label="Main navigation">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link href="/" className="shrink-0" aria-label="Pixelette Certified Home">
            <Image
              src="/logos/logo-white-text.svg"
              alt="Pixelette Certified, ISO 27001 and Compliance Consultancy UK"
              width={200}
              height={40}
              priority
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <button
                    className={cn(
                      "flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200",
                      pathname.startsWith("/services")
                        ? "text-white bg-white/15"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                    )}
                    aria-expanded={servicesOpen}
                    aria-haspopup="true"
                  >
                    {item.label}
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform duration-200",
                        servicesOpen && "rotate-180"
                      )}
                    />
                  </button>

                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.2 }}
                        className="fixed left-0 right-0 top-[73px] z-50
                          bg-[#032e2f]/80 backdrop-blur-2xl saturate-150 border-b border-accent/10
                          shadow-2xl shadow-black/40"
                      >
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
                          <div className="grid grid-cols-5 gap-2">
                            {item.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                className={cn(
                                  "flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-all duration-300 group",
                                  pathname === child.href
                                    ? "bg-accent/10 border border-accent/20 text-accent"
                                    : "text-gray-300 hover:bg-white/5 hover:text-white border border-transparent hover:border-accent/10"
                                )}
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 group-hover:shadow-glow-accent transition-shadow" />
                                <div className="min-w-0">
                                  <div className="font-semibold text-sm leading-tight">{child.label}</div>
                                  <div className="text-[11px] text-gray-500 group-hover:text-gray-400 truncate">
                                    {child.description}
                                  </div>
                                </div>
                              </Link>
                            ))}
                          </div>
                          <div className="mt-3 pt-3 border-t border-white/5 flex justify-end">
                            <Link
                              href="/services"
                              className="flex items-center gap-2 text-sm text-accent hover:text-accent-light font-semibold transition-colors"
                            >
                              View All Services <ArrowRight className="h-4 w-4" />
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
                    "px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200",
                    pathname === item.href
                      ? "text-white bg-white/15"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  )}
                >
                  {item.label}
                </Link>
              )
            )}
          </div>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <Button href="/contact" size="sm" className="hidden sm:inline-flex">
              Free Gap Analysis
            </Button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden border-t border-white/10"
            >
              <div className="py-4 space-y-1">
                {NAV_ITEMS.map((item) =>
                  item.children ? (
                    <div key={item.label}>
                      <button
                        onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                        className="flex w-full items-center justify-between px-4 py-3 text-sm font-semibold text-white/80 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                      >
                        {item.label}
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform duration-200",
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
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="pl-6 space-y-1 pb-2">
                              {item.children.map((child) => (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                                >
                                  <span className="w-1 h-1 rounded-full bg-accent" />
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
                        "block px-4 py-3 text-sm font-semibold rounded-lg transition-colors",
                        pathname === item.href
                          ? "text-white bg-white/10"
                          : "text-white/80 hover:text-white hover:bg-white/5"
                      )}
                    >
                      {item.label}
                    </Link>
                  )
                )}
                <div className="pt-3 px-4">
                  <Button href="/contact" size="md" className="w-full justify-center">
                    Free Gap Analysis
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
