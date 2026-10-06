/**
 * Header map for the markets index. Three coastlines, in geographic order:
 * the United States to the west, the United Kingdom across the Atlantic, and
 * the Arabian Peninsula to the south-east. Each silhouette is enlarged so it
 * can be read at header size.
 *
 * The graticule is the wider world. The three shapes are routes through the
 * site, not offices, and not a limit on where support is available.
 *
 * SVG only. The labels are real text. The coastline paths are left as drawn.
 */

export default function MarketsMap() {
  return (
    <figure className="mx-auto w-full max-w-[520px] lg:mx-0 lg:max-w-none">
      <svg viewBox="0 0 640 384" className="h-auto w-full text-brand" role="img" aria-labelledby="markets-map-caption">
        <g fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.35">
          <path d="M0 52 C 210 38, 430 64, 640 44" />
          <path d="M0 128 C 220 112, 440 140, 640 118" />
          <path d="M0 204 C 200 188, 450 216, 640 196" />
          <path d="M0 280 C 210 296, 430 268, 640 286" />
          <path d="M96 8 C 74 120, 108 250, 64 376" />
          <path d="M236 4 C 258 130, 214 260, 252 378" />
          <path d="M408 6 C 376 140, 428 260, 386 376" />
          <path d="M548 8 C 572 128, 528 258, 568 376" />
        </g>

        <g fill="none" stroke="currentColor" strokeWidth="1.15" opacity="0.4">
          <path d="M246 132 C 268 108, 292 58, 328 40" />
          <path d="M378 86 C 428 104, 468 130, 500 172" />
        </g>

        <g fill="var(--color-brand-tint)" stroke="currentColor" strokeWidth="1.35" strokeLinejoin="round" strokeLinecap="round">
          <path d="M8 99.5 L9.3 111.7 L10.6 128.5 L10.1 145.3 L15.3 159.8 L17.5 165.6 L20 169.7 L25.6 180.1 L35.1 184.2 L40.2 191.2 L51.4 191.2 L66.9 198.7 L78.9 198.1 L85.8 195.8 L94.8 209.1 L108 206 L118 222 L132 228 L140 214 L152 208 L161.4 203.9 L178.6 208 L183.8 205.7 L188 200 L196 216 L190 234 L176 238 L168 220 L178 204 L192 194 L203.1 190 L218.6 176.1 L219.5 164.5 L221.2 157.5 L225.5 145.3 L234.5 140.7 L243.1 138.4 L243.5 126.8 L256 120.4 L256 114.6 L251.7 107.6 L246.5 105.3 L239.7 117.5 L228.5 119.2 L217.3 123.9 L204 129.1 L189.4 130.8 L185.5 114.6 L179.5 110.5 L166.6 110.5 L159.3 101.8 L134.8 96 L97 96 L45.4 96 L15.3 96 L8 99.5 Z" />
          <path d="M348 26 L 334 30 L 324 42 L 330 54 L 318 64 L 326 76 L 318 88 L 312 100 L 324 112 L 340 116 L 356 110 L 370 100 L 378 88 L 372 74 L 362 64 L 372 50 L 364 36 L 354 28 Z" />
          <path d="M460.9 168 L440.8 192.5 L432 206.1 L430 224.2 L436 246.9 L444.8 274.1 L458.2 307.7 L476.4 334.9 L489.8 344.9 L513.3 334.9 L543.6 318.6 L563.7 307.7 L584.6 292.3 L598 260.5 L594 240.6 L576.5 223.3 L575.8 231.5 L567.1 233.3 L551 240.6 L544.2 237.9 L541.6 230.6 L544.2 222.4 L540.2 218.8 L537.5 229.7 L533.5 224.2 L525.4 206.1 L520 189.8 L510.6 195.2 L494.5 188 L476.4 177.1 L460.9 168 Z" />
        </g>

        <g fill="currentColor" fontFamily="var(--font-ui)" fontSize="15" fontWeight="500">
          <text x="128" y="268" textAnchor="middle">
            United States
          </text>
          <text x="348" y="140" textAnchor="middle">
            United Kingdom
          </text>
          <text x="514" y="370" textAnchor="middle">
            GCC
          </text>
        </g>
      </svg>
      <figcaption id="markets-map-caption" className="small mt-4 max-w-[46ch]">
        The marks are routes through the site, not offices. Support is not limited to the regions drawn here.
      </figcaption>
    </figure>
  );
}
