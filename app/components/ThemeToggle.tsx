"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = stored === "dark" || (!stored && prefersDark);
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  if (!mounted) return <div className="w-10 h-10" />;

  return (
    <button
      onClick={toggle}
      className="relative w-10 h-10 rounded-full glass flex items-center justify-center
                 hover:scale-110 active:scale-95 transition-all duration-200"
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <span
        className="text-xl transition-transform duration-300"
        style={{ transform: dark ? "rotate(180deg)" : "rotate(0deg)" }}
      >
        {dark ? "🌙" : "☀️"}
      </span>
    </button>
  );
}
