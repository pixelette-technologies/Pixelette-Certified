/**
 * Regulatory landscape for the Saudi Arabia and Qatar overview.
 *
 * The labels are the instruments named in that article. Qatar's national
 * cyber security authority there is the National Cyber Security Agency
 * (NCSA), so the diagram uses NCSA rather than a generic "NIA" mark.
 * The drawing is structural. The words are real text, not an image.
 */

const GROUPS = [
  {
    jurisdiction: "Saudi Arabia",
    instruments: [
      { code: "NCA", role: "National cyber security" },
      { code: "SAMA", role: "Financial sector" },
      { code: "PDPL", role: "Personal data" },
    ],
  },
  {
    jurisdiction: "Qatar",
    instruments: [
      { code: "NCSA", role: "National cyber security" },
      { code: "QCB", role: "Financial sector" },
      { code: "PDPPL", role: "Personal data" },
    ],
  },
] as const;

export default function GccRegulationVisual() {
  return (
    <figure className="relative overflow-hidden border border-line bg-[var(--color-brand-tint)] px-5 py-6 sm:px-7 sm:py-8">
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 360 220"
        className="pointer-events-none absolute -right-6 -top-8 h-48 w-48 text-brand opacity-40"
      >
        <circle cx="250" cy="40" r="70" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="300" cy="90" r="46" fill="none" stroke="currentColor" strokeWidth="1" />
        <path d="M180 20h150M210 70h120" fill="none" stroke="currentColor" strokeWidth="1" />
      </svg>

      <div className="relative grid gap-8 sm:grid-cols-2 sm:gap-6">
        {GROUPS.map((group) => (
          <div key={group.jurisdiction}>
            <p className="font-[family-name:var(--font-display)] text-[1.35rem] leading-tight text-ink">
              {group.jurisdiction}
            </p>
            <ul className="mt-4 space-y-3.5 border-l border-brand pl-4">
              {group.instruments.map((item) => (
                <li key={item.code} className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[19px] top-1.5 h-1.5 w-1.5 rounded-full bg-brand"
                  />
                  <span className="mono text-[13px] tracking-[0.08em] text-brand">{item.code}</span>
                  <span className="mt-0.5 block text-[13px] leading-snug text-muted">{item.role}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <figcaption className="src relative mt-6 max-w-[46ch]">
        Principal instruments named in the article. Which apply depends on the type of organisation.
      </figcaption>
    </figure>
  );
}
