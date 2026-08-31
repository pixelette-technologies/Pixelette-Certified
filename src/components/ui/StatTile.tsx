import { cn } from "@/lib/utils";

interface StatTileProps {
  /** the figure, already formatted: "98%", "10 Weeks", "50+" */
  value: React.ReactNode;
  label: string;
  /** optional source citation, rendered as .src beneath the tile */
  source?: string;
  className?: string;
}

/**
 * The guide's stat tile: 4px radius, hairline border, a mono 26px brand figure
 * over a 13px grey label. The .tile class styles its own b/span children, so
 * the markup here is deliberately literal.
 */
export default function StatTile({ value, label, source, className }: StatTileProps) {
  return (
    <div className={className}>
      <div className={cn("tile")}>
        <b>{value}</b>
        <span>{label}</span>
      </div>
      {source && <p className="src mt-2">{source}</p>}
    </div>
  );
}
