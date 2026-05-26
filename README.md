# SafeZone — MVP Preview

> Find missing children fast with AI-powered community alerts.

This is the **public-facing MVP preview** of SafeZone — a Next.js landing page
plus an interactive demo that walks visitors through every core flow of the
product (sign-up → register child → trigger alert → volunteer accepts a
search zone → submit sighting → AI match → resolution).

All data is mocked client-side so the demo runs anywhere with zero API keys.

---

## What this is for

The full SafeZone product is a React Native app + Fastify backend wired to
Supabase, Gemini, Firebase, and SMS gateways. That stack can't be hosted on
Vercel — but the **feedback loop with real users** can be. This site lets
people try the experience in a browser, judge the concept, and tell us what to
change before we invest in the full mobile build.

See `docs/` in the parent project for the full PRD.

---

## Stack

- **Next.js 14** App Router, TypeScript
- **Tailwind CSS** for styling
- **lucide-react** icons
- **Zero backend** — mock AI matcher in `src/lib/mockAiMatcher.ts`

---

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production build

```bash
npm run build
npm start
```

## Deployment

This repo is wired to deploy to Vercel on push to `main`. No environment
variables required.

---

## Project layout

```
src/
├── app/
│   ├── layout.tsx        # Root layout + metadata
│   ├── page.tsx          # Landing page
│   ├── globals.css       # Tailwind entry + tiny custom styles
│   └── demo/
│       └── page.tsx      # Wraps DemoFlow
├── components/
│   ├── DemoFlow.tsx      # Multi-step interactive demo (the meat)
│   └── DemoUI.tsx        # Shared chrome (phone mock, buttons, layout)
└── lib/
    └── mockAiMatcher.ts  # Stand-in for Gemini sighting matcher
```

---

## Feedback wanted

Open an issue, or comment on what you'd change. This is an MVP — opinionated
critique > polite praise.

## License

MIT
