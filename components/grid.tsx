import { DeckCard } from "@/components/ui/deck-card";
import { gridItems } from "@/data";

export const Grid = () => {
  return (
    <section id="about" className="section-spacing mb-16 relative">
      <div className="relative z-50 mb-12">
        <h1 className="heading-rye text-center text-5xl font-bold">
        Despre <span className="text-purple">mine</span>
      </h1>
      </div>
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-4 md:grid-cols-5 md:gap-4">
        {gridItems.map((item) => (
          <DeckCard
            key={item.id}
            {...item}
          />
        ))}
      </div>
    </section>
  );
};
