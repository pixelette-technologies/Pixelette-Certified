import { TRUST_STATS } from "@/lib/constants";
import StatTile from "@/components/ui/StatTile";

/**
 * The guide's 4-up stat row on the alternate band. The old version was a
 *  decorative strip whose figures were gradient-filled and scaled
 * on hover; the guide states figures flat, in mono green over a grey label.
 */
export default function TrustBar() {
  return (
    <section className="band-alt py-12 lg:py-14" aria-label="Track record">
      <div className="wrap">
        <div className="grid grid-cols-2 gap-3.5 md:grid-cols-4">
          {TRUST_STATS.map((stat) => (
            <StatTile
              key={stat.label}
              value={`${stat.value}${stat.suffix || ""}`}
              label={stat.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
