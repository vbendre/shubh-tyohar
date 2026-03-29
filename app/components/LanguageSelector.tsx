"use client";

import { Festival } from "@/lib/festivals";
import type { Language } from "@/lib/generator";

interface Props {
  festival: Festival;
  onSelect: (lang: Language) => void;
  onBack: () => void;
}

const languages: { id: Language; label: string; native: string; font: string }[] = [
  { id: "english", label: "English", native: "English", font: "font-poppins" },
  { id: "hindi", label: "Hindi", native: "हिन्दी", font: "font-devanagari" },
  { id: "marathi", label: "Marathi", native: "मराठी", font: "font-devanagari" },
];

export default function LanguageSelector({ festival, onSelect, onBack }: Props) {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100">
          Choose Language
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          In which language should your message be?
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-xl mx-auto">
        {languages.map((lang) => (
          <button
            key={lang.id}
            onClick={() => onSelect(lang.id)}
            className="w-full sm:w-auto px-8 py-5 rounded-2xl glass transition-all duration-300
                       hover:scale-105 hover:shadow-xl active:scale-95 text-center group"
            style={{
              borderColor: festival.colors.primary + "40",
              borderWidth: "2px",
            }}
          >
            <p
              className={`text-2xl font-semibold ${lang.font} group-hover:scale-105 transition-transform`}
              style={{ color: festival.colors.primary }}
            >
              {lang.native}
            </p>
            {lang.id !== "english" && (
              <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">
                {lang.label}
              </p>
            )}
          </button>
        ))}
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
