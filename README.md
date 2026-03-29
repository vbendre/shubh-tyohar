# ShubhSandesh — शुभ संदेश

**AI-Powered Festival & Occasion Greeting Generator**

ShubhSandesh ("Auspicious Message") generates beautiful, culturally authentic greetings for Indian and global festivals, plus life events like birthdays and weddings. Pick a festival, choose your content type and language, and get an AI-generated message you can instantly share on WhatsApp.

<!-- ![ShubhSandesh Screenshot](screenshot.png) -->

## Features

- **21 Festivals & Occasions** — Diwali, Holi, Ganesh Chaturthi, Christmas, Eid, Birthday, Wedding, and more
- **3 Content Types** — Heartfelt greetings, festival jokes, and WhatsApp-ready messages
- **3 Languages** — English, Hindi (हिन्दी), and Marathi (मराठी)
- **Personalization** — Tailor messages for Mom, Boss, Friend, or anyone
- **One-tap WhatsApp sharing** — The primary use case
- **Beautiful festive UI** — Festival-themed colors, animations, and dark mode
- **Powered by Google Gemini AI** — Runs on the free tier

## Tech Stack

- **Next.js 14** (App Router)
- **Tailwind CSS** — Festive design with dark mode
- **Google Gemini API** — `gemini-1.5-flash` for fast, free text generation
- **TypeScript** — End to end

## Getting Started

### 1. Clone & install

```bash
git clone <your-repo-url>
cd shubh-tyohar
npm install
```

### 2. Get a Gemini API key

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Create an API key (free)
3. Create `.env.local` in the project root:

```
GOOGLE_GEMINI_API_KEY=your_api_key_here
```

### 3. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

1. Push to GitHub
2. Import in [Vercel](https://vercel.com)
3. Add `GOOGLE_GEMINI_API_KEY` as an environment variable
4. Deploy

## Project Structure

```
├── app/
│   ├── layout.tsx              # Root layout, fonts, header/footer
│   ├── page.tsx                # Wizard orchestrator (client component)
│   ├── globals.css             # Tailwind + festive styles
│   ├── api/generate/route.ts   # Gemini API endpoint
│   └── components/
│       ├── FestivalPicker.tsx
│       ├── ContentTypeSelector.tsx
│       ├── LanguageSelector.tsx
│       ├── PersonalizationInput.tsx
│       ├── GreetingCard.tsx
│       ├── ShareButtons.tsx
│       ├── LoadingSpinner.tsx
│       └── ThemeToggle.tsx
├── lib/
│   ├── festivals.ts            # Festival data (21 festivals, 3 categories)
│   └── generator.ts            # Client-side API helper
└── .env.example
```

---

ShubhSandesh — Made with ❤️ | AI-Powered Festival Greetings
