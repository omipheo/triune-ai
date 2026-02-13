# Triune AI – P6 Math Mastery Engine

Mobile-first PWA (Next.js, Supabase, Living Glass “Command Bridge” UI).

## Milestone 1: The Bridge

- **Auth:** Login / Signup with Supabase; redirect to `/mission`.
- **Command Bridge:** Top HUD (Triune logo + Fuel 12/30), Mission Map (mastery nodes), bottom nav (Mission, Vault, Support).
- **Gold Nodes:** Locked / Active / Mastered states; tap active node to open Dr. Julian chat.
- **Verbal Mastery:** Web Speech API mic button + text fallback in chat overlay.
- **PWA:** `manifest.json`, Serwist service worker, “Add to Home Screen” (place 192×192 and 512×512 icons in `public/icons/`).

## Setup

1. Copy `.env.example` to `.env.local` and set:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
2. In Supabase SQL Editor, run `supabase/migrations/20250213000000_profiles_and_rls.sql`.
3. Add PWA icons to `public/icons/`: `icon-192x192.png`, `icon-512x512.png` (from Triune Gold Triangle asset).

## Build & run

- **Dev:** `npm run dev`
- **Build (PWA):** `npm run build` (uses `--webpack` for Serwist).
- **Start:** `npm run start`

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
