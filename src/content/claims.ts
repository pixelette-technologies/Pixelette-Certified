/**
 * Claims register for the site assistant.
 *
 * Fail closed: nothing is publishable until evidenced. The site's broader
 * claims gate lives in src/lib/claims/register.mjs; this file only feeds
 * server-context → PixContext for Ada.
 */

export type ClaimStatus = 'VERIFIED' | 'HELD' | 'NOT_PUBLISHED';

export type Claim = {
  id: string;
  label: string;
  status: ClaimStatus;
};

const CLAIMS: readonly Claim[] = [
  { id: 'geography-count', label: 'Team or geography headcount', status: 'HELD' },
  { id: 'awards', label: 'Awards or rankings', status: 'HELD' },
  { id: 'client-logos', label: 'Named client list', status: 'HELD' },
  { id: 'project-count', label: 'Project or engagement count', status: 'HELD' },
  { id: 'pass-rate', label: 'Audit pass rate or similar outcome metric', status: 'HELD' },
];

export function isPublishable(id: string): boolean {
  const claim = CLAIMS.find(c => c.id === id);
  return claim?.status === 'VERIFIED';
}
