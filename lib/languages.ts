export interface LanguageConfig {
  id: string;
  label: string;
  native: string;
  flag: string;
  script: string;
  instruction: string;
}

export const languages: LanguageConfig[] = [
  { id: "english", label: "English", native: "English", flag: "🌐", script: "latin", instruction: "Write in English." },
  { id: "hindi", label: "Hindi", native: "हिन्दी", flag: "🇮🇳", script: "devanagari", instruction: "Write entirely in Hindi using Devanagari script (हिन्दी)." },
  { id: "marathi", label: "Marathi", native: "मराठी", flag: "🇮🇳", script: "devanagari", instruction: "Write entirely in Marathi using Devanagari script (मराठी)." },
  { id: "gujarati", label: "Gujarati", native: "ગુજરાતી", flag: "🇮🇳", script: "gujarati", instruction: "Write entirely in Gujarati using Gujarati script (ગુજરાતી)." },
  { id: "punjabi", label: "Punjabi", native: "ਪੰਜਾਬੀ", flag: "🇮🇳", script: "gurmukhi", instruction: "Write entirely in Punjabi using Gurmukhi script (ਪੰਜਾਬੀ)." },
  { id: "bengali", label: "Bengali", native: "বাংলা", flag: "🇮🇳", script: "bengali", instruction: "Write entirely in Bengali using Bengali script (বাংলা)." },
  { id: "tamil", label: "Tamil", native: "தமிழ்", flag: "🇮🇳", script: "tamil", instruction: "Write entirely in Tamil using Tamil script (தமிழ்)." },
  { id: "telugu", label: "Telugu", native: "తెలుగు", flag: "🇮🇳", script: "telugu", instruction: "Write entirely in Telugu using Telugu script (తెలుగు)." },
  { id: "kannada", label: "Kannada", native: "ಕನ್ನಡ", flag: "🇮🇳", script: "kannada", instruction: "Write entirely in Kannada using Kannada script (ಕನ್ನಡ)." },
  { id: "malayalam", label: "Malayalam", native: "മലയാളം", flag: "🇮🇳", script: "malayalam", instruction: "Write entirely in Malayalam using Malayalam script (മലയാളം)." },
  { id: "bhojpuri", label: "Bhojpuri", native: "भोजपुरी", flag: "🇮🇳", script: "devanagari", instruction: "Write entirely in Bhojpuri using Devanagari script (भोजपुरी). Use authentic Bhojpuri dialect, not Hindi." },
  { id: "farsi", label: "Farsi", native: "فارسی", flag: "🇮🇷", script: "arabic", instruction: "Write entirely in Farsi/Persian using Arabic script (فارسی)." },
];

export function getLanguageById(id: string): LanguageConfig | undefined {
  return languages.find((l) => l.id === id);
}

/** Maps script type to Tailwind font class */
export function getFontClass(script: string): string {
  switch (script) {
    case "devanagari": return "font-devanagari";
    case "gujarati": return "font-gujarati";
    case "latin": return "font-poppins";
    default: return "font-sans"; // Browser default handles other Indic scripts well via Noto Sans
  }
}
