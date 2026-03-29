import type { Metadata, Viewport } from "next";
import { Poppins, Tiro_Devanagari_Hindi } from "next/font/google";
import ThemeToggle from "./components/ThemeToggle";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const devanagari = Tiro_Devanagari_Hindi({
  subsets: ["devanagari"],
  weight: "400",
  variable: "--font-devanagari",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFF7ED" },
    { media: "(prefers-color-scheme: dark)", color: "#030712" },
  ],
};

export const metadata: Metadata = {
  title: "ShubhSandesh — शुभ संदेश | AI Festival Greeting Generator",
  description:
    "Generate beautiful, AI-powered festival greetings in English, Hindi, and Marathi. Share heartfelt wishes, jokes, and WhatsApp messages for Diwali, Holi, Christmas, Birthdays & more!",
  keywords: [
    "festival greetings",
    "Diwali wishes",
    "Holi greetings",
    "Hindi greetings",
    "Marathi greetings",
    "WhatsApp messages",
    "AI greeting generator",
  ],
  openGraph: {
    title: "ShubhSandesh — AI Festival Greeting Generator",
    description: "Beautiful AI-powered greetings for every festival & occasion",
    type: "website",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "ShubhSandesh",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${devanagari.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var t = localStorage.getItem('theme');
                var d = t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches);
                if (d) document.documentElement.classList.add('dark');
              })();
            `,
          }}
        />
      </head>
      <body className="font-poppins min-h-screen flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-50 glass border-b border-white/20 dark:border-gray-700/30">
          <div className="max-w-2xl mx-auto px-3 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">🪔</span>
              <div>
                <h1 className="text-base sm:text-lg font-bold leading-tight bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400 text-gradient">
                  ShubhSandesh
                </h1>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 font-devanagari leading-tight">
                  शुभ संदेश
                </p>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </header>

        {/* Main */}
        <main className="flex-1 max-w-2xl mx-auto w-full px-3 py-4 sm:py-6">
          {children}
        </main>

        {/* Footer */}
        <footer className="text-center py-4 px-3 text-xs text-gray-400 dark:text-gray-500 safe-bottom">
          ShubhSandesh — Made with ❤️ | AI-Powered Festival Greetings
        </footer>
      </body>
    </html>
  );
}
