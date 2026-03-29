export type FestivalCategory = "indian" | "global" | "life-events";

export interface Festival {
  id: string;
  name: string;
  nameHi: string;
  nameMr: string;
  emoji: string;
  category: FestivalCategory;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    gradient: string;
  };
  description: string;
  /** Approximate date(s) each year as [month, day]. Recurring annually. */
  dates?: [number, number][];
}

export const festivalCategories: Record<
  FestivalCategory,
  { label: string; labelHi: string; labelMr: string; emoji: string }
> = {
  indian: { label: "Indian Festivals", labelHi: "भारतीय त्योहार", labelMr: "भारतीय सण", emoji: "🇮🇳" },
  global: { label: "Global Occasions", labelHi: "वैश्विक अवसर", labelMr: "जागतिक प्रसंग", emoji: "🌍" },
  "life-events": { label: "Life Events", labelHi: "जीवन के अवसर", labelMr: "जीवनातील प्रसंग", emoji: "🎉" },
};

export const festivals: Festival[] = [
  // Indian Festivals
  {
    id: "diwali",
    name: "Diwali",
    nameHi: "दिवाली",
    nameMr: "दिवाळी",
    emoji: "🪔",
    category: "indian",
    colors: {
      primary: "#F59E0B",
      secondary: "#EA580C",
      accent: "#FDE68A",
      gradient: "from-amber-500 via-orange-500 to-red-500",
    },
    description: "Festival of Lights",
    dates: [[10, 20]], // ~Oct
  },
  {
    id: "holi",
    name: "Holi",
    nameHi: "होली",
    nameMr: "होळी",
    emoji: "🎨",
    category: "indian",
    colors: {
      primary: "#EC4899",
      secondary: "#8B5CF6",
      accent: "#34D399",
      gradient: "from-pink-500 via-purple-500 to-green-400",
    },
    description: "Festival of Colors",
    dates: [[3, 14]], // ~Mar
  },
  {
    id: "ganesh-chaturthi",
    name: "Ganesh Chaturthi",
    nameHi: "गणेश चतुर्थी",
    nameMr: "गणेश चतुर्थी",
    emoji: "🐘",
    category: "indian",
    colors: {
      primary: "#EA580C",
      secondary: "#DC2626",
      accent: "#FCD34D",
      gradient: "from-orange-600 via-red-500 to-yellow-400",
    },
    description: "Lord Ganesha's Birthday",
    dates: [[8, 27]], // ~Aug-Sep
  },
  {
    id: "navratri",
    name: "Navratri",
    nameHi: "नवरात्रि",
    nameMr: "नवरात्री",
    emoji: "🔱",
    category: "indian",
    colors: {
      primary: "#DC2626",
      secondary: "#F59E0B",
      accent: "#16A34A",
      gradient: "from-red-600 via-amber-500 to-green-500",
    },
    description: "Nine Nights of Devotion",
    dates: [[10, 2]], // ~Sep-Oct
  },
  {
    id: "makar-sankranti",
    name: "Makar Sankranti",
    nameHi: "मकर संक्रांति",
    nameMr: "मकर संक्रांती",
    emoji: "🪁",
    category: "indian",
    colors: {
      primary: "#2563EB",
      secondary: "#F59E0B",
      accent: "#60A5FA",
      gradient: "from-blue-600 via-sky-400 to-amber-400",
    },
    description: "Kite Festival & Harvest",
    dates: [[1, 14]],
  },
  {
    id: "gudi-padwa",
    name: "Gudi Padwa",
    nameHi: "गुड़ी पड़वा",
    nameMr: "गुढीपाडवा",
    emoji: "🏳️",
    category: "indian",
    colors: {
      primary: "#F59E0B",
      secondary: "#16A34A",
      accent: "#DC2626",
      gradient: "from-amber-500 via-green-500 to-red-500",
    },
    description: "Marathi New Year",
    dates: [[3, 30]], // ~Mar-Apr
  },
  {
    id: "raksha-bandhan",
    name: "Raksha Bandhan",
    nameHi: "रक्षा बंधन",
    nameMr: "रक्षाबंधन",
    emoji: "🧵",
    category: "indian",
    colors: {
      primary: "#EC4899",
      secondary: "#F59E0B",
      accent: "#A855F7",
      gradient: "from-pink-500 via-amber-400 to-purple-500",
    },
    description: "Bond of Protection",
    dates: [[8, 9]], // ~Aug
  },
  {
    id: "dussehra",
    name: "Dussehra",
    nameHi: "दशहरा",
    nameMr: "दसरा",
    emoji: "🏹",
    category: "indian",
    colors: {
      primary: "#DC2626",
      secondary: "#F59E0B",
      accent: "#16A34A",
      gradient: "from-red-600 via-amber-500 to-green-600",
    },
    description: "Victory of Good over Evil",
    dates: [[10, 12]], // ~Oct
  },

  // Global Occasions
  {
    id: "christmas",
    name: "Christmas",
    nameHi: "क्रिसमस",
    nameMr: "ख्रिसमस",
    emoji: "🎄",
    category: "global",
    colors: {
      primary: "#DC2626",
      secondary: "#16A34A",
      accent: "#FDE68A",
      gradient: "from-red-600 via-green-600 to-yellow-300",
    },
    description: "Season of Joy & Giving",
    dates: [[12, 25]],
  },
  {
    id: "new-year",
    name: "New Year",
    nameHi: "नया साल",
    nameMr: "नवीन वर्ष",
    emoji: "🎆",
    category: "global",
    colors: {
      primary: "#F59E0B",
      secondary: "#8B5CF6",
      accent: "#60A5FA",
      gradient: "from-amber-400 via-purple-500 to-blue-500",
    },
    description: "A Fresh Beginning",
    dates: [[1, 1]],
  },
  {
    id: "eid",
    name: "Eid",
    nameHi: "ईद",
    nameMr: "ईद",
    emoji: "🌙",
    category: "global",
    colors: {
      primary: "#16A34A",
      secondary: "#F59E0B",
      accent: "#ECFDF5",
      gradient: "from-green-600 via-emerald-400 to-amber-400",
    },
    description: "Festival of Blessings",
    dates: [[3, 31], [6, 7]], // Eid ul-Fitr ~Mar, Eid ul-Adha ~Jun (2026 approx)
  },
  {
    id: "thanksgiving",
    name: "Thanksgiving",
    nameHi: "थैंक्सगिविंग",
    nameMr: "थँक्सगिव्हिंग",
    emoji: "🦃",
    category: "global",
    colors: {
      primary: "#EA580C",
      secondary: "#92400E",
      accent: "#FDE68A",
      gradient: "from-orange-600 via-amber-700 to-yellow-300",
    },
    description: "Gratitude & Togetherness",
    dates: [[11, 27]], // 4th Thursday of Nov
  },
  {
    id: "easter",
    name: "Easter",
    nameHi: "ईस्टर",
    nameMr: "ईस्टर",
    emoji: "🐣",
    category: "global",
    colors: {
      primary: "#A855F7",
      secondary: "#EC4899",
      accent: "#FDE68A",
      gradient: "from-purple-400 via-pink-400 to-yellow-300",
    },
    description: "Renewal & Hope",
    dates: [[4, 5]], // ~Apr 2026
  },

  // Life Events (no fixed dates)
  {
    id: "birthday",
    name: "Birthday",
    nameHi: "जन्मदिन",
    nameMr: "वाढदिवस",
    emoji: "🎂",
    category: "life-events",
    colors: {
      primary: "#EC4899",
      secondary: "#8B5CF6",
      accent: "#FDE68A",
      gradient: "from-pink-500 via-purple-500 to-yellow-300",
    },
    description: "Celebrate Life",
  },
  {
    id: "anniversary",
    name: "Anniversary",
    nameHi: "सालगिरह",
    nameMr: "वाढदिवस लग्नाचा",
    emoji: "💍",
    category: "life-events",
    colors: {
      primary: "#DC2626",
      secondary: "#EC4899",
      accent: "#FDE68A",
      gradient: "from-red-500 via-pink-500 to-yellow-200",
    },
    description: "Love & Togetherness",
  },
  {
    id: "wedding",
    name: "Wedding",
    nameHi: "शादी",
    nameMr: "लग्न",
    emoji: "💒",
    category: "life-events",
    colors: {
      primary: "#F59E0B",
      secondary: "#DC2626",
      accent: "#FEF3C7",
      gradient: "from-amber-400 via-red-400 to-yellow-100",
    },
    description: "A Beautiful Union",
  },
  {
    id: "new-baby",
    name: "New Baby",
    nameHi: "नवजात शिशु",
    nameMr: "नवजात बाळ",
    emoji: "👶",
    category: "life-events",
    colors: {
      primary: "#60A5FA",
      secondary: "#EC4899",
      accent: "#FDE68A",
      gradient: "from-blue-400 via-pink-300 to-yellow-200",
    },
    description: "Welcome Little One",
  },
  {
    id: "graduation",
    name: "Graduation",
    nameHi: "स्नातक",
    nameMr: "पदवीदान",
    emoji: "🎓",
    category: "life-events",
    colors: {
      primary: "#2563EB",
      secondary: "#F59E0B",
      accent: "#1E3A5F",
      gradient: "from-blue-700 via-blue-500 to-amber-400",
    },
    description: "Achievement Unlocked",
  },
  {
    id: "get-well-soon",
    name: "Get Well Soon",
    nameHi: "जल्दी ठीक हो जाओ",
    nameMr: "लवकर बरे व्हा",
    emoji: "💐",
    category: "life-events",
    colors: {
      primary: "#16A34A",
      secondary: "#60A5FA",
      accent: "#FDE68A",
      gradient: "from-green-500 via-blue-400 to-yellow-200",
    },
    description: "Healing Wishes",
  },
];

export function getFestivalById(id: string): Festival | undefined {
  return festivals.find((f) => f.id === id);
}

export function getFestivalsByCategory(category: FestivalCategory): Festival[] {
  return festivals.filter((f) => f.category === category);
}

/**
 * Returns festivals with upcoming dates, sorted by how soon they are.
 * Only includes festivals that have dates defined (excludes life events).
 * Shows festivals within the next `withinDays` days (default 90).
 */
export function getUpcomingFestivals(withinDays = 90): (Festival & { daysUntil: number; nextDate: Date })[] {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const results: (Festival & { daysUntil: number; nextDate: Date })[] = [];

  for (const festival of festivals) {
    if (!festival.dates) continue;

    let closestDays = Infinity;
    let closestDate = today;

    for (const [month, day] of festival.dates) {
      // Try this year and next year
      for (const yearOffset of [0, 1]) {
        const candidate = new Date(now.getFullYear() + yearOffset, month - 1, day);
        const diff = Math.floor((candidate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        if (diff >= 0 && diff < closestDays) {
          closestDays = diff;
          closestDate = candidate;
        }
      }
    }

    if (closestDays <= withinDays) {
      results.push({ ...festival, daysUntil: closestDays, nextDate: closestDate });
    }
  }

  results.sort((a, b) => a.daysUntil - b.daysUntil);
  return results;
}
