/**
 * Fails if forbidden or non-allowlisted routes appear in this site's KB.
 * Adapted for Pixelette Certified (no Technologies archive corpus).
 */
import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const HERE = path.dirname(url.fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..');
const KB = path.join(ROOT, 'src', 'content', 'pix-kb.json');

const FORBIDDEN_PREFIXES = ['/archive/', '/legacy/', '/old/', '/deprecated/', '/held/'];

const ALLOWED = [
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

const failures = [];

const kb = JSON.parse(fs.readFileSync(KB, 'utf8'));
const docs = kb.docs ?? [];
if (docs.length === 0) {
  failures.push('the knowledge base is empty, so this check would pass vacuously');
}

for (const d of docs) {
  const p = d.path ?? '';
  if (FORBIDDEN_PREFIXES.some(pre => p.startsWith(pre))) {
    failures.push(`forbidden route in the KB: ${p}`);
  }
}

const allowedSrc = fs.readFileSync(path.join(ROOT, 'src', 'lib', 'pix', 'allowlist.ts'), 'utf8');
for (const a of ALLOWED) {
  if (!allowedSrc.includes(`'${a}'`)) {
    failures.push(`this script allows ${a} but allowlist.ts does not; they have drifted`);
  }
}
for (const d of docs) {
  const p = d.path ?? '';
  if (!p) continue; // dynamic / non-linkable
  const ok = p === '/' || ALLOWED.some(a => p === a || p.startsWith(`${a}/`));
  if (!ok) failures.push(`route not on the approved allowlist: ${p}`);
}

process.stdout.write(`pix-kb sources: ${docs.length} docs\n`);

if (failures.length === 0) {
  process.stdout.write('pix-kb sources: no forbidden or non-allowlisted grounding content\n');
  process.exit(0);
}

process.stdout.write(`\nADA SOURCE VIOLATIONS: ${failures.length}\n\n`);
for (const f of failures) process.stdout.write(`  ${f}\n`);
process.exit(1);
