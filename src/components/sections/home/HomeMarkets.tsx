import SectionHeading from "@/components/ui/SectionHeading";
import MarketSwitcher from "@/components/visuals/MarketSwitcher";

/** Four routes, one at a time. The routes explain requirements. They are not a closed list of where work is possible. */
export default function HomeMarkets() {
  return (
    <section className="sec">
      <div className="wrap" data-reveal="">
        <SectionHeading
          title="Requirements vary by market"
          description="Standards may be international, while customer, regulatory and assurance requirements often vary by jurisdiction. Explore some of the markets we support, or speak to us about requirements elsewhere."
          titleWidth="18ch"
        />
        <MarketSwitcher />
      </div>
    </section>
  );
}
