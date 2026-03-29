"use client";

import { Festival } from "@/lib/festivals";
import type { ContentType } from "@/lib/generator";

interface Props {
  festival: Festival;
  onSelect: (type: ContentType) => void;
  onBack: () => void;
}

const contentTypes: { type: ContentType; emoji: string; label: string; desc: string }[] = [
  {
    type: "greeting",
    emoji: "🙏",
    label: "Greeting / Wish",
    desc: "Warm & heartfelt message",
  },
  {
    type: "joke",
    emoji: "😂",
    label: "Festival Joke",
    desc: "Fun & family-friendly humor",
  },
  {
    type: "whatsapp",
    emoji: "📱",
    label: "WhatsApp Message",
    desc: "Casual, ready to forward",
  },
];

export default function ContentTypeSelector({ festival, onSelect, onBack }: Props) {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <span className="text-3xl">{festival.emoji}</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100">
            {festival.name}
          </h2>
        </div>
        <p className="text-gray-500 dark:text-gray-400">
          What kind of message do you want?
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
        {contentTypes.map((ct) => (
          <button
            key={ct.type}
            onClick={() => onSelect(ct.type)}
            className="festive-card glass text-center group"
            style={{
              borderColor: festival.colors.primary + "40",
              borderWidth: "2px",
            }}
          >
            <span className="text-4xl block mb-3 group-hover:scale-110 transition-transform duration-200">
              {ct.emoji}
            </span>
            <p
              className="font-semibold text-base"
              style={{ color: festival.colors.primary }}
            >
              {ct.label}
            </p>
            <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">
              {ct.desc}
            </p>
          </button>
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={onBack}
          className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
        >
          ← Back to festivals
        </button>
      </div>
    </div>
  );
}
