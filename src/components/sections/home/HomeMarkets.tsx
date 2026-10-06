import SectionHeading from "@/components/ui/SectionHeading";
import MarketSwitcher from "@/components/visuals/MarketSwitcher";

/** Three markets, one at a time. No equal card row. */
export default function HomeMarkets() {
  return (
    <section className="sec">
      <div className="wrap" data-reveal="">
        <SectionHeading title="Where we work" titleWidth="16ch" />
        <MarketSwitcher />
      </div>
    </section>
  );
}
