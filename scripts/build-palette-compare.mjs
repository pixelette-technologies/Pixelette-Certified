/**
 * Builds docs/palette-comparison.html — the decision page for the Pixelette
 * Certified brand layer.
 *
 * The point of generating rather than hand-writing it: the component CSS is
 * lifted verbatim out of src/app/globals.css at build time, so the specimens
 * are the site's real components rather than a copy that drifts. Re-run this
 * after touching a token and the page follows.
 *
 * Both themes render from ONE markup template, so the two sides cannot
 * disagree about anything except colour.
 *
 * Output has no <!doctype>/<html>/<body> wrapper: browsers construct those
 * anyway when the file is opened directly, and leaving them off lets the same
 * file publish as an Artifact unchanged.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const SRC = join(ROOT, "src/app/globals.css");
const OUT = join(ROOT, "docs/palette-comparison.html");

const css = readFileSync(SRC, "utf8");

/* ---------------------------------------------------------------------------
   Extraction. Brace-match a block whose declaration opens a line.
   CSS nests, so a depth counter is enough; there are no braces in strings or
   comments in globals.css that would fool it.
   ------------------------------------------------------------------------ */
function extractBlock(source, name, { after = 0 } = {}) {
  // Anchor on a real block opening: `name` at the start of a line, followed by
  // optional whitespace and its brace. A plain indexOf() matches the same words
  // inside the header comment of globals.css, which silently extracts the wrong
  // three lines instead of the 400-odd that were wanted.
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`^[ \\t]*${escaped}[ \\t]*\\{`, "m");
  const match = re.exec(source.slice(after));
  if (!match) throw new Error(`build-palette-compare: no "${name} {" block in globals.css`);

  const bodyStart = after + match.index + match[0].length;
  let depth = 1;
  let i = bodyStart;
  while (depth > 0) {
    if (i >= source.length) throw new Error(`build-palette-compare: unbalanced braces after "${name}"`);
    if (source[i] === "{") depth += 1;
    else if (source[i] === "}") depth -= 1;
    i += 1;
  }
  return source.slice(bodyStart, i - 1).trim();
}

// PT baseline tokens: colour, radius, shadow, container.
const themeStatic = extractBlock(css, "@theme static");

// The fluid scale lives in the :root that follows the "3 - FLUID SCALE" banner.
const scaleMarker = css.indexOf("3 - FLUID SCALE");
const fluidScale = extractBlock(css, ":root", { after: scaleMarker });

// The component classes, unwrapped from their layer. There is no Tailwind in a
// standalone page, so nothing needs to out-rank them.
const components = extractBlock(css, "@layer components");

// The one media query, verbatim, so the sub-768px display-weight bump is real
// when the page is narrowed.
const mobileBlock = extractBlock(css, "@media (max-width: 767px)");

/* ---------------------------------------------------------------------------
   The proposed Certified brand layer. Every ratio in the `note` column was
   computed against these exact values; the page recomputes them at runtime
   from the live tokens so the two can never disagree.
   ------------------------------------------------------------------------ */
const BRAND = [
  ["--color-brand", "#056F62", "#065456", "Eyebrows, links, .pill-brand, .btn fill, focus ring, .tile figures"],
  ["--color-brand-hover", "#045A4F", "#044143", "Button and link hover"],
  ["--color-brand-signal", null, "#14A4A9", "New role. Feature accent, ticks, on-dark. Never text on light."],
  ["--color-brand-wash", "#C7EBDF", "#D2EFEC", "Hero radial inner stop"],
  ["--color-brand-tint", "#E4F4EF", "#E6F4F3", "Diagram and highlight fill"],
];

const NEUTRAL = [
  ["--color-band", "#F4F7FA", "#F3F7F7", "Alternate section band"],
  ["--color-line", "#E2E8EF", "#E1EAE9", "Section rules, table cells"],
  ["--color-line-card", "#DFE6EE", "#DEE8E7", "Card border"],
  ["--color-line-pill", "#DDE4EC", "#DCE6E5", "Pill, input, table header"],
  ["--color-line-strong", "#C3D1DE", "#C2D3D1", "Outline button, emphasis card"],
  ["--color-body", "#414D5C", "#3F4E4E", "Body copy"],
  ["--color-muted", "#5D6B7D", "#5A6C6C", "Secondary copy, labels"],
  ["--color-soft", "#62707F", "#5F7070", "Citations, tertiary"],
];

const DARK = [
  ["--color-footer", "#06222B", "#052A2B", "Footer ground"],
  ["--color-footer-line", "#123240", "#123A38", "Footer rules"],
  ["--color-footer-hover", "#0B2C36", "#0A3433", "Footer row hover"],
  ["--color-footer-accent", "#6FE3CB", "#6FE3CB", "Unchanged — already in Certified's range"],
  ["--color-panel-from", "#04211F", "#031A18", "Panel gradient start"],
  ["--color-panel-to", "#080F0F", "#050C0C", "Panel gradient end"],
  ["--color-panel-line", "#1C4744", "#194542", "Panel border"],
  ["--color-panel-cta-line", "#2A6460", "#276360", "Panel CTA border"],
];

const ALL_TOKENS = [...BRAND, ...NEUTRAL, ...DARK];

// Tokens that do not move: ink, page, footer text ramp, panel text ramp, danger.
const UNCHANGED = [
  "--color-ink", "--color-page", "--color-danger",
  "--color-footer-heading", "--color-footer-link", "--color-footer-legal",
  "--color-panel-label", "--color-panel-body", "--color-panel-pill", "--color-panel-cta",
];

/* Contrast audit. `kind` decides the threshold and how a failure is reported.
   text = 4.5 (WCAG AA body) · ui = 3.0 (AA non-text) · deco = no requirement. */
const CHECKS = [
  { kind: "text", label: "Brand on page", fg: "--color-brand", bg: "--color-page" },
  { kind: "text", label: "Brand on band", fg: "--color-brand", bg: "--color-band" },
  { kind: "text", label: "Button label (white on brand)", fg: "#FFFFFF", bg: "--color-brand" },
  { kind: "text", label: "Button hover (white on brand-hover)", fg: "#FFFFFF", bg: "--color-brand-hover" },
  { kind: "text", label: "Ink on page", fg: "--color-ink", bg: "--color-page" },
  { kind: "text", label: "Body on page", fg: "--color-body", bg: "--color-page" },
  { kind: "text", label: "Body on band", fg: "--color-body", bg: "--color-band" },
  { kind: "text", label: "Muted on page", fg: "--color-muted", bg: "--color-page" },
  { kind: "text", label: "Muted on band", fg: "--color-muted", bg: "--color-band" },
  { kind: "text", label: "Soft on page", fg: "--color-soft", bg: "--color-page" },
  { kind: "text", label: "Danger on page", fg: "--color-danger", bg: "--color-page" },
  { kind: "text", label: "Footer link on footer", fg: "--color-footer-link", bg: "--color-footer" },
  { kind: "text", label: "Footer heading on footer", fg: "--color-footer-heading", bg: "--color-footer" },
  { kind: "text", label: "Footer accent on footer", fg: "--color-footer-accent", bg: "--color-footer" },
  { kind: "text", label: "Footer legal on footer", fg: "--color-footer-legal", bg: "--color-footer" },
  { kind: "text", label: "Panel body on panel", fg: "--color-panel-body", bg: "--color-panel-from" },
  { kind: "text", label: "Panel CTA on panel", fg: "--color-panel-cta", bg: "--color-panel-from" },
  { kind: "text", label: "Panel label on panel", fg: "--color-panel-label", bg: "--color-panel-from" },
  { kind: "ui", label: "Signal on footer (PC only)", fg: "--color-brand-signal", bg: "--color-footer", pcOnly: true },
  // Inherited from the guide and identical in both systems: the outline button's
  // border is the only thing identifying it as a control, so WCAG 1.4.11 wants
  // 3:1 and #C3D1DE gives 1.56. Reported, not silently passed, but not counted
  // against this proposal either — the fix belongs to the shared layer.
  { kind: "ui", label: "Outline button border", fg: "--color-line-strong", bg: "--color-page", inherited: true },
  { kind: "deco", label: "Card border on page", fg: "--color-line-card", bg: "--color-page" },
  { kind: "deco", label: "Band on page", fg: "--color-band", bg: "--color-page" },
];

/* ---------------------------------------------------------------------------
   Specimen markup. Written once, emitted per theme. Uses only the extracted
   component classes plus a handful of .cmp-* layout helpers — no Tailwind
   utilities, because none exist here.
   ------------------------------------------------------------------------ */
const TICK = '<svg class="cmp-tick" viewBox="0 0 16 16" width="15" height="15" aria-hidden="true"><path d="M3 8.5l3.2 3.2L13 5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const ARROW = '<svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M2.5 8h11M9 3.5L13.5 8 9 12.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';

function plate(caption, inner, mod = "") {
  return `<figure class="cmp-plate ${mod}">
  <figcaption class="cmp-plate-cap">${caption}</figcaption>
  <div class="cmp-plate-body">${inner}</div>
</figure>`;
}

/** The specimen board: every class that carries a brand or neutral token. */
function board() {
  return `
${plate("Buttons — default, hover, disabled, focused", `
  <div class="cmp-row">
    <a class="btn" href="#0">Book a gap analysis</a>
    <a class="btn cmp-force-hover" href="#0">Hover</a>
    <button class="btn" type="button" disabled>Disabled</button>
  </div>
  <div class="cmp-row">
    <a class="btn2" href="#0">Talk to a consultant</a>
    <a class="btn2 cmp-force-hover" href="#0">Hover</a>
    <a class="btn-ghost" href="#0">Read the case study ${ARROW}</a>
  </div>
  <div class="cmp-row">
    <a class="btn cmp-force-focus" href="#0">Focus ring</a>
    <a class="btn2 cmp-force-focus" href="#0">Focus ring</a>
  </div>`)}

${plate("Section opening — rule, eyebrow, h2, lead", `
  <div class="sec cmp-sec-demo">
    <div class="eyebrow">Why it matters</div>
    <h2 class="h2" style="margin-top:14px">Certification is a commercial gate, not a compliance chore.</h2>
    <p class="lead" style="margin-top:16px">Enterprise contracts, government frameworks and investor due diligence all ask the same question before the commercial one.</p>
  </div>`)}

${plate("Cards — standard and feature. The signature device shows here.", `
  <div class="cmp-grid3">
    <div class="card">
      <div class="eyebrow">Assess</div>
      <h3 class="h3" style="margin-top:10px">Gap analysis</h3>
      <p class="body" style="margin-top:10px">We map your current controls against the standard and price the shortfall.</p>
    </div>
    <div class="card card-feature">
      <div class="eyebrow">Implement</div>
      <h3 class="h3" style="margin-top:10px">Build the system</h3>
      <p class="body" style="margin-top:10px">Policies, evidence and training, written for your business rather than lifted from a template.</p>
    </div>
    <div class="card">
      <div class="eyebrow">Certify</div>
      <h3 class="h3" style="margin-top:10px">Audit support</h3>
      <p class="body" style="margin-top:10px">We sit with you through Stage 1 and Stage 2 and handle the auditor directly.</p>
    </div>
  </div>`)}

${plate("Stat tiles and citation", `
  <div class="cmp-grid4">
    <div class="tile"><b>50+</b><span>ISO Certifications Delivered</span></div>
    <div class="tile"><b>98%</b><span>First-Attempt Audit Pass Rate</span></div>
    <div class="tile"><b>10 Weeks</b><span>Average to Certification</span></div>
    <div class="tile"><b>Global</b><span>UK, UAE, Saudi Arabia, Qatar, EU, Americas, APAC</span></div>
  </div>
  <p class="src" style="margin-top:12px">Source: Pixelette Certified delivery record, 2023–2026.</p>`)}

${plate("Pricing card — highlighted tier with tick list", `
  <div class="cmp-grid2">
    <div class="card">
      <div class="eyebrow">Essentials</div>
      <p class="mono cmp-figure">£4,950</p>
      <div class="rule" style="margin:18px 0"></div>
      <ul class="cmp-ticks">
        <li>${TICK}<span>Gap analysis and scope</span></li>
        <li>${TICK}<span>Policy set and evidence pack</span></li>
        <li>${TICK}<span>One remote audit day</span></li>
      </ul>
      <a class="btn2 cmp-block" href="#0" style="margin-top:20px">Choose Essentials</a>
    </div>
    <div class="card card-feature">
      <div class="eyebrow">Complete</div>
      <p class="mono cmp-figure">£9,850</p>
      <div class="rule" style="margin:18px 0"></div>
      <ul class="cmp-ticks">
        <li>${TICK}<span>Everything in Essentials</span></li>
        <li>${TICK}<span>Stage 1 and Stage 2 attendance</span></li>
        <li>${TICK}<span>Twelve months of surveillance support</span></li>
      </ul>
      <a class="btn cmp-block" href="#0" style="margin-top:20px">Choose Complete</a>
    </div>
  </div>`)}

${plate("FAQ rows — divider-separated, expanded in place", `
  <div class="cmp-faq">
    <div class="cmp-faq-row">
      <h4 class="h4">How long does ISO 27001 actually take?</h4>
      <p class="body" style="margin-top:10px">Ten weeks from kickoff to Stage 2 for most organisations under 250 staff. Larger scopes run to fourteen.</p>
    </div>
    <div class="cmp-faq-row">
      <h4 class="h4">Is the fee really fixed?</h4>
      <p class="body" style="margin-top:10px">Yes. The only variable is the certification body's own audit fee, which is paid to them directly.</p>
    </div>
  </div>`)}

${plate("Table", `
  <div class="table-wrap">
    <table class="table">
      <caption>Standards and typical duration</caption>
      <thead><tr><th>Standard</th><th>Scope</th><th>Typical duration</th></tr></thead>
      <tbody>
        <tr><td>ISO 27001</td><td>Information security management</td><td>10 weeks</td></tr>
        <tr><td>ISO 42001</td><td>AI management systems</td><td>12 weeks</td></tr>
        <tr><td>Cyber Essentials Plus</td><td>Technical controls verification</td><td>3 weeks</td></tr>
      </tbody>
    </table>
  </div>`)}

${plate("Form controls, including the error state", `
  <div class="cmp-form">
    <div>
      <label class="label" for="f-name-@ID">Full name</label>
      <input class="input" id="f-name-@ID" type="text" value="Alex Whitfield">
    </div>
    <div>
      <label class="label" for="f-std-@ID">Standard of interest</label>
      <select class="select" id="f-std-@ID"><option>ISO 27001</option><option>ISO 42001</option></select>
    </div>
    <div>
      <label class="label" for="f-email-@ID">Work email</label>
      <input class="input cmp-force-focus" id="f-email-@ID" type="text" placeholder="you@company.com">
      <p class="field-error">Enter a work email address so we can reach the right team.</p>
    </div>
    <div>
      <label class="label" for="f-msg-@ID">What are you trying to win?</label>
      <textarea class="textarea" id="f-msg-@ID" placeholder="Tell us about the contract or framework"></textarea>
    </div>
  </div>`)}

${plate("Pills, inline links and long-form prose", `
  <div class="cmp-row">
    <span class="pill">ISO 27001</span>
    <span class="pill">Cyber Essentials</span>
    <span class="pill pill-brand">UKAS accredited</span>
  </div>
  <div class="prose" style="margin-top:20px">
    <p>Most organisations arrive here because a customer asked for a certificate. The <a href="#0">gap analysis</a> exists to tell you how far off you are before anyone signs anything.</p>
    <blockquote>The auditor does not care how good your intentions are. They care whether the evidence exists on the day.</blockquote>
    <p>Scope is the single biggest lever on cost. Narrow it honestly and <strong>the whole programme gets cheaper</strong>.</p>
  </div>`)}

${plate("Dark panel", `
  <div class="panel">
    <div class="eyebrow">Gap analysis</div>
    <h3 class="h3" style="margin-top:12px">Thirty minutes, no fee, no obligation.</h3>
    <p class="body" style="margin-top:12px">We will tell you which standard your buyer actually wants, what it will cost, and how long it takes.</p>
    <div class="cmp-row" style="margin-top:20px">
      <span class="pill">No sales script</span>
      <a class="btn-panel" href="#0">Book the call ${ARROW}</a>
    </div>
  </div>`, "cmp-plate-dark")}

${plate("Footer strip", `
  <div class="footer cmp-footer-demo">
    <div class="eyebrow">Pixelette Certified</div>
    <p class="cmp-footer-links"><a href="#0" class="flink">ISO 27001</a><a href="#0" class="flink">ISO 42001</a><a href="#0" class="flink">Cyber Essentials</a><a href="#0" class="flink">Case studies</a></p>
    <div class="cmp-row" style="margin-top:12px"><span class="pill">UK headquartered</span><span class="pill">Globally delivered</span></div>
  </div>`, "cmp-plate-dark")}
`;
}

/** The full homepage-shaped composition, in real Certified copy. */
function composition() {
  return `
<section class="wash">
  <div class="wrap cmp-hero">
    <div class="cmp-pills">
      <span class="pill">ISO 27001</span><span class="pill">ISO 42001</span><span class="pill">Cyber Essentials</span>
      <span class="pill">GDPR</span><span class="pill">ISO 9001</span><span class="pill">ISO 22301</span><span class="pill">vCISO</span>
    </div>
    <h1 class="h1 cmp-hero-h1">
      <span style="display:block">Your Next Enterprise Deal Is Waiting on a Certificate You Don&rsquo;t Have Yet.</span>
      <span class="cmp-hero-accent">We Fix That in 10 Weeks.</span>
    </h1>
    <p class="lead cmp-hero-lead">Enterprise contracts. Government frameworks. Investor due diligence. The deals you&rsquo;re losing because you&rsquo;re not yet certified, we close that gap in 10 weeks. Fixed fee. 98% first-attempt pass rate. UK-headquartered. Globally delivered.</p>
    <div class="cmp-row cmp-center" style="margin-top:36px">
      <a class="btn" href="#0">See Your 10-Week Certification Roadmap</a>
      <a class="btn2" href="#0">Talk to a Consultant</a>
    </div>
  </div>
</section>

<section class="band-alt cmp-band-pad" aria-label="Track record">
  <div class="wrap cmp-grid4">
    <div class="tile"><b>50+</b><span>ISO Certifications Delivered</span></div>
    <div class="tile"><b>98%</b><span>First-Attempt Audit Pass Rate</span></div>
    <div class="tile"><b>10 Weeks</b><span>Average to Certification</span></div>
    <div class="tile"><b>Global</b><span>UK, UAE, Saudi Arabia, Qatar, EU, Americas, APAC</span></div>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <div class="eyebrow">What we do</div>
    <h2 class="h2" style="margin-top:14px;max-width:20ch">Every standard your buyer is likely to ask for.</h2>
    <p class="lead" style="margin-top:16px">One team, one fixed fee, one roadmap. We run the implementation and sit with you through the audit.</p>
    <div class="cmp-grid3" style="margin-top:36px">
      <div class="card">
        <div class="eyebrow">Information security</div>
        <h3 class="h3" style="margin-top:10px">ISO 27001</h3>
        <p class="body" style="margin-top:10px">The certificate enterprise procurement asks for by name. Ten weeks, fixed fee.</p>
        <p style="margin-top:16px"><a class="link flink" href="#0">Explore ISO 27001 ${ARROW}</a></p>
      </div>
      <div class="card card-feature">
        <div class="eyebrow">AI governance</div>
        <h3 class="h3" style="margin-top:10px">ISO 42001</h3>
        <p class="body" style="margin-top:10px">The first AI management standard. Increasingly the condition of selling AI into regulated buyers.</p>
        <p style="margin-top:16px"><a class="link flink" href="#0">Explore ISO 42001 ${ARROW}</a></p>
      </div>
      <div class="card">
        <div class="eyebrow">Technical controls</div>
        <h3 class="h3" style="margin-top:10px">Cyber Essentials</h3>
        <p class="body" style="margin-top:10px">Mandatory for most UK government contracts. Three weeks from kickoff.</p>
        <p style="margin-top:16px"><a class="link flink" href="#0">Explore Cyber Essentials ${ARROW}</a></p>
      </div>
    </div>
  </div>
</section>

<section class="sec band-alt">
  <div class="wrap">
    <div class="eyebrow">How it works</div>
    <h2 class="h2" style="margin-top:14px;max-width:18ch">Three stages. No surprises.</h2>
    <div class="cmp-steps">
      <div class="cmp-step"><span class="mono cmp-step-n">01</span><h4 class="h4">Gap analysis</h4><p class="small">Thirty minutes to establish scope, standard and cost.</p></div>
      <div class="cmp-step"><span class="mono cmp-step-n">02</span><h4 class="h4">Implementation</h4><p class="small">Policies, controls and evidence, built around how you actually work.</p></div>
      <div class="cmp-step"><span class="mono cmp-step-n">03</span><h4 class="h4">Certification</h4><p class="small">We attend Stage 1 and Stage 2 and manage the auditor.</p></div>
    </div>
  </div>
</section>

<section class="sec band-closing">
  <div class="wrap cmp-center">
    <div class="eyebrow">Free gap analysis</div>
    <h2 class="h2" style="margin-top:14px;max-width:22ch;margin-inline:auto">Find out what certification would actually cost you.</h2>
    <p class="lead" style="margin-top:16px;margin-inline:auto">Thirty minutes with a consultant who has taken more than fifty organisations through audit.</p>
    <div class="cmp-row cmp-center" style="margin-top:32px"><a class="btn" href="#0">Book the call</a></div>
  </div>
</section>

<footer class="footer cmp-footer-full">
  <div class="wrap">
    <div class="cmp-footer-cols">
      <div>
        <div class="eyebrow">Pixelette Certified</div>
        <p class="cmp-footer-body">Compliance. Governance. Cyber Trust.<br>66 Paul Street, London, EC2A 4NA</p>
      </div>
      <div><div class="eyebrow">Standards</div><p class="cmp-footer-links"><a href="#0" class="flink">ISO 27001</a><a href="#0" class="flink">ISO 42001</a><a href="#0" class="flink">ISO 9001</a></p></div>
      <div><div class="eyebrow">Services</div><p class="cmp-footer-links"><a href="#0" class="flink">vCISO</a><a href="#0" class="flink">vDPO</a><a href="#0" class="flink">Penetration testing</a></p></div>
      <div><div class="eyebrow">Company</div><p class="cmp-footer-links"><a href="#0" class="flink">About</a><a href="#0" class="flink">Case studies</a><a href="#0" class="flink">Contact</a></p></div>
      <div><div class="eyebrow">Legal</div><p class="cmp-footer-links"><a href="#0" class="flink">Privacy policy</a><a href="#0" class="flink">Cookie policy</a></p></div>
    </div>
    <div class="cmp-footer-base"><span>Pixelette Group Ltd &middot; 07251823 &middot; England and Wales</span><span class="cmp-row"><span class="pill">UK</span><span class="pill">UAE</span><span class="pill">EU</span></span></div>
  </div>
</footer>
`;
}

/* ---------------------------------------------------------------------------
   Assembly
   ------------------------------------------------------------------------ */
const tokenRows = (rows, group) => rows.map(([name, pt, pc, note]) => {
  const changed = pt !== null && pt.toUpperCase() !== pc.toUpperCase();
  return `<tr data-group="${group}"${changed ? "" : ' class="cmp-unchanged"'}>
    <td class="cmp-tok">${name}</td>
    <td class="cmp-sw">${pt ? `<i style="background:${pt}"></i><code>${pt}</code>` : '<span class="cmp-none">not in PT</span>'}</td>
    <td class="cmp-sw">${pc ? `<i style="background:${pc}"></i><code>${pc}</code>` : ""}</td>
    <td class="cmp-note">${note}</td>
  </tr>`;
}).join("\n");

/* The page is INVERTED relative to its first build. globals.css now holds the
   Certified layer, so the live extraction serves the Certified column and the
   guide is carried here as a frozen historical reference. Had this stayed as
   it was, both columns would render the same palette and the page would
   quietly stop comparing anything.

   Because the Certified column is read from source, the page doubles as a
   regression check: it answers "does the live site still match what we signed
   off", and the mismatch report below fails the build if it does not. */
const liveTokens = Object.fromEntries(
  [...themeStatic.matchAll(/(--color-[\w-]+):\s*(#[0-9A-Fa-f]{3,8})/g)].map((m) => [m[1], m[2]])
);

const drift = ALL_TOKENS.filter(([name, , expected]) => {
  const live = liveTokens[name];
  return !live || live.toUpperCase() !== expected.toUpperCase();
});
if (drift.length) {
  console.error("\nglobals.css has drifted from the signed-off Certified palette:\n");
  for (const [name, , expected] of drift) {
    console.error(`  ${name}: expected ${expected}, globals.css has ${liveTokens[name] ?? "nothing"}`);
  }
  console.error("\nUpdate globals.css, or update ALL_TOKENS here if the change is intended.\n");
  process.exit(1);
}

// The guide palette, frozen. PT has no signal role, so point it at PT's brand
// and shared markup still paints.
const ptVars = ALL_TOKENS
  .filter(([, pt]) => pt !== null)
  .map(([name, pt]) => `  ${name}: ${pt};`)
  .join("\n");
const boardPT = board().replace(/@ID/g, "pt");
const boardPC = board().replace(/@ID/g, "pc");
const comp = composition();

const html = `<meta charset="utf-8">
<title>Certified Brand Layer</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&family=Newsreader:opsz,wght@6..72,300;6..72,400&family=Outfit:wght@400;500;600&family=Source+Serif+4:opsz,wght@8..60,300;8..60,400&family=Spectral:wght@300;400&display=swap">

<style>
/* ===========================================================================
   1. TOKENS LIFTED FROM src/app/globals.css  (do not edit here — edit source)
   ======================================================================== */
:root {
  --font-display: "Newsreader", Georgia, "Times New Roman", serif;
  --font-ui: "Outfit", "Helvetica Neue", Arial, sans-serif;
  --font-data: "IBM Plex Mono", "SFMono-Regular", Consolas, monospace;
}
:root {
${themeStatic}
}
:root {
${fluidScale}
}

/* ---- The Certified column needs no overrides: :root above IS the live
   Certified layer, lifted from globals.css. It is the guide that is now the
   historical reference, frozen here so the comparison survives. ------------ */
[data-theme="pt"] {
${ptVars}
  /* the guide has no signal role - its one green does every job */
  --color-brand-signal: #056F62;
}

/* ===========================================================================
   2. COMPONENT CLASSES LIFTED FROM globals.css @layer components
   ======================================================================== */
${components}

${mobileBlock ? `@media (max-width: 767px) {\n${mobileBlock}\n}` : ""}

/* ===========================================================================
   3. SOURCE PATCHES
   Two rules in globals.css hard-code hexes instead of reading their token, so
   they would silently escape the neutral rotation. Patched here so the
   comparison is honest; flagged on the page as a source fix.
   ======================================================================== */
.band-closing { background: linear-gradient(180deg, var(--color-page) 0%, var(--color-band) 100%); }
.footer .pill { border-color: var(--color-footer-line); }

/* ===========================================================================
   4. SIGNATURE DEVICE — applied to the Certified side only
   ======================================================================== */
/* Inverted along with the tokens. The extracted component CSS now carries
   Certified's left accent as its default, so it is the GUIDE column that needs
   resetting back to its own top-border treatment. */
[data-theme="pt"] .card-feature {
  border-top: 3px solid var(--color-brand);
  border-left: 1px solid var(--color-line-strong);
}
[data-theme="pt"] .sec::before { display: none; }

/* The toggle still reskins the Certified column. "left" is now the default and
   needs no rule; the other two revert it and apply their own. */
[data-device="eyebrow"] [data-theme="pc"] .card-feature,
[data-device="top"]     [data-theme="pc"] .card-feature {
  border-top: 3px solid var(--color-brand);
  border-left: 1px solid var(--color-line-strong);
}
[data-device="eyebrow"] [data-theme="pc"] .sec::before,
[data-device="top"]     [data-theme="pc"] .sec::before { display: none; }

[data-device="eyebrow"] [data-theme="pc"] .eyebrow::before {
  content: "";
  display: inline-block;
  width: 16px;
  height: 1px;
  margin-right: 10px;
  vertical-align: middle;
  background: currentColor;
}

/* ===========================================================================
   5. DISPLAY FACE — Certified side only
   ======================================================================== */
[data-face="spectral"] [data-theme="pc"] { --font-display: "Spectral", Georgia, serif; }
[data-face="source"]   [data-theme="pc"] { --font-display: "Source Serif 4", Georgia, serif; }

/* ===========================================================================
   6. PAGE CHROME  (.cmp-* namespace — cannot collide with the extracted CSS)

   The bench is deliberately achromatic. Any tinted surround biases a colour
   judgement, and the whole page exists to support one. The single chrome
   accent is amber, which sits outside both brands' 168–198deg range, so a
   chrome mark can never be mistaken for specimen content.
   ======================================================================== */
:root {
  --c-bench:    #1E2022;
  --c-well:     #141618;
  --c-raise:    #26292B;
  --c-rule:     #34383B;
  --c-ink:      #E9EBEC;
  --c-dim:      #979DA0;
  --c-mark:     #E8B23F;
  --c-good:     #79C08A;
  --c-bad:      #E4715F;
}

body {
  margin: 0;
  background: var(--c-bench);
  color: var(--c-ink);
  font-family: "Archivo", "Helvetica Neue", Arial, sans-serif;
  font-size: 15px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}
.cmp-shell { max-width: 1400px; margin-inline: auto; padding: 0 28px 120px; }
.cmp-mono { font-family: "IBM Plex Mono", Consolas, monospace; }

/* -- masthead ----------------------------------------------------------- */
.cmp-mast { padding: 72px 0 40px; border-bottom: 1px solid var(--c-rule); }
.cmp-kicker {
  font-family: "IBM Plex Mono", Consolas, monospace;
  font-size: 11px; letter-spacing: .18em; text-transform: uppercase; color: var(--c-mark);
}
.cmp-mast h1 {
  font-size: clamp(30px, 1.4rem + 2.4vw, 52px);
  line-height: 1.08; font-weight: 500; letter-spacing: -.02em;
  margin: 18px 0 0; max-width: 20ch; text-wrap: balance;
}
.cmp-mast p { color: var(--c-dim); max-width: 68ch; margin: 18px 0 0; }
.cmp-meta { display: flex; flex-wrap: wrap; gap: 10px 28px; margin-top: 26px; font-size: 12px; color: var(--c-dim); }
.cmp-meta b { color: var(--c-ink); font-weight: 500; }

/* -- instrument bar ----------------------------------------------------- */
.cmp-bar {
  position: sticky; top: 0; z-index: 40;
  display: flex; flex-wrap: wrap; align-items: center; gap: 10px 26px;
  padding: 12px 0; margin-bottom: 8px;
  background: color-mix(in srgb, var(--c-bench) 94%, transparent);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--c-rule);
}
.cmp-ctl { display: flex; align-items: center; gap: 10px; }
.cmp-ctl > span {
  font-family: "IBM Plex Mono", Consolas, monospace;
  font-size: 10.5px; letter-spacing: .14em; text-transform: uppercase; color: var(--c-dim);
}
.cmp-seg { display: flex; border: 1px solid var(--c-rule); border-radius: 3px; overflow: hidden; }
.cmp-seg button {
  appearance: none; border: 0; background: transparent; cursor: pointer;
  font: inherit; font-size: 12.5px; color: var(--c-dim);
  padding: 7px 13px; min-height: 34px;
  border-right: 1px solid var(--c-rule);
}
.cmp-seg button:last-child { border-right: 0; }
.cmp-seg button:hover { color: var(--c-ink); background: var(--c-raise); }
.cmp-seg button[aria-pressed="true"] { background: var(--c-mark); color: #201703; font-weight: 500; }
.cmp-seg button:focus-visible { outline: 2px solid var(--c-mark); outline-offset: -2px; }

/* -- sections ----------------------------------------------------------- */
.cmp-sec { padding: 64px 0 0; }
.cmp-sec > h2 {
  font-size: 26px; font-weight: 500; letter-spacing: -.014em; margin: 0;
  display: flex; align-items: baseline; gap: 14px;
}
.cmp-sec > h2 em {
  font-family: "IBM Plex Mono", Consolas, monospace;
  font-style: normal; font-size: 12px; color: var(--c-mark); letter-spacing: .1em;
}
.cmp-sec > p { color: var(--c-dim); max-width: 74ch; margin: 14px 0 0; }
.cmp-sec > p + p { margin-top: 10px; }
.cmp-lede b { color: var(--c-ink); font-weight: 500; }

/* -- callout ------------------------------------------------------------ */
.cmp-callout {
  border: 1px solid var(--c-rule); border-left: 3px solid var(--c-mark);
  border-radius: 3px; padding: 18px 22px; margin-top: 26px;
  background: var(--c-well); color: var(--c-dim); font-size: 14px;
}
.cmp-callout b { color: var(--c-ink); font-weight: 500; }
.cmp-callout code { font-family: "IBM Plex Mono", Consolas, monospace; font-size: 12.5px; color: var(--c-mark); }

/* -- invariants list ---------------------------------------------------- */
.cmp-lock { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1px; margin-top: 28px; background: var(--c-rule); border: 1px solid var(--c-rule); border-radius: 3px; overflow: hidden; }
.cmp-lock div { background: var(--c-well); padding: 16px 18px; }
.cmp-lock dt { font-family: "IBM Plex Mono", Consolas, monospace; font-size: 10.5px; letter-spacing: .14em; text-transform: uppercase; color: var(--c-dim); margin: 0; }
.cmp-lock dd { margin: 6px 0 0; font-size: 14px; color: var(--c-ink); }

/* -- token table -------------------------------------------------------- */
.cmp-table-wrap { overflow-x: auto; margin-top: 28px; border: 1px solid var(--c-rule); border-radius: 3px; }
table.cmp-tokens { width: 100%; border-collapse: collapse; font-size: 13.5px; background: var(--c-well); }
table.cmp-tokens th {
  font-family: "IBM Plex Mono", Consolas, monospace;
  font-size: 10.5px; letter-spacing: .12em; text-transform: uppercase; text-align: left;
  color: var(--c-dim); font-weight: 400; padding: 12px 16px; border-bottom: 1px solid var(--c-rule);
  white-space: nowrap;
}
table.cmp-tokens td { padding: 9px 16px; border-bottom: 1px solid var(--c-rule); vertical-align: middle; }
table.cmp-tokens tr:last-child td { border-bottom: 0; }
.cmp-tok { font-family: "IBM Plex Mono", Consolas, monospace; font-size: 12px; color: var(--c-ink); white-space: nowrap; }
.cmp-sw { white-space: nowrap; }
.cmp-sw i { display: inline-block; width: 26px; height: 16px; border-radius: 2px; vertical-align: -3px; margin-right: 9px; box-shadow: inset 0 0 0 1px rgba(255,255,255,.14); }
.cmp-sw code { font-family: "IBM Plex Mono", Consolas, monospace; font-size: 12px; color: var(--c-dim); font-variant-numeric: tabular-nums; }
.cmp-note { color: var(--c-dim); font-size: 13px; }
.cmp-none { color: var(--c-dim); font-size: 12px; font-style: italic; }
.cmp-unchanged .cmp-tok, .cmp-unchanged .cmp-note { opacity: .55; }

/* -- contrast audit ----------------------------------------------------- */
.cmp-audit { display: grid; grid-template-columns: repeat(auto-fit, minmax(330px, 1fr)); gap: 22px; margin-top: 28px; }
.cmp-audit section { border: 1px solid var(--c-rule); border-radius: 3px; background: var(--c-well); overflow: hidden; }
.cmp-audit h3 { margin: 0; padding: 13px 16px; font-size: 13px; font-weight: 500; border-bottom: 1px solid var(--c-rule); display: flex; justify-content: space-between; align-items: center; }
.cmp-audit h3 span { font-family: "IBM Plex Mono", Consolas, monospace; font-size: 10.5px; letter-spacing: .12em; text-transform: uppercase; color: var(--c-dim); }
.cmp-audit ul { list-style: none; margin: 0; padding: 0; }
.cmp-audit li { display: flex; align-items: center; gap: 12px; padding: 8px 16px; border-bottom: 1px solid var(--c-rule); font-size: 13px; }
.cmp-audit li:last-child { border-bottom: 0; }
.cmp-audit li span:first-child { flex: 1; color: var(--c-dim); }
.cmp-ratio { font-family: "IBM Plex Mono", Consolas, monospace; font-variant-numeric: tabular-nums; color: var(--c-ink); }
.cmp-badge { font-family: "IBM Plex Mono", Consolas, monospace; font-size: 10px; letter-spacing: .1em; padding: 3px 7px; border-radius: 2px; min-width: 44px; text-align: center; }
.cmp-badge[data-r="aaa"]  { background: rgba(121,192,138,.16); color: var(--c-good); }
.cmp-badge[data-r="aa"]   { background: rgba(121,192,138,.10); color: var(--c-good); }
.cmp-badge[data-r="ui"]   { background: rgba(232,178,63,.14); color: var(--c-mark); }
.cmp-badge[data-r="deco"] { background: var(--c-raise); color: var(--c-dim); }
.cmp-badge[data-r="inherit"] { background: rgba(232,178,63,.14); color: var(--c-mark); }
.cmp-badge[data-r="fail"] { background: rgba(228,113,95,.16); color: var(--c-bad); }

/* -- specimen plates ---------------------------------------------------- */
.cmp-boards { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 28px; align-items: start; }
.cmp-col { min-width: 0; }
.cmp-col-head {
  display: flex; align-items: baseline; justify-content: space-between; gap: 12px;
  padding-bottom: 10px; margin-bottom: 14px; border-bottom: 1px solid var(--c-rule);
  position: sticky; top: 59px; z-index: 20; background: var(--c-bench);
}
.cmp-col-head b { font-size: 15px; font-weight: 500; }
.cmp-col-head span { font-family: "IBM Plex Mono", Consolas, monospace; font-size: 10.5px; letter-spacing: .12em; text-transform: uppercase; color: var(--c-dim); }

.cmp-plate { margin: 0 0 18px; border: 1px solid var(--c-rule); border-radius: 4px; overflow: hidden; background: var(--c-well); }
.cmp-plate-cap {
  font-family: "IBM Plex Mono", Consolas, monospace;
  font-size: 10.5px; letter-spacing: .1em; text-transform: uppercase; color: var(--c-dim);
  padding: 9px 14px; border-bottom: 1px solid var(--c-rule);
}
.cmp-plate-body {
  padding: 24px;
  background: var(--color-page);
  color: var(--color-ink);
  font-family: var(--font-ui);
  font-size: 16px;
  line-height: 1.55;
}
.cmp-plate-dark .cmp-plate-body { background: var(--c-well); padding: 20px; }

/* specimen-internal layout helpers */
.cmp-row { display: flex; flex-wrap: wrap; align-items: center; gap: 14px; }
.cmp-row + .cmp-row { margin-top: 14px; }
.cmp-center { justify-content: center; text-align: center; }
.cmp-grid2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(215px, 1fr)); gap: 18px; }
.cmp-grid3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(215px, 1fr)); gap: 18px; }
.cmp-grid4 { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 14px; }
.cmp-sec-demo { padding-block: 28px; }
.cmp-figure { font-size: 30px; font-weight: 500; letter-spacing: -.02em; color: var(--color-brand); margin: 14px 0 0; }
.cmp-ticks { list-style: none; margin: 0; padding: 0; display: grid; gap: 9px; }
.cmp-ticks li { display: flex; gap: 10px; align-items: flex-start; font-size: 15px; color: var(--color-body); }
.cmp-tick { color: var(--color-brand-signal); flex: none; margin-top: 3px; }
.cmp-block { display: flex; width: 100%; }
.cmp-faq-row { padding: 20px 0; border-bottom: 1px solid var(--color-line); }
.cmp-faq-row:first-child { padding-top: 0; }
.cmp-faq-row:last-child { border-bottom: 0; padding-bottom: 0; }
.cmp-form { display: grid; gap: 18px; }
.cmp-footer-demo { padding: 24px; border-radius: 4px; }
.cmp-footer-links { display: flex; flex-wrap: wrap; gap: 4px 20px; margin: 10px 0 0; }
.cmp-footer-links a { color: var(--color-footer-link); text-decoration: none; font-size: 14.5px; }
.cmp-footer-links a:hover { color: var(--color-footer-heading); }

/* forced states — the page has to show hover/focus without a pointer */
.cmp-force-hover.btn { background: var(--color-brand-hover); }
.cmp-force-hover.btn2 { border-color: var(--color-brand); color: var(--color-brand); }
.cmp-force-focus { outline: 2px solid var(--color-brand); outline-offset: 2px; border-radius: 2px; }
.cmp-force-focus.input { border-color: var(--color-brand); }

/* -- composition -------------------------------------------------------- */
.cmp-stage { margin-top: 28px; border: 1px solid var(--c-rule); border-radius: 4px; overflow: hidden; }
.cmp-stage-head {
  display: flex; align-items: center; justify-content: space-between; gap: 14px;
  padding: 10px 16px; border-bottom: 1px solid var(--c-rule); background: var(--c-well);
  font-family: "IBM Plex Mono", Consolas, monospace; font-size: 10.5px;
  letter-spacing: .12em; text-transform: uppercase; color: var(--c-dim);
}
.cmp-stage-head b { color: var(--c-mark); font-weight: 400; }

.cmp-canvas { position: relative; background: var(--color-page); }
.cmp-layer {
  background: var(--color-page);
  color: var(--color-ink);
  font-family: var(--font-ui);
  font-size: 16px;
  line-height: 1.55;
}
/* wipe + flip: both layers stacked, PC clipped from the handle rightwards */
[data-mode="wipe"] .cmp-layer,
[data-mode="flip"] .cmp-layer { position: absolute; inset: 0 0 auto 0; }
[data-mode="wipe"] .cmp-layer-pc,
[data-mode="flip"] .cmp-layer-pc { clip-path: inset(0 0 0 var(--wipe, 50%)); }
[data-mode="flip"] .cmp-layer-pc { transition: clip-path .18s ease; }
[data-mode="stack"] .cmp-layer { position: static; }
[data-mode="stack"] .cmp-layer-pc { border-top: 2px solid var(--c-mark); }

.cmp-handle {
  position: absolute; top: 0; bottom: 0; left: var(--wipe, 50%);
  width: 2px; background: var(--c-mark); cursor: ew-resize; z-index: 5;
  transform: translateX(-1px);
}
.cmp-handle::after {
  content: ""; position: absolute; top: 50%; left: 50%; width: 34px; height: 34px;
  transform: translate(-50%, -50%); border-radius: 50%;
  background: var(--c-mark); box-shadow: 0 2px 12px rgba(0,0,0,.4);
}
.cmp-handle::before {
  content: ""; position: absolute; top: 50%; left: 50%; width: 13px; height: 8px;
  transform: translate(-50%, -50%); z-index: 1;
  background: #201703;
  clip-path: polygon(0 50%, 34% 0, 34% 35%, 66% 35%, 66% 0, 100% 50%, 66% 100%, 66% 65%, 34% 65%, 34% 100%);
}
[data-mode="flip"] .cmp-handle, [data-mode="stack"] .cmp-handle { display: none; }
.cmp-stage-tag {
  position: absolute; top: 12px; z-index: 6;
  font-family: "IBM Plex Mono", Consolas, monospace; font-size: 10px; letter-spacing: .12em;
  text-transform: uppercase; padding: 4px 9px; border-radius: 2px;
  background: rgba(20,22,24,.86); color: #E9EBEC;
}
.cmp-tag-pt { left: 12px; }
.cmp-tag-pc { right: 12px; }
[data-mode="stack"] .cmp-stage-tag { display: none; }
.cmp-stack-tag { display: none; }
[data-mode="stack"] .cmp-stack-tag {
  display: block; padding: 8px 16px; background: var(--c-well);
  font-family: "IBM Plex Mono", Consolas, monospace; font-size: 10.5px;
  letter-spacing: .12em; text-transform: uppercase; color: var(--c-dim);
}

/* composition-internal helpers */
.cmp-hero { padding-block: 80px; text-align: center; }
.cmp-pills { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; }
.cmp-hero-h1 { margin: 32px auto 0; max-width: 22ch; }
.cmp-hero-accent { display: block; margin-top: 8px; color: var(--color-brand); }
.cmp-hero-lead { margin: 28px auto 0; }
.cmp-band-pad { padding-block: 50px; }
.cmp-steps { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 0; margin-top: 36px; border-top: 1px solid var(--color-line); }
.cmp-step { padding: 24px 24px 24px 0; border-right: 1px solid var(--color-line); }
.cmp-step:last-child { border-right: 0; }
.cmp-step + .cmp-step { padding-left: 24px; }
.cmp-step-n { display: block; font-size: 12px; letter-spacing: .14em; color: var(--color-brand-signal); margin-bottom: 10px; }
.cmp-step .small { margin: 8px 0 0; }
.cmp-footer-full { padding-block: 56px 28px; }
.cmp-footer-cols { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 32px; }
.cmp-footer-body { color: var(--color-footer-link); font-size: 14.5px; margin: 12px 0 0; }
.cmp-footer-base {
  display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 16px;
  margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--color-footer-line);
  color: var(--color-footer-legal); font-size: 13px;
}

/* -- face specimen ------------------------------------------------------ */
.cmp-faces { display: grid; gap: 18px; margin-top: 28px; }
.cmp-face { border: 1px solid var(--c-rule); border-radius: 4px; overflow: hidden; background: var(--c-well); }
.cmp-face-head { display: flex; justify-content: space-between; gap: 14px; padding: 10px 16px; border-bottom: 1px solid var(--c-rule); font-family: "IBM Plex Mono", Consolas, monospace; font-size: 10.5px; letter-spacing: .12em; text-transform: uppercase; color: var(--c-dim); }
.cmp-face-head b { color: var(--c-mark); font-weight: 400; }
.cmp-face-body { padding: 30px 26px; background: var(--color-page); }
.cmp-face-body .h1 { max-width: 20ch; }
.cmp-face-body .lead { margin-top: 16px; }
.cmp-face-body .cmp-row { margin-top: 20px; }

/* -- impact list -------------------------------------------------------- */
.cmp-impact { width: 100%; border-collapse: collapse; margin-top: 28px; font-size: 13.5px; border: 1px solid var(--c-rule); border-radius: 3px; background: var(--c-well); }
.cmp-impact th { font-family: "IBM Plex Mono", Consolas, monospace; font-size: 10.5px; letter-spacing: .12em; text-transform: uppercase; text-align: left; color: var(--c-dim); font-weight: 400; padding: 12px 16px; border-bottom: 1px solid var(--c-rule); }
.cmp-impact td { padding: 10px 16px; border-bottom: 1px solid var(--c-rule); vertical-align: top; color: var(--c-dim); }
.cmp-impact tr:last-child td { border-bottom: 0; }
.cmp-impact td:first-child { font-family: "IBM Plex Mono", Consolas, monospace; font-size: 12px; color: var(--c-ink); white-space: nowrap; }
.cmp-impact td b { color: var(--c-ink); font-weight: 500; font-variant-numeric: tabular-nums; }

.cmp-foot { margin-top: 72px; padding-top: 22px; border-top: 1px solid var(--c-rule); color: var(--c-dim); font-size: 12.5px; display: flex; flex-wrap: wrap; gap: 8px 24px; }
.cmp-foot code { font-family: "IBM Plex Mono", Consolas, monospace; color: var(--c-mark); }

/* -- narrow ------------------------------------------------------------- */
@media (max-width: 1000px) {
  .cmp-boards { grid-template-columns: 1fr; }
  .cmp-col-head { position: static; }
}
@media (max-width: 640px) {
  .cmp-shell { padding: 0 16px 80px; }
  .cmp-mast { padding-top: 44px; }
  .cmp-bar { gap: 10px 16px; }
}
@media (prefers-reduced-motion: reduce) {
  * { transition-duration: .01ms !important; animation-duration: .01ms !important; }
}
</style>

<div class="cmp-shell" data-theme-root data-device="left" data-face="newsreader" data-mode="wipe">

  <header class="cmp-mast">
    <div class="cmp-kicker">Pixelette Group &middot; Brand layer discovery</div>
    <h1>Same bones, different house</h1>
    <p>The revamp made Pixelette Certified render as a faithful copy of the group pattern guide, which was drawn around Pixelette Technologies. This page proposes the layer that keeps the shared skeleton intact while giving Certified its own identity, and is the method we will reuse for the rest of the group.</p>
    <div class="cmp-meta">
      <span><b>Left</b> Pattern guide, frozen reference</span>
      <span><b>Right</b> Certified brand layer, as built</span>
      <span><b>Source</b> src/app/globals.css, extracted at build time</span>
      <span><b>Status</b> Applied and building</span>
    </div>
  </header>

  <div class="cmp-bar">
    <div class="cmp-ctl"><span>Device</span>
      <div class="cmp-seg" data-ctl="device">
        <button type="button" data-v="left" aria-pressed="true">Left accent</button>
        <button type="button" data-v="eyebrow" aria-pressed="false">Eyebrow rule</button>
        <button type="button" data-v="top" aria-pressed="false">Top border</button>
      </div>
    </div>
    <div class="cmp-ctl"><span>Display face</span>
      <div class="cmp-seg" data-ctl="face">
        <button type="button" data-v="newsreader" aria-pressed="true">Newsreader</button>
        <button type="button" data-v="spectral" aria-pressed="false">Spectral</button>
        <button type="button" data-v="source" aria-pressed="false">Source Serif</button>
      </div>
    </div>
    <div class="cmp-ctl"><span>Composition</span>
      <div class="cmp-seg" data-ctl="mode">
        <button type="button" data-v="wipe" aria-pressed="true">Wipe</button>
        <button type="button" data-v="flip" aria-pressed="false">Flip</button>
        <button type="button" data-v="stack" aria-pressed="false">Stacked</button>
      </div>
    </div>
  </div>

  <!-- 01 ------------------------------------------------------------------ -->
  <section class="cmp-sec">
    <h2><em>01</em> The two systems</h2>
    <p class="cmp-lede">Hue is not where the difference lives. The guide green sits at <b>173&deg;</b>, Certified&rsquo;s teal at <b>180&deg;</b> and its petrol at <b>182&deg;</b> &mdash; barely nine degrees across the whole set. Swapping one green for another would read as the same site with a fault in it.</p>
    <p>What separates the two companies is <b>value structure</b>. Technologies is a one-tone system: a single mid-green at 23% lightness does every job, from eyebrow to button fill to card border. Certified becomes a two-tone system: a dark petrol anchor carrying everything that has to be read, and a bright teal signal that marks and never speaks.</p>
    <p>That is also why the bright teal cannot simply take over. At <b>2.86:1</b> on white it fails every text threshold, across 61 <code style="font-family:'IBM Plex Mono',monospace;color:var(--c-mark)">text-brand</code> call sites plus every filled button. Demoting it to a signal role is what makes it usable at all.</p>

    <div class="cmp-callout">
      <b>The mark was already right.</b> <code>logo-green-text.svg</code> and <code>logo-white-text.svg</code> have always been <code>#044143</code> and <code>#14A4A9</code>. Only the stylesheet and the favicon drifted to the guide green. This proposal brings the site back into agreement with its own wordmark rather than inventing a palette.
    </div>

    <p style="margin-top:34px">Everything below stays identical across every Pixelette site. This is what &ldquo;similar&rdquo; concretely means:</p>
    <dl class="cmp-lock">
      <div><dt>Container</dt><dd>1160px cap, 20px gutters, no media query</dd></div>
      <div><dt>Fluid scale</dt><dd>h1 36&rarr;64, section rhythm 56&rarr;96, header 64&rarr;80</dd></div>
      <div><dt>Type roles</dt><dd>Serif display, sans body, mono eyebrow, sans h4</dd></div>
      <div><dt>Geometry</dt><dd>12px card, 4px button, 4px tile, three shadows</dd></div>
      <div><dt>Structure</dt><dd>Eyebrow &rarr; h2 &rarr; lead &rarr; content, hairline rules, alternating bands</dd></div>
      <div><dt>Behaviour</dt><dd>Flat and static, 44px tap targets, one focus system</dd></div>
    </dl>
  </section>

  <!-- 02 ------------------------------------------------------------------ -->
  <section class="cmp-sec">
    <h2><em>02</em> Tokens</h2>
    <p>Every value that moves. Neutrals hold their lightness exactly and rotate hue from the guide&rsquo;s blue-grey towards Certified&rsquo;s petrol, so the page feels like a different house without a single contrast ratio dropping.</p>

    <div class="cmp-table-wrap">
      <table class="cmp-tokens">
        <thead><tr><th>Token</th><th>Technologies</th><th>Certified</th><th>Role</th></tr></thead>
        <tbody>
          <tr class="cmp-group"><td colspan="4" style="background:var(--c-raise);font-family:'IBM Plex Mono',monospace;font-size:10.5px;letter-spacing:.12em;text-transform:uppercase;color:var(--c-mark)">Brand &mdash; one tone becomes two</td></tr>
          ${tokenRows(BRAND, "brand")}
          <tr class="cmp-group"><td colspan="4" style="background:var(--c-raise);font-family:'IBM Plex Mono',monospace;font-size:10.5px;letter-spacing:.12em;text-transform:uppercase;color:var(--c-mark)">Neutrals &mdash; lightness held, hue rotated 212&deg; to ~180&deg;</td></tr>
          ${tokenRows(NEUTRAL, "neutral")}
          <tr class="cmp-group"><td colspan="4" style="background:var(--c-raise);font-family:'IBM Plex Mono',monospace;font-size:10.5px;letter-spacing:.12em;text-transform:uppercase;color:var(--c-mark)">Dark family &mdash; slate becomes petrol</td></tr>
          ${tokenRows(DARK, "dark")}
        </tbody>
      </table>
    </div>
    <p style="font-size:13px;margin-top:14px">Unchanged: ${UNCHANGED.map((t) => `<code style="font-family:'IBM Plex Mono',monospace;font-size:12px">${t.replace("--color-", "")}</code>`).join(", ")}.</p>

    <h3 style="font-size:17px;font-weight:500;margin:44px 0 0">Contrast audit</h3>
    <p>Computed in the browser from the live token values, so a number here can never disagree with a swatch above. Text roles are held to 4.5:1, interface roles to 3:1.</p>
    <div class="cmp-audit">
      <section data-theme="pt"><h3>Pixelette Technologies <span data-summary></span></h3><ul data-checks></ul></section>
      <section data-theme="pc"><h3>Pixelette Certified <span data-summary></span></h3><ul data-checks></ul></section>
    </div>
    <div class="cmp-callout">
      <b>One check comes back marked <code>GUIDE</code>, in both columns.</b> The outline button is identified purely by its border, so WCAG 1.4.11 asks for 3:1 &mdash; and <code>--color-line-strong</code> gives 1.56 against white. That is inherited from the pattern guide, it is identical in both systems, and this proposal neither causes nor worsens it. The fix is a dedicated border token for <code>.btn2</code> at roughly <code>#879099</code>, which belongs to the shared Pixelette layer and needs raising with Mr Rana rather than changing here.
    </div>
  </section>

  <!-- 03 ------------------------------------------------------------------ -->
  <section class="cmp-sec">
    <h2><em>03</em> Specimen board</h2>
    <p>Identical markup, rendered from one template, differing only in the token block above it. The signature device selected in the bar applies to the Certified column only &mdash; the Technologies column always shows the guide&rsquo;s own treatment, as the control.</p>
    <div class="cmp-boards">
      <div class="cmp-col" data-theme="pt">
        <div class="cmp-col-head"><b>Pixelette Technologies</b><span>Frozen reference</span></div>
        ${boardPT}
      </div>
      <div class="cmp-col" data-theme="pc">
        <div class="cmp-col-head"><b>Pixelette Certified</b><span>Live, from globals.css</span></div>
        ${boardPC}
      </div>
    </div>
  </section>

  <!-- 04 ------------------------------------------------------------------ -->
  <section class="cmp-sec">
    <h2><em>04</em> Full composition</h2>
    <p>Real homepage copy, hero through footer. <b>Wipe</b> is the default because two half-width columns actually hide a neutral rotation &mdash; each side gets judged in the other&rsquo;s context. Drag the handle, or use <b>Flip</b> to alternate the whole page in place, which is the only reliable way to perceive a hue shift this small.</p>
    <div class="cmp-stage">
      <div class="cmp-stage-head"><span>Homepage composition</span><span>Drag the handle &middot; <b>F</b> flips &middot; <b>&larr; &rarr;</b> nudge</span></div>
      <div class="cmp-canvas" id="stage" style="--wipe:50%">
        <span class="cmp-stage-tag cmp-tag-pt">Technologies</span>
        <span class="cmp-stage-tag cmp-tag-pc">Certified</span>
        <div class="cmp-stack-tag">Pixelette Technologies &mdash; guide, as built</div>
        <div class="cmp-layer cmp-layer-pt" data-theme="pt">${comp}</div>
        <div class="cmp-stack-tag">Pixelette Certified &mdash; proposed</div>
        <div class="cmp-layer cmp-layer-pc" data-theme="pc">${comp}</div>
        <div class="cmp-handle" id="handle" role="separator" aria-label="Comparison position" tabindex="0" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50"></div>
      </div>
    </div>
  </section>

  <!-- 05 ------------------------------------------------------------------ -->
  <section class="cmp-sec">
    <h2><em>05</em> Signature device</h2>
    <p>Sibling brands usually differ by one memorable mannerism. The guide already has one: a 3px brand border across the top of a feature card. Certified needs its own, built from primitives the guide already contains rather than new vocabulary. Switch between all three in the bar and watch the cards in sections 03 and 04.</p>
    <dl class="cmp-lock">
      <div><dt>Left accent &mdash; recommended</dt><dd>3px signal-teal left border on feature cards; section rules gain a 40px cap aligned to the container. Reads from across the room.</dd></div>
      <div><dt>Eyebrow rule</dt><dd>A 16px hairline before every eyebrow. Quieter, and reads as a clause marker, which suits an accreditation body.</dd></div>
      <div><dt>Top border</dt><dd>The guide&rsquo;s own treatment, unchanged. The control &mdash; pick this and Certified has no device of its own.</dd></div>
    </dl>
  </section>

  <!-- 06 ------------------------------------------------------------------ -->
  <section class="cmp-sec">
    <h2><em>06</em> Display face</h2>
    <p>Newsreader Light is the guide&rsquo;s loudest personality signal. Changing the family while keeping the role &mdash; light editorial serif, 300 and 400, identical clamp sizes &mdash; would make Certified unmistakable without moving a single measurement. Selecting a face in the bar also reskins the Certified side of sections 03 and 04.</p>
    <div class="cmp-faces" id="faces"></div>
    <div class="cmp-callout">
      <b>If a face other than Newsreader wins:</b> the sub-768px rule in <code>globals.css</code> raises display weight from 300 to 400 because Newsreader Light shreds below 30px. Spectral and Source Serif hold their light weight better, so that bump needs re-tuning rather than copying. Narrow this window past 767px to see it fire.
    </div>
  </section>

  <!-- 07 ------------------------------------------------------------------ -->
  <section class="cmp-sec">
    <h2><em>07</em> What implementation touches</h2>
    <p>So the decision is made with the cost visible. None of it is applied yet.</p>
    <table class="cmp-impact">
      <thead><tr><th>Location</th><th>Work</th></tr></thead>
      <tbody>
        <tr><td>src/app/globals.css</td><td>The token block above. <b>21</b> values, one new role.</td></tr>
        <tr><td>src/app/globals.css</td><td><b>Two source bugs.</b> <code>.band-closing</code> hard-codes <code>#FFFFFF</code> and <code>#F4F7FA</code> instead of reading <code>--color-page</code> and <code>--color-band</code>; <code>.footer .pill</code> hard-codes <code>#1B3D4A</code>. Both would silently escape the neutral rotation. This page patches them so the comparison is honest.</td></tr>
        <tr><td>components/alice/AliceChat.tsx</td><td><b>49</b> hard-coded hexes</td></tr>
        <tr><td>app/api/contact/route.ts</td><td><b>17</b> hard-coded hexes in the email template</td></tr>
        <tr><td>app/api/newsletter/route.ts</td><td><b>16</b> hard-coded hexes in the email template</td></tr>
        <tr><td>components/alice/AliceWidget.tsx</td><td><b>14</b> hard-coded hexes</td></tr>
        <tr><td>src/lib/constants.ts</td><td><b>5</b> hexes in <code>BRAND_COLORS</code>, which still has no importers</td></tr>
        <tr><td>public/logos/favicon.svg</td><td>Re-cut to <code>#044143</code> and <code>#14A4A9</code> to match the wordmark</td></tr>
        <tr><td>scripts/check-legacy-tokens.mjs</td><td>Extend the pattern to catch the retired guide hexes, so the next drift fails the build</td></tr>
        <tr><td>Shared layer &mdash; not ours</td><td><b>Outline button border.</b> <code>.btn2</code> is identified only by its border and clears just 1.56:1 where WCAG 1.4.11 asks 3:1. Inherited from the guide, present in both systems. Raise separately; a dedicated token near <code>#879099</code> fixes it group-wide.</td></tr>
      </tbody>
    </table>
    <div class="cmp-callout">
      <b>The real deliverable is the split.</b> Once this lands, <code>globals.css</code> separates into a Pixelette common layer &mdash; scale, geometry, spacing, every component class, byte-identical across the group &mdash; and a brand layer of roughly thirty lines. The next four sites are then a palette and a device choice, not another conversion.
    </div>
  </section>

  <footer class="cmp-foot">
    <span>Generated from <code>src/app/globals.css</code> by <code>scripts/build-palette-compare.mjs</code></span>
    <span>Re-run with <code>npm run compare:palette</code></span>
    <span>Chrome is deliberately achromatic: a tinted surround would bias the judgement this page exists to support</span>
  </footer>
</div>

<script>
(function () {
  "use strict";

  var root = document.querySelector("[data-theme-root]");

  /* -- segmented controls ------------------------------------------------ */
  Array.prototype.forEach.call(document.querySelectorAll(".cmp-seg"), function (seg) {
    var attr = "data-" + seg.getAttribute("data-ctl");
    seg.addEventListener("click", function (e) {
      var btn = e.target.closest("button[data-v]");
      if (!btn) return;
      Array.prototype.forEach.call(seg.querySelectorAll("button"), function (b) {
        b.setAttribute("aria-pressed", String(b === btn));
      });
      root.setAttribute(attr, btn.getAttribute("data-v"));
      if (attr === "data-mode" || attr === "data-face") syncStage();
    });
  });

  /* -- contrast ---------------------------------------------------------- */
  var CHECKS = ${JSON.stringify(CHECKS)};

  function parse(v) {
    v = String(v).trim();
    if (v.charAt(0) === "#") {
      if (v.length === 4) v = "#" + v[1] + v[1] + v[2] + v[2] + v[3] + v[3];
      return [parseInt(v.substr(1, 2), 16), parseInt(v.substr(3, 2), 16), parseInt(v.substr(5, 2), 16)];
    }
    var m = v.match(/-?[\\d.]+/g);
    return m ? [+m[0], +m[1], +m[2]] : [0, 0, 0];
  }
  function lum(rgb) {
    var c = rgb.map(function (n) {
      n = n / 255;
      return n <= 0.03928 ? n / 12.92 : Math.pow((n + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  }
  function ratio(a, b) {
    var x = lum(parse(a)), y = lum(parse(b));
    if (x < y) { var t = x; x = y; y = t; }
    return (x + 0.05) / (y + 0.05);
  }
  function resolve(el, token) {
    if (token.charAt(0) === "#") return token;
    return getComputedStyle(el).getPropertyValue(token) || "#000000";
  }

  Array.prototype.forEach.call(document.querySelectorAll(".cmp-audit section"), function (panel) {
    var theme = panel.getAttribute("data-theme");
    var probe = document.querySelector('.cmp-col[data-theme="' + theme + '"]') || panel;
    var list = panel.querySelector("[data-checks]");
    var fails = 0, inherited = 0, shown = 0;
    CHECKS.forEach(function (c) {
      if (c.pcOnly && theme !== "pc") return;
      var r = ratio(resolve(probe, c.fg), resolve(probe, c.bg));
      var min = c.kind === "text" ? 4.5 : c.kind === "ui" ? 3 : 0;
      var pass = r >= min;
      var rank = c.inherited && !pass ? "inherit"
        : c.kind === "deco" ? "deco"
        : !pass ? "fail"
        : c.kind === "ui" ? "ui"
        : r >= 7 ? "aaa" : "aa";
      var text = rank === "inherit" ? "GUIDE"
        : rank === "deco" ? "&mdash;"
        : rank === "fail" ? "FAIL"
        : rank === "ui" ? "AA UI"
        : rank.toUpperCase();
      if (!pass && min > 0) { if (c.inherited) inherited += 1; else fails += 1; }
      shown += 1;
      var li = document.createElement("li");
      li.innerHTML = '<span>' + c.label + '</span>'
        + '<span class="cmp-ratio">' + r.toFixed(2) + '</span>'
        + '<span class="cmp-badge" data-r="' + rank + '">' + text + '</span>';
      list.appendChild(li);
    });
    var s = panel.querySelector("[data-summary]");
    if (fails) {
      s.textContent = fails + " of " + shown + " FAIL";
      s.style.color = "var(--c-bad)";
    } else if (inherited) {
      s.textContent = shown + " checks, " + inherited + " inherited";
      s.style.color = "var(--c-mark)";
    } else {
      s.textContent = shown + " checks, all pass";
    }
  });

  /* -- face specimens ---------------------------------------------------- */
  var FACES = [
    ["newsreader", '"Newsreader", Georgia, serif', "Newsreader", "Current. The guide&rsquo;s own face."],
    ["spectral", '"Spectral", Georgia, serif', "Spectral", "Recommended. Narrower, more formal, holds 300 better at small sizes."],
    ["source", '"Source Serif 4", Georgia, serif', "Source Serif 4", "Warmer and wider. Reads less institutional."]
  ];
  var facesEl = document.getElementById("faces");
  FACES.forEach(function (f) {
    var wrap = document.createElement("div");
    wrap.className = "cmp-face";
    wrap.innerHTML =
      '<div class="cmp-face-head"><span>' + f[2] + '</span><span>' + f[3] + '</span></div>'
      + '<div class="cmp-face-body" data-theme="pc" style="--font-display:' + f[1] + '">'
      + '<div class="eyebrow">Free gap analysis</div>'
      + '<h2 class="h1" style="margin-top:16px">Find out what certification would actually cost you.</h2>'
      + '<p class="lead">Thirty minutes with a consultant who has taken more than fifty organisations through audit. Fixed fee, no obligation.</p>'
      + '<div class="cmp-row"><a class="btn" href="#0">Book the call</a><a class="btn2" href="#0">See pricing</a></div>'
      + '</div>';
    facesEl.appendChild(wrap);
  });

  /* -- composition stage ------------------------------------------------- */
  var stage = document.getElementById("stage");
  var handle = document.getElementById("handle");
  var pt = stage.querySelector(".cmp-layer-pt");
  var pc = stage.querySelector(".cmp-layer-pc");

  function setWipe(pct) {
    pct = Math.max(0, Math.min(100, pct));
    stage.style.setProperty("--wipe", pct + "%");
    handle.setAttribute("aria-valuenow", String(Math.round(pct)));
  }
  function currentWipe() {
    return parseFloat(stage.style.getPropertyValue("--wipe")) || 0;
  }

  /* In wipe and flip the layers are absolutely positioned, so the stage has
     no height of its own. A changed display face makes the two sides differ
     slightly, so take the taller. */
  function syncStage() {
    var mode = root.getAttribute("data-mode");
    if (mode === "stack") { stage.style.height = ""; return; }
    requestAnimationFrame(function () {
      stage.style.height = Math.max(pt.offsetHeight, pc.offsetHeight) + "px";
    });
  }

  function pointTo(clientX) {
    var r = stage.getBoundingClientRect();
    setWipe(((clientX - r.left) / r.width) * 100);
  }

  var dragging = false;
  handle.addEventListener("pointerdown", function (e) {
    if (root.getAttribute("data-mode") !== "wipe") return;
    dragging = true;
    handle.setPointerCapture(e.pointerId);
    e.preventDefault();
  });
  handle.addEventListener("pointermove", function (e) { if (dragging) pointTo(e.clientX); });
  handle.addEventListener("pointerup", function () { dragging = false; });
  stage.addEventListener("click", function (e) {
    var mode = root.getAttribute("data-mode");
    if (mode === "flip") { setWipe(currentWipe() > 50 ? 0 : 100); return; }
    if (mode === "wipe" && !e.target.closest("a, button, input, select, textarea")) pointTo(e.clientX);
  });

  handle.addEventListener("keydown", function (e) {
    var step = e.shiftKey ? 10 : 2;
    if (e.key === "ArrowLeft") { setWipe(currentWipe() - step); e.preventDefault(); }
    if (e.key === "ArrowRight") { setWipe(currentWipe() + step); e.preventDefault(); }
  });
  document.addEventListener("keydown", function (e) {
    if (e.target.closest("input, textarea, select")) return;
    if (e.key === "f" || e.key === "F") setWipe(currentWipe() > 50 ? 0 : 100);
  });

  window.addEventListener("resize", syncStage);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(syncStage);
  syncStage();
})();
</script>
`;

writeFileSync(OUT, html, "utf8");
console.log(`palette comparison written to docs/palette-comparison.html (${(html.length / 1024).toFixed(1)} kB)`);
console.log(`  components extracted: ${components.split("\n").length} lines`);
console.log(`  tokens compared:      ${ALL_TOKENS.length}`);
console.log(`  contrast checks:      ${CHECKS.length} per theme`);
