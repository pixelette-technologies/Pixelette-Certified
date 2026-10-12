/**
 * Company facts for the site assistant — single source for Ada's context.
 * Keep in step with SITE_CONFIG in src/lib/constants.ts.
 */

export const SITE_URL = 'https://pixelettecertified.com';

export const company = {
  legalName: 'Pixelette Certified',
  name: 'Pixelette Certified',
  shortName: 'Pixelette Certified',
  crn: '17506745',
  registeredIn: 'England and Wales',
  incorporated: 2024,
  addressLine: '77 Fulham Palace Road, London W6 8JA',
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
