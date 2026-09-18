"use client";

import { useRef, useSyncExternalStore } from "react";
import Link from "next/link";
import {
  PRIVACY_CHANGE_EVENT,
  readAnalyticsChoice,
  writeAnalyticsChoice,
  type AnalyticsChoice,
} from "@/lib/privacy";

/*
 * The footer's "Privacy choices" control: a button that opens a native <dialog>
 * with a single website-analytics switch. Structure, copy order and behaviour
 * follow the Pixelette Technologies footer so the sister sites match.
 *
 * The copy is Certified's own and every statement in it is checked against what
 * this site actually does:
 *   - GA4 sets first-party cookies (_ga, _ga_*); Ahrefs Web Analytics sets none
 *     (Ahrefs' own documentation: "We do not use cookies").
 *   - Google's advertising features are off: <Analytics /> configures gtag with
 *     allow_google_signals and allow_ad_personalization_signals set to false.
 *   - "Applies straight away": switching on loads both scripts; switching off
 *     stops GA, clears its cookies and reloads so Ahrefs stops too.
 * Technologies' "No analytics are currently running" line is deliberately not
 * carried across: it would be false here.
 */
function subscribe(onChange: () => void) {
  window.addEventListener(PRIVACY_CHANGE_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(PRIVACY_CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

// "server" until hydration: the toggle stays disabled rather than guessing.
const getSnapshot = () => readAnalyticsChoice() ?? "unset";
const getServerSnapshot = () => "server" as const;

export default function PrivacyChoices() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const stored = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const ready = stored !== "server";
  const on = stored !== "off";

  const choose = (next: AnalyticsChoice) => {
    if (next === (on ? "on" : "off")) return;
    writeAnalyticsChoice(next);
  };

  const close = () => dialogRef.current?.close();

  return (
    <>
      <button type="button" className="privacy-trigger" onClick={() => dialogRef.current?.showModal()}>
        Privacy choices
      </button>
      <dialog
        ref={dialogRef}
        className="privacy-panel"
        aria-labelledby="privacy-choices-title"
        onClick={(event) => {
          // A click on the backdrop lands on the <dialog> itself.
          if (event.target === dialogRef.current) close();
        }}
      >
        <div className="privacy-panel__inner">
          <div className="privacy-panel__head">
            <h2 id="privacy-choices-title">Privacy choices</h2>
            <button type="button" className="privacy-panel__close" onClick={close} aria-label="Close privacy choices">
              &times;
            </button>
          </div>
          <h3 className="privacy-panel__sub">Website analytics</h3>
          <p className="privacy-panel__body">
            We use analytics to understand how the Pixelette Certified website is used and to improve its
            performance and content. Google Analytics sets first-party cookies to count visits; Ahrefs Web
            Analytics does not use cookies. Google&rsquo;s advertising features are switched off for this site,
            and we do not use this information to identify individual visitors.
          </p>
          <p className="privacy-panel__state">Your choice is saved in this browser and applies straight away.</p>
          <div className="privacy-panel__control">
            <span id="analytics-toggle-label">Website analytics</span>
            <div className="privacy-toggle" role="group" aria-labelledby="analytics-toggle-label">
              <button type="button" onClick={() => choose("on")} aria-pressed={ready ? on : undefined} disabled={!ready}>
                On
              </button>
              <button type="button" onClick={() => choose("off")} aria-pressed={ready ? !on : undefined} disabled={!ready}>
                Off
              </button>
            </div>
          </div>
          <p className="privacy-panel__note">You can change this choice at any time.</p>
          <Link href="/cookie-policy" className="privacy-panel__link" onClick={close}>
            Learn more about cookies &amp; analytics
          </Link>
        </div>
      </dialog>
    </>
  );
}
