/*
 * The visitor's website-analytics choice, as set in the footer's Privacy choices
 * dialog. The same model as the Pixelette Technologies site, so the sister sites
 * behave alike: one on/off choice, kept in this browser's localStorage, and on
 * until the visitor switches it off.
 *
 * Unlike Technologies, analytics do run here (Google Analytics 4 and Ahrefs Web
 * Analytics), so the choice is live: <Analytics /> only loads either script
 * while it is on, and switching it off stops them. The dialog copy and the
 * cookie policy both describe this behaviour, so change all three together.
 */

export type AnalyticsChoice = "on" | "off";

export const ANALYTICS_STORAGE_KEY = "pc-analytics";
export const PRIVACY_CHANGE_EVENT = "pc-privacy-change";

export const GA_MEASUREMENT_ID = "G-VX5PH3RWRB";
export const AHREFS_ANALYTICS_KEY = "NrhMy8upP8sv8uHS6EOSmg";

/** The stored choice, or null when the visitor has never chosen. */
export function readAnalyticsChoice(): AnalyticsChoice | null {
  try {
    const value = window.localStorage.getItem(ANALYTICS_STORAGE_KEY);
    return value === "on" || value === "off" ? value : null;
  } catch {
    return null;
  }
}

export function writeAnalyticsChoice(choice: AnalyticsChoice): void {
  try {
    window.localStorage.setItem(ANALYTICS_STORAGE_KEY, choice);
  } catch {
    // Storage blocked: the choice still applies for this page view.
  }
  window.dispatchEvent(new CustomEvent<AnalyticsChoice>(PRIVACY_CHANGE_EVENT, { detail: choice }));
}

export function analyticsEnabled(): boolean {
  return readAnalyticsChoice() !== "off";
}
