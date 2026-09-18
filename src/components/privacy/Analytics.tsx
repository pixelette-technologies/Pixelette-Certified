"use client";

import { useEffect } from "react";
import {
  AHREFS_ANALYTICS_KEY,
  GA_MEASUREMENT_ID,
  PRIVACY_CHANGE_EVENT,
  analyticsEnabled,
  type AnalyticsChoice,
} from "@/lib/privacy";

/*
 * Loads Google Analytics 4 and Ahrefs Web Analytics, but only while the
 * visitor's Privacy choices setting is on. These used to be unconditional
 * <script> tags in the root layout's <head>, which made any "off" switch a
 * false promise.
 *
 * Switching off:
 *   - sets gtag's documented kill switch (window["ga-disable-<id>"]), so GA
 *     sends nothing more from this page;
 *   - deletes the _ga / _ga_* cookies GA4 set;
 *   - reloads, because Ahrefs has no documented way to stop a loaded script and
 *     the dialog promises the choice applies straight away.
 * Page loads while off never inject either script, and clear any _ga cookies
 * left from before the visitor switched off.
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    [key: `ga-disable-${string}`]: boolean | undefined;
  }
}

const GA_SRC = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
const AHREFS_SRC = "https://analytics.ahrefs.com/analytics.js";

let loaded = false;

function addScript(src: string, attrs: Record<string, string> = {}) {
  if (document.querySelector(`script[src="${src}"]`)) return;
  const el = document.createElement("script");
  el.async = true;
  el.src = src;
  for (const [key, value] of Object.entries(attrs)) el.setAttribute(key, value);
  document.head.appendChild(el);
}

function loadAnalytics() {
  if (loaded) return;
  loaded = true;
  window[`ga-disable-${GA_MEASUREMENT_ID}`] = false;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // gtag.js reads the arguments object itself, not an array copy.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag("js", new Date());
  // Google signals and ad personalisation off: the dialog states this data is
  // not used for advertising, and these are the switches that make it so.
  window.gtag("config", GA_MEASUREMENT_ID, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });
  addScript(GA_SRC);
  addScript(AHREFS_SRC, { "data-key": AHREFS_ANALYTICS_KEY });
}

function clearGaCookies() {
  const names = document.cookie
    .split(";")
    .map((c) => c.split("=")[0].trim())
    .filter((name) => name === "_ga" || name.startsWith("_ga_"));
  if (names.length === 0) return;

  // GA4 writes to the widest domain it can, so try each parent domain in turn.
  const parts = window.location.hostname.split(".");
  const domains = [""];
  for (let i = 0; i < parts.length - 1; i++) domains.push(`; domain=.${parts.slice(i).join(".")}`);

  for (const name of names) {
    for (const domain of domains) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain}`;
    }
  }
}

export default function Analytics() {
  useEffect(() => {
    if (analyticsEnabled()) loadAnalytics();
    else clearGaCookies();

    const onChange = (event: Event) => {
      const choice = (event as CustomEvent<AnalyticsChoice>).detail;
      if (choice === "on") {
        loadAnalytics();
        return;
      }
      window[`ga-disable-${GA_MEASUREMENT_ID}`] = true;
      clearGaCookies();
      if (loaded) window.location.reload();
    };

    window.addEventListener(PRIVACY_CHANGE_EVENT, onChange);
    return () => window.removeEventListener(PRIVACY_CHANGE_EVENT, onChange);
  }, []);

  return null;
}
