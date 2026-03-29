"use client";

import {
  Festival,
  FestivalCategory,
  festivalCategories,
  getFestivalsByCategory,
} from "@/lib/festivals";

interface Props {
  onSelect: (festival: Festival) => void;
}

const categoryOrder: FestivalCategory[] = ["indian", "global", "life-events"];

export default function FestivalPicker({ onSelect }: Props) {
  return (
    <div className="space-y-10 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100">
          Pick a Festival or Occasion
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Choose what you&apos;re celebrating
        </p>
      </div>

      {categoryOrder.map((catKey) => {
        const cat = festivalCategories[catKey];
        const items = getFestivalsByCategory(catKey);

        return (
          <section key={catKey} className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <span>{cat.emoji}</span>
              <span>{cat.label}</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {items.map((festival, i) => (
                <button
                  key={festival.id}
                  onClick={() => onSelect(festival)}
                  className="festive-card text-white text-left relative overflow-hidden group"
                  style={{
                    background: `linear-gradient(135deg, ${festival.colors.primary}, ${festival.colors.secondary})`,
                    animationDelay: `${i * 60}ms`,
                  }}
                >
                  {/* Glow overlay on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl"
                    style={{
                      background: `radial-gradient(circle at 50% 50%, ${festival.colors.accent}, transparent 70%)`,
                    }}
                  />

                  <div className="relative z-10">
                    <span className="text-3xl sm:text-4xl block mb-2">
                      {festival.emoji}
                    </span>
                    <p className="font-semibold text-sm sm:text-base leading-tight">
                      {festival.name}
                    </p>
                    <p className="text-xs mt-1 text-white/70 leading-tight">
                      {festival.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
