/**
 * Route families Ada may ground answers in on pixelettecertified.com.
 */

export const ALLOWED_SOURCE_PREFIXES: readonly string[] = [
  '/',
  '/about',
  '/services',
  '/markets',
  '/expertise',
  '/who-we-help',
  '/blog',
  '/contact',
  '/privacy-policy',
  '/cookie-policy',
];

export const FORBIDDEN_SOURCE_PREFIXES: readonly string[] = [
  '/archive',
  '/legacy',
  '/old',
  '/deprecated',
  '/held',
];

export function isAllowedSource(routePath: string): boolean {
  const p = (routePath || '').trim();
  if (!p.startsWith('/')) return false;
  if (FORBIDDEN_SOURCE_PREFIXES.some(f => p === f || p.startsWith(f.endsWith('/') ? f : `${f}/`))) {
    return false;
  }
  if (p === '/') return true;
  return ALLOWED_SOURCE_PREFIXES.some(a => a !== '/' && (p === a || p.startsWith(`${a}/`)));
}
