"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Festival, festivals, festivalCategories, getUpcomingFestivals } from "@/lib/festivals";
import { generateGreeting, GenerationError, ContentType } from "@/lib/generator";
import { languages } from "@/lib/languages";
import GreetingCard from "./components/GreetingCard";
import ShareButtons from "./components/ShareButtons";
import LoadingSpinner from "./components/LoadingSpinner";

const contentTypes: { type: ContentType; emoji: string; label: string }[] = [
  { type: "greeting", emoji: "💌", label: "Wish" },
  { type: "joke", emoji: "😄", label: "Joke" },
  { type: "whatsapp", emoji: "💬", label: "WhatsApp" },
];

export default function Home() {
  const [selectedFestival, setSelectedFestival] = useState<Festival | null>(null);
  const [contentType, setContentType] = useState<ContentType>("greeting");
  const [language, setLanguage] = useState("english");
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [categoryFilter, setCategoryFilter] = useState<"indian" | "global" | "all" | "upcoming">("upcoming");
  // Track what was used to generate the current message
  const [lastGenOptions, setLastGenOptions] = useState<{ festivalId: string; contentType: string; language: string; recipient: string } | null>(null);
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

  // Life events are always shown separately — they're evergreen
  const lifeEvents = festivals.filter((f) => f.category === "life-events");

  // Festival grid excludes life events (they have their own section)
  const filteredFestivals =
    categoryFilter === "upcoming"
      ? upcoming
      : categoryFilter === "all"
        ? festivals.filter((f) => f.category !== "life-events")
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
      setLastGenOptions({ festivalId: selectedFestival.id, contentType, language, recipient: recipient.trim() });
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

  // Did user change any options since the last generation?
  const optionsChanged = !lastGenOptions
    || !selectedFestival
    || lastGenOptions.festivalId !== selectedFestival.id
    || lastGenOptions.contentType !== contentType
    || lastGenOptions.language !== language
    || lastGenOptions.recipient !== recipient.trim();

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* ── Hero ── */}
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
                className="text-xl sm:text-2xl font-bold"
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
              Create Beautiful Messages ✨
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              Pick an occasion, choose your style, and share!
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
                {ct.emoji} {ct.label}
              </button>
            ))}
          </div>

          {/* Language dropdown */}
          <div className="relative">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2 rounded-lg text-xs sm:text-sm font-medium
                         bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200
                         focus:outline-none focus:ring-2 transition-all cursor-pointer touch-target"
            >
              {languages.map((lang) => (
                <option key={lang.id} value={lang.id}>
                  {lang.flag} {lang.native}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Row 2: Recipient */}
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

      {/* ── Life Events — Always Visible ── */}
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2 px-0.5">
          🎉 Anytime Occasions
        </p>
        <div className="scroll-pills gap-2 pb-1">
          {lifeEvents.map((event) => {
            const isSelected = selectedFestival?.id === event.id;
            return (
              <button
                key={event.id}
                onClick={() => {
                  setSelectedFestival(event);
                  setMessage("");
                  setError("");
                }}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium
                  transition-all duration-200 active:scale-95 touch-target
                  ${isSelected
                    ? "text-white shadow-lg"
                    : "hover:shadow-md"
                  }`}
                style={{
                  background: isSelected
                    ? `linear-gradient(135deg, ${event.colors.primary}, ${event.colors.secondary})`
                    : `linear-gradient(135deg, ${event.colors.primary}15, ${event.colors.secondary}15)`,
                  color: isSelected ? "white" : undefined,
                }}
              >
                <span className="text-base">{event.emoji}</span>
                {event.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Festival Category Tabs ── */}
      <div className="scroll-pills px-0.5">
        {([
          { key: "upcoming" as const, label: `🔥 Upcoming${upcoming.length > 0 ? ` (${upcoming.length})` : ""}` },
          { key: "all" as const, label: "All" },
          { key: "indian" as const, label: `${festivalCategories.indian.emoji} Indian` },
          { key: "global" as const, label: `${festivalCategories.global.emoji} Global` },
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
          </button>
        ))}
      </div>

      {/* ── Festival Grid ── */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 pt-1">
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

      {/* ── Generate Button — always visible when festival selected ── */}
      {selectedFestival && !loading && (
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
              : message && !optionsChanged
                ? `🔄 New Variation`
                : `✨ Generate ${selectedFestival.emoji} ${selectedLang.native} ${contentTypes.find(c => c.type === contentType)?.label}`}
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
            onStartOver={() => {
              setSelectedFestival(null);
              setMessage("");
              setError("");
              setLastGenOptions(null);
            }}
          />
        </div>
      )}
    </div>
  );
}
