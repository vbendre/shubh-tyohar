"use client";

import { useState } from "react";
import { Festival } from "@/lib/festivals";

interface Props {
  festival: Festival;
  onSubmit: (recipient: string | undefined) => void;
  onBack: () => void;
}

const suggestions = ["Mom", "Dad", "Friend", "Boss", "Family Group", "Partner", "Brother", "Sister"];

export default function PersonalizationInput({ festival, onSubmit, onBack }: Props) {
  const [value, setValue] = useState("");

  return (
    <div className="space-y-8 animate-fade-in max-w-lg mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100">
          Who is this for?
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Optional — personalize your message
        </p>
      </div>

      {/* Quick suggestions */}
      <div className="flex flex-wrap justify-center gap-2">
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => setValue(s)}
            className={`px-3 py-1.5 rounded-full text-sm transition-all duration-200
              ${value === s
                ? "text-white shadow-md scale-105"
                : "glass text-gray-600 dark:text-gray-300 hover:scale-105"
              }`}
            style={
              value === s
                ? { background: `linear-gradient(135deg, ${festival.colors.primary}, ${festival.colors.secondary})` }
                : {}
            }
          >
            {s}
          </button>
        ))}
      </div>

      {/* Custom input */}
      <div>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type a name or relationship..."
          className="w-full px-5 py-4 rounded-xl glass text-center text-lg
                     placeholder:text-gray-400 dark:placeholder:text-gray-500
                     focus:outline-none focus:ring-2 transition-all duration-200"
          style={{
            borderColor: festival.colors.primary + "40",
            borderWidth: "2px",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = festival.colors.primary;
          }}
          onBlur={(e) => {
            e.target.style.borderColor = festival.colors.primary + "40";
          }}
        />
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={() => onSubmit(value.trim() || undefined)}
          className="btn-primary text-lg px-8 py-4 rounded-xl font-semibold"
          style={{
            background: `linear-gradient(135deg, ${festival.colors.primary}, ${festival.colors.secondary})`,
          }}
        >
          ✨ Generate Message
        </button>
        <button
          onClick={() => onSubmit(undefined)}
          className="btn-secondary text-gray-500 dark:text-gray-400 border-gray-300 dark:border-gray-600"
        >
          Skip — Keep it general
        </button>
      </div>

      <div className="text-center">
        <button
          onClick={onBack}
          className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
        >
          ← Back
        </button>
      </div>
    </div>
  );
}
