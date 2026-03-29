"use client";

import { Festival } from "@/lib/festivals";

interface Props {
  festival: Festival;
}

export default function LoadingSpinner({ festival }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-20 space-y-8 animate-fade-in">
      {/* Floating emoji */}
      <div className="relative">
        <div
          className="text-7xl animate-float"
          style={{ filter: `drop-shadow(0 8px 24px ${festival.colors.primary}40)` }}
        >
          {festival.emoji}
        </div>

        {/* Orbiting sparkles */}
        <div className="absolute inset-0 animate-spin-slow">
          <span className="absolute -top-2 left-1/2 text-lg">✨</span>
          <span className="absolute top-1/2 -right-4 text-sm">⭐</span>
          <span className="absolute -bottom-2 left-1/3 text-lg">✨</span>
        </div>
      </div>

      {/* Shimmer bar */}
      <div className="w-48 h-1.5 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
        <div
          className="h-full rounded-full shimmer-bg"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${festival.colors.primary} 50%, transparent 100%)`,
            backgroundSize: "200% 100%",
            animation: "shimmer-slide 1.5s ease-in-out infinite",
          }}
        />
      </div>

      {/* Text */}
      <div className="text-center space-y-1">
        <p
          className="text-lg font-semibold animate-pulse"
          style={{ color: festival.colors.primary }}
        >
          Creating your message...
        </p>
        <p className="text-sm text-gray-400 dark:text-gray-500">
          Powered by AI ✨
        </p>
      </div>
    </div>
  );
}
