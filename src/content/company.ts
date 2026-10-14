/**
 * Company facts for the site assistant — single source for Pix C context.
 * Keep in step with SITE_CONFIG in src/lib/constants.ts.
 */

export const SITE_URL = 'https://pixelettecertified.com';

/**
 * Homepage H1, split for the default social card.
 *
 * The joined `h1` must stay byte-identical to the homepage `<h1>`. The three
 * lines are the same words, broken for a 1200×630 thumbnail — change them
 * together or the share card drifts from the page it advertises.
 */
export const HOMEPAGE_POSITIONING = {
  lines: [
    'Build the assurance',
    'your customers, regulators',
    'and partners expect',
  ],
  h1: 'Build the assurance your customers, regulators and partners expect',
} as const;

export const company = {
  legalName: 'Pixelette Certified',
  name: 'Pixelette Certified',
  shortName: 'Pixelette Certified',
  crn: '17506745',
  registeredIn: 'England and Wales',
  incorporated: 2024,
  addressLine: '77 Fulham Palace Road, London W6 8JA',
  /** Same string as the homepage H1 / social-card alt. */
  tagline: HOMEPAGE_POSITIONING.h1,
} as const;

/**
 * Clutch is not published on this site. Keep the shape for PixContext but
 * never set published true without evidence and a claims register row.
 */
export const clutch = {
  ratingValue: 0,
  reviewCount: 0,
  profileUrl: '',
  published: false,
} as const;

/** Visitor-facing contact address shown in assistant replies. */
export const contactEmail = 'info@pixelettecertified.com';

/**
 * Inbox for assistant lead notifications. Matches the contact form's admin
 * destination unless CONTACT_NOTIFICATION_TO overrides it.
 */
export const notificationEmail = 'partnerships@pixelette.tech';
