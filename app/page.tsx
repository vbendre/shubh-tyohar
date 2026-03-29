"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Festival, festivals, festivalCategories, FestivalCategory, getUpcomingFestivals } from "@/lib/festivals";
import { generateGreeting, GenerationError, ContentType, Language } from "@/lib/generator";
import GreetingCard from "./components/GreetingCard";
import ShareButtons from "./components/ShareButtons";
import LoadingSpinner from "./components/LoadingSpinner";

const categoryOrder: FestivalCategory[] = ["indian", "global", "life-events"];

const contentTypes: { type: ContentType; emoji: string; label: string }[] = [
  { type: "greeting", emoji: "🙏", label: "Greeting" },
  { type: "joke", emoji: "😂", label: "Joke" },
  { type: "whatsapp", emoji: "📱", label: "WhatsApp" },
];

const languages: { id: Language; label: string; native: string; flag: string }[] = [
  { id: "english", label: "English", native: "English", flag: "🌐" },
  { id: "hindi", label: "Hindi", native: "हिन्दी", flag: "🇮🇳" },
  { id: "marathi", label: "Marathi", native: "मराठी", flag: "🇮🇳" },
];

export default function Home() {
  const [selectedFestival, setSelectedFestival] = useState<Festival | null>(null);
  const [contentType, setContentType] = useState<ContentType>("greeting");
  const [language, setLanguage] = useState<Language>("english");
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [categoryFilter, setCategoryFilter] = useState<FestivalCategory | "all" | "upcoming">("upcoming");
  const countdownRef = useRef<NodeJS.Timeout | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (countdown <= 0) {
      if (countdownRef.current) clearInterval(countdownRef.current);
      return;
    }
    countdownRef.current = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          if (countdownRef.current) clearInterval(countdownRef.current);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => {
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
  }, [countdown]);

  const upcoming = getUpcomingFestivals(90);
  const upcomingIds = new Set(upcoming.map((u) => u.id));
  const daysUntilMap = new Map(upcoming.map((u) => [u.id, u.daysUntil]));

  const filteredFestivals =
    categoryFilter === "upcoming"
      ? upcoming
      : categoryFilter === "all"
        ? festivals
        : festivals.filter((f) => f.category === categoryFilter);

  const doGenerate = useCallback(async () => {
    if (!selectedFestival) return;
    setLoading(true);
    setError("");
    setCountdown(0);
    setMessage("");
    try {
      const result = await generateGreeting({
        festivalId: selectedFestival.id,
        contentType,
        language,
        recipient: recipient.trim() || undefined,
      });
      setMessage(result);
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    } catch (err: unknown) {
      if (err instanceof GenerationError) {
        setError(err.message);
        if (err.retryAfter) setCountdown(err.retryAfter);
      } else {
        setError(err instanceof Error ? err.message : "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  }, [selectedFestival, contentType, language, recipient]);

  const c1 = selectedFestival?.colors.primary || "#F59E0B";
  const c2 = selectedFestival?.colors.secondary || "#EA580C";
  const selectedLang = languages.find((l) => l.id === language)!;

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* ── Hero — adapts to selected festival ── */}
      <div
        className="text-center rounded-2xl p-4 sm:p-5 transition-all duration-500"
        style={{
          background: selectedFestival
            ? `linear-gradient(135deg, ${c1}15, ${c2}10)`
            : undefined,
        }}
      >
        {selectedFestival ? (
          <div className="flex items-center justify-center gap-2 animate-fade-in">
            <span className="text-3xl sm:text-4xl">{selectedFestival.emoji}</span>
            <div>
              <h2
                className="text-xl sm:text-2xl font-bold text-gradient bg-gradient-to-r"
                style={{
                  backgroundImage: `linear-gradient(to right, ${c1}, ${c2})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {selectedFestival.name}
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">{selectedFestival.description}</p>
            </div>
          </div>
        ) : (
          <>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100">
              Create Festival Greetings ✨
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              Pick a festival, choose your style, and generate!
            </p>
          </>
        )}
      </div>

      {/* ── Filters ── */}
      <div
        className="rounded-xl p-3 space-y-2.5 transition-all duration-500 glass"
        style={{
          borderColor: selectedFestival ? `${c1}30` : undefined,
          borderWidth: selectedFestival ? "1px" : undefined,
        }}
      >
        {/* Row 1: Content Type + Language dropdown */}
        <div className="flex items-center gap-2">
          {/* Content Type pills */}
          <div className="flex gap-1 flex-1">
            {contentTypes.map((ct) => (
              <button
                key={ct.type}
                onClick={() => setContentType(ct.type)}
                className={`flex-1 px-2 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 touch-target
                  ${contentType === ct.type
                    ? "text-white shadow-md"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 active:bg-gray-200"
                  }`}
                style={contentType === ct.type ? { background: `linear-gradient(135deg, ${c1}, ${c2})` } : undefined}
              >
                {ct.emoji} <span className="hidden sm:inline">{ct.label}</span>
              </button>
            ))}
          </div>

          {/* Language dropdown */}
          <div className="relative">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="appearance-none pl-3 pr-8 py-2 rounded-lg text-xs sm:text-sm font-medium
                         bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200
                         focus:outline-none focus:ring-2 transition-all cursor-pointer touch-target"
              style={{
                focusRingColor: c1,
              } as React.CSSProperties}
            >
              {languages.map((lang) => (
                <option key={lang.id} value={lang.id}>
                  {lang.flag} {lang.native}
                </option>
              ))}
            </select>
            {/* Custom dropdown arrow */}
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Row 2: Recipient input */}
        <div className="relative">
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="For whom? e.g. Mom, Boss, Friend (optional)"
            className="w-full pl-8 pr-3 py-2.5 rounded-lg text-sm bg-gray-50 dark:bg-gray-700/50
                       placeholder:text-gray-400 dark:placeholder:text-gray-500
                       focus:outline-none focus:ring-2 focus:ring-amber-400/50 transition-all touch-target"
          />
          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-sm">👤</span>
        </div>
      </div>

      {/* ── Category Tabs ── */}
      <div className="scroll-pills px-0.5">
        {([
          { key: "upcoming" as const, label: "🔥 Upcoming", count: upcoming.length },
          { key: "all" as const, label: "All", count: null },
          ...categoryOrder.map((k) => ({
            key: k,
            label: `${festivalCategories[k].emoji} ${festivalCategories[k].label}`,
            count: null,
          })),
        ]).map((tab) => (
          <button
            key={tab.key}
            onClick={() => setCategoryFilter(tab.key)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 touch-target
              ${categoryFilter === tab.key
                ? "text-white shadow-md"
                : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 active:bg-gray-200"
              }`}
            style={
              categoryFilter === tab.key
                ? { background: `linear-gradient(135deg, ${c1}, ${c2})` }
                : undefined
            }
          >
            {tab.label}
            {tab.count !== null && tab.count > 0 && (
              <span className="ml-1 text-[10px] opacity-60">({tab.count})</span>
            )}
          </button>
        ))}
      </div>

      {/* ── Festival Grid ── */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {filteredFestivals.map((festival) => {
          const isSelected = selectedFestival?.id === festival.id;
          const days = daysUntilMap.get(festival.id);
          const isUpcoming = upcomingIds.has(festival.id);

          return (
            <button
              key={festival.id}
              onClick={() => {
                setSelectedFestival(festival);
                setMessage("");
                setError("");
              }}
              className={`relative rounded-xl p-2.5 sm:p-3 text-center transition-all duration-200
                active:scale-95 touch-target
                ${isSelected
                  ? "ring-2 ring-offset-2 ring-offset-white dark:ring-offset-gray-900 shadow-lg scale-[1.03]"
                  : "hover:shadow-md"
                }`}
              style={{
                background: isSelected
                  ? `linear-gradient(135deg, ${festival.colors.primary}, ${festival.colors.secondary})`
                  : `linear-gradient(135deg, ${festival.colors.primary}18, ${festival.colors.secondary}18)`,
                color: isSelected ? "white" : undefined,
                // @ts-expect-error -- CSS custom property for ring color
                "--tw-ring-color": isSelected ? festival.colors.primary : undefined,
              }}
            >
              {isUpcoming && days !== undefined && (
                <span
                  className="absolute -top-1 -right-1 text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded-full text-white shadow-sm"
                  style={{ background: days === 0 ? "#DC2626" : days <= 7 ? "#EA580C" : festival.colors.primary }}
                >
                  {days === 0 ? "Today!" : days === 1 ? "Tmrw" : `${days}d`}
                </span>
              )}
              <span className="text-xl sm:text-2xl block">{festival.emoji}</span>
              <p className={`text-[10px] sm:text-xs mt-1 font-medium leading-tight ${isSelected ? "text-white" : "text-gray-600 dark:text-gray-300"}`}>
                {festival.name}
              </p>
            </button>
          );
        })}
      </div>

      {/* Empty state */}
      {categoryFilter === "upcoming" && filteredFestivals.length === 0 && (
        <div className="text-center py-6 text-gray-400 dark:text-gray-500">
          <p className="text-3xl mb-1">🗓️</p>
          <p className="text-xs">No festivals in the next 90 days. Try &quot;All&quot;!</p>
        </div>
      )}

      {/* ── Generate Button — sticky on mobile ── */}
      {selectedFestival && !message && !loading && (
        <div className="sticky bottom-3 z-40 px-2 animate-fade-in">
          <button
            onClick={doGenerate}
            disabled={loading || countdown > 0}
            className="w-full py-3.5 sm:py-4 rounded-2xl text-white font-bold text-sm sm:text-base
                       shadow-xl transition-all duration-200
                       active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed touch-target"
            style={{
              background: `linear-gradient(135deg, ${c1}, ${c2})`,
            }}
          >
            {countdown > 0
              ? `Wait ${countdown}s...`
              : `✨ Generate ${selectedFestival.emoji} ${selectedFestival.name} ${selectedLang.native} ${contentTypes.find(c => c.type === contentType)?.label}`}
          </button>
        </div>
      )}

      {/* ── Loading ── */}
      {loading && selectedFestival && <LoadingSpinner festival={selectedFestival} />}

      {/* ── Error ── */}
      {error && !loading && selectedFestival && (
        <div className="text-center animate-fade-in">
          <div className="glass-strong rounded-xl p-5 space-y-2 inline-block">
            <span className="text-2xl block">{countdown > 0 ? "⏳" : "😔"}</span>
            <p className="text-xs text-gray-600 dark:text-gray-300">{error}</p>
            {countdown > 0 && (
              <p className="text-xl font-bold" style={{ color: c1 }}>{countdown}s</p>
            )}
            <button
              onClick={doGenerate}
              disabled={countdown > 0}
              className="mt-2 btn-primary text-sm disabled:opacity-40"
              style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }}
            >
              {countdown > 0 ? `Wait ${countdown}s` : "🔄 Retry"}
            </button>
          </div>
        </div>
      )}

      {/* ── Result ── */}
      {message && !loading && selectedFestival && (
        <div ref={resultRef} className="scroll-mt-4">
          <GreetingCard message={message} festival={selectedFestival} language={language} />
          <ShareButtons
            message={message}
            festival={selectedFestival}
            onGenerateAnother={doGenerate}
            onStartOver={() => {
              setSelectedFestival(null);
              setMessage("");
              setError("");
            }}
          />
        </div>
      )}
    </div>
  );
}
