# SafeZone V2 — Build Plan

> Synthesis of the collaborator review session + everything decided so far.
> This is the working document for the next 1–2 week sprint to take the MVP
> from "clickable demo" to "real product NGOs can pilot."

**Owner:** Codelionme7
**Status:** MVP preview live at https://safezone-amber-one.vercel.app/
**Target ship date for V2:** 1–1.5 weeks from today (2026-05-26)
**Pilot horizon:** 6 months to first NGO partnership

---

## 1. Where we are now

- ✅ Next.js landing page + 8-step interactive demo live on Vercel
- ✅ GitHub repo (private except for `safezone` itself)
- ✅ Zero-cost stack: everything mocked client-side, no API keys
- ❌ No real backend wired
- ❌ No multilingual support
- ❌ No real map
- ❌ No facial recognition
- ❌ No WhatsApp/SMS delivery
- ❌ No volunteer or admin dashboard (only the demo flow)
- ❌ No privacy policy / terms / disclaimers

This doc plans every gap above.

---

## 2. Strategic decisions (locked in this session)

### 2.1 Target users — in priority order

1. **NGOs** — primary go-to-market. Red Cross Kenya leads the list because
   they already have a verified volunteer pool with no malicious intent.
2. **Activists** — passionate, networked, evangelise the product.
3. **Children's homes** — extra angle. Their staff genuinely care about
   child safety and can be early advocates.
4. **(Later) Government & police** — partnership rather than direct user.

### 2.2 Why NOT consumer-direct in V1

Trust is the bottleneck for a child-safety product. NGOs lend us trust
faster than we can build it ourselves.

### 2.3 Sustainability model

Free to use → revenue from:

- **NGO partnership contracts** (per-deployment service fee)
- **Grant funding** (UNICEF, Safaricom Foundation, Bill & Melinda Gates,
  Mastercard Foundation)
- **Government partnerships** (county-level child safety budgets)
- **Future:** broader missing-persons platform — human trafficking,
  terrorism missing-persons cases, drug syndicate intel pipelines (with
  police/government partners only, never solo)

**Open question:** what does the platform charge an NGO? Tiered SaaS per
volunteer seat? Per-incident? Flat regional license? — needs validation
calls with 3 NGOs before we lock pricing.

---

## 3. V2 feature plan

Listed in priority order. P0 = ship in the 1–1.5 week sprint. P1 = next
iteration. P2 = future / pitch-deck material.

### 3.1 P0 — Multilingual platform 🌍

**Why:** Volunteers in Turkana, Marsabit, rural Maasai areas, and Luhya/
Kikuyu/Luo regions may not be confident in English or Swahili. A
witness description in Maasai or Pokot must reach the system without a
language barrier.

**Scope:**
- Language switcher in the **header** (right-aligned, flag icons + name).
- Initial languages:
  1. English
  2. Swahili
  3. Maasai (Maa)
  4. Luhya
  5. Kikuyu
  6. Luo
  7. Somali (for Marsabit / NEP)
- All UI strings extracted into translation files (`src/lib/i18n/<lang>.ts`).
- Sighting submissions: user writes in their own language, system stores
  original + machine translation to English for the AI matcher.

**Tech:**
- `next-intl` library (works cleanly with Next.js App Router).
- Translations: start with English + Swahili crowdsourced; for low-resource
  languages (Maa, Pokot, Turkana) use Google Translate API where supported
  and human review where not.
- Translation memory stored in Supabase so we improve over time.

**Disclaimer needed:** "AI translation may be imperfect for local
languages — original message is always preserved alongside the
translation."

### 3.2 P0 — Real interactive map

**Why:** The demo currently uses a CSS-faked map. Real product needs:
- Parent picks last-seen location on a real map.
- Volunteer drops a pin where they spotted a child.
- Search zones drawn as actual polygons over real streets.
- Police see the exact geo-coords.

**Tech choice:** **MapLibre GL JS** + OpenStreetMap tiles.
- Free, open-source, no API key for OSM tiles.
- Mapbox-compatible API if we ever upgrade.
- Alternative: Leaflet (simpler, lighter, also free).

**Recommendation:** Start with **Leaflet** — lighter, easier to learn,
sufficient for V2. Upgrade to MapLibre if we need 3D / heavy styling
later.

**Required features:**
- Tap-to-drop-pin for last-seen and sighting location
- Show search zones as polygons (use Turf.js for polygon math)
- Show volunteer positions live (when they opt in)
- Geocode address → lat/lng with **Nominatim** (free OSM geocoder)

### 3.3 P0 — Volunteer sign-up & dashboard

**Why:** The collaborator was clear — we need a real volunteer onboarding
funnel, not just "trust me, neighbours will show up."

**Pages to build:**
- `/volunteer` — public landing for volunteers. Pitch + sign-up form.
- `/dashboard/volunteer` — logged-in volunteer dashboard. Active alerts
  near them, zones they can claim, history of helps.
- `/dashboard/admin` — for NGO admins (Red Cross coordinator etc).
  Approve new volunteers, view stats, manage stations.
- `/dashboard/parent` — parent's view. Their children, their alerts,
  resolved cases.

**Volunteer onboarding flow:**
1. Sign up with phone number (OTP verified)
2. Optional: link to an NGO they're affiliated with (Red Cross etc.)
3. Pick languages they speak
4. Pick neighbourhood(s) they're willing to respond in
5. Read & accept volunteer code of conduct
6. **Wait for verification** — an NGO admin or SafeZone team member
   verifies them before they get push access.

This verification step is the **trust gate** that lets us partner with
NGOs without exposing real children to bad actors.

### 3.4 P0 — Real-time delivery: WhatsApp + SMS

**Why:** Push notifications fail when phones are off Wi-Fi. SMS and
WhatsApp are the actual last-mile in rural Kenya.

**Stack:**
- **WhatsApp:** WhatsApp Business Cloud API (Meta) — 1,000 free
  conversations/month. After that, ~$0.005–$0.05 per message depending
  on category.
- **SMS:** Africa's Talking — free sandbox; production ~KES 0.80
  (~$0.006) per SMS for Kenyan numbers.
- **Push:** Firebase Cloud Messaging — free.

**Delivery priority logic:**
1. Try FCM push (instant, free)
2. If no push token or delivery fails after 30s → WhatsApp
3. If WhatsApp fails → SMS

Every delivery attempt is logged in `notification_attempts` table for
audit.

### 3.5 P1 — Facial recognition / photo matching 🧠

**Why:** The collaborator mentioned an app (likely PimEyes) that searches
faces across the web. Even a constrained version — *only* matching
sightings against the active child's photo — would dramatically reduce
false positives.

**Reality check on cost:** This is the **only feature** in V2 that
genuinely costs money. Free tiers don't cover production-quality face
matching.

**Options:**

| Provider | Pricing | Accuracy | Notes |
|---|---|---|---|
| AWS Rekognition `CompareFaces` | $1.00 / 1,000 images | High | Easiest. Free tier: 5,000 images/month for 12 months. |
| Google Cloud Vision | $1.50 / 1,000 detections | High | Generous free tier first 1,000/month. |
| Face++ (Megvii) | Free dev tier | Medium-high | Generous, slower outside China. |
| DeepFace (Python OSS) | Free, self-hosted | Medium | Needs GPU server — Render free tier won't cut it. |

**Recommended approach for V2:**
1. Use **AWS Rekognition's free tier** (12 months) for the pilot.
2. Wrap it behind our own API so we can swap providers later.
3. **Disclaimer in UI:** "AI face matching is assistive only. A match
   confidence score is shown to volunteers and police, who make the
   final identification decision. Do not approach a child based on AI
   match alone — always involve police."

**Privacy hardening:**
- Parent's photo never stored on our server. Only a **face embedding**
  (a 512-dimension vector) sent to AWS, and the vector is deleted within
  24h of alert resolution.
- AWS Rekognition can run without storing the source image on AWS side
  using the `ComparedFaces` operation.

**Honest caveat (write into the deck):** AI face recognition has known
bias issues, especially for African faces (most training data is
non-African). We disclose this loudly and use it as a *signal*, never a
*decision*.

### 3.6 P1 — Privacy, disclaimers, and compliance

**Pages to add:**
- `/privacy` — privacy policy (template + lawyer review later)
- `/terms` — terms of service
- `/disclaimer` — AI limitations, photo handling, what we do NOT do
- `/safeguarding` — our child safeguarding policy

**Required disclaimers in-product:**
- On every AI match score: "AI is assistive — police make final ID."
- On translation output: "Translation is machine-generated and may be
  imperfect."
- On volunteer sign-up: "You will not approach a child directly. Your job
  is to report and let police handle physical recovery."
- On alert trigger: "False alerts are taken seriously and may result in
  ban + police report."

**Compliance frameworks to align with:**
- Kenya Data Protection Act (2019)
- COPPA (child data — even if not US, follow the principles)
- GDPR (if any EU user ever touches it)
- ODPC registration in Kenya (Office of the Data Protection
  Commissioner — required for businesses processing personal data)

### 3.7 P2 — Future scope (long-term, pitch-deck only)

Per the collaborator's "think widely" prompt:

- **Missing persons general platform** — not just children. Elderly,
  vulnerable adults.
- **Human trafficking intelligence** — only with active police/NGO
  partnership. Never as a public reporting tool (risk of harassment).
- **Drug & terrorism missing-persons** — pattern recognition across
  reports. Strictly partner-only access.
- **Cross-border** — Uganda, Tanzania, Rwanda — same volunteer
  infrastructure once Kenya pilot proves out.

These are **pitch-deck features**. Do not build them in V2.

---

## 4. Design refresh — color psychology & branding

### 4.1 Current state

Dark theme + orange-red brand (`#f6492b`). Works visually but isn't
distinctively Kenyan.

### 4.2 Recommended palette (V2)

Inspired by the Kenyan flag, but muted for accessibility & long-term
use:

| Token | Hex | Use |
|---|---|---|
| `kenya-green` | `#006B3F` | Trust, growth, safety — primary CTAs |
| `kenya-red` | `#BB0000` | Emergency / alert states ONLY |
| `kenya-black` | `#0A0A0A` | Background dark mode |
| `kenya-white` | `#FAFAFA` | Background light mode |
| `kenya-gold` | `#D4A017` | Accent — community / volunteer states |
| `safe-blue` | `#1E3A8A` | Trust / police / official channels |

**Psychology rationale:**

- **Green = trust + growth + safety.** Used for "Mark as found,"
  "Volunteer signed up," success states.
- **Red ≠ generic brand color.** Reserved strictly for active emergency
  states. When red appears, something matters.
- **Gold = community.** Volunteer-related screens, "neighbours
  responded" feeds.
- **Blue = institution.** Police notifications, official station info.
- **Black + white** for everything else — calm, readable, dignified.

### 4.3 Typography

| Use | Font | Why |
|---|---|---|
| UI body | **Inter** (variable) | Best free Latin-script readability, free |
| Headlines | **Manrope** | Strong, modern, friendly, free on Google Fonts |
| Numbers (match scores, stats) | **JetBrains Mono** | Clear tabular figures |

All from Google Fonts → zero cost, easy to self-host via Next.js
`next/font/google`.

### 4.4 Light mode

Currently dark-only. V2 must support light mode — many users will use the
app in daylight outdoors. Use `prefers-color-scheme` with manual toggle.

---

## 5. Backend & AI architecture

### 5.1 Stack (V2)

| Layer | Tech | Cost |
|---|---|---|
| Web frontend | Next.js 14 on Vercel | Free |
| Mobile (later) | React Native or Expo | Free |
| API | Next.js API routes (serverless on Vercel) OR Fastify on Render | Free tier |
| DB | Supabase Postgres + PostGIS | Free tier (500 MB) |
| Auth | Supabase Auth (phone OTP) | Free tier |
| File storage | Supabase Storage (encrypted) | Free tier (1 GB) |
| AI matcher | Google Gemini 1.5 Flash | Free tier (1M tokens/day) |
| Face matching | AWS Rekognition | Free tier 12 months, then ~$0.001/image |
| Push | Firebase Cloud Messaging | Free |
| Maps | Leaflet + OpenStreetMap + Nominatim | Free |
| SMS | Africa's Talking | $0.006/SMS (production) |
| WhatsApp | Meta WhatsApp Business Cloud API | Free up to 1k/mo |
| i18n | next-intl + Google Translate (low-resource langs) | Free tier |
| Error tracking | Sentry | Free tier |
| CI/CD | GitHub Actions + Vercel | Free |

### 5.2 Recommendation on API hosting

Don't run a separate Fastify backend on Render for V2. Use **Next.js API
routes** on Vercel — same deploy, no second service, faster iteration.
Move to a dedicated backend only if we hit Vercel function limits
(10s execution on hobby plan, 60s on pro).

### 5.3 AI framework

Wrap Gemini in a small abstraction in `src/lib/ai/` so we can swap
providers when free credits run out:

```
src/lib/ai/
├── index.ts          # Public API: matchSighting(), faceMatch(), translate()
├── providers/
│   ├── gemini.ts     # Default for text matching & translation
│   ├── rekognition.ts# Face matching
│   └── mock.ts       # For local dev — keeps current demo working
└── prompts/
    ├── sighting.ts   # Sighting-match prompt template
    └── translate.ts  # Translation prompt template
```

This pattern means a credit run-out doesn't take the whole product down —
we degrade gracefully to mock + manual review.

### 5.4 API keys & secrets management

- All keys in Vercel **Environment Variables** UI, never in code.
- Pull into `process.env.GEMINI_API_KEY` etc.
- Local dev: `.env.local` (already gitignored).
- Document required env vars in `.env.example` (commit this).

---

## 6. Budget — realistic monthly cost for V2 pilot

Assuming a 50-volunteer / 5-alerts-per-week pilot:

| Item | Monthly cost | Notes |
|---|---|---|
| Domain (`safezone.ke` or similar) | $1 ($12/year) | Namecheap / Porkbun |
| Vercel | $0 | Hobby tier sufficient |
| Supabase | $0 | Free tier covers 50-volunteer scale |
| Gemini API | $0 | Free tier well above pilot volume |
| Firebase FCM | $0 | Unlimited free |
| OpenStreetMap | $0 | Free |
| AWS Rekognition | $0 | First 12 months free; budget $10/mo after |
| Africa's Talking SMS | $5–15 | Depends on alert volume |
| WhatsApp Business | $0 | Free tier sufficient initially |
| Sentry | $0 | Free tier |
| **Total during free-tier window** | **~$5–15/month** | |
| **Total after AWS free tier expires** | **~$15–30/month** | |

**Recommendation:** budget **$30/month** for V2 pilot. Anything above
that is a sign we're hitting real scale and should be raising/funding.

**One-time costs:**
- Domain registration: $12 (one year)
- (Optional) Logo design / branding: $0 if DIY, $50–200 if commissioned
- (Optional later) Google Play Store dev account: $25 one-time

---

## 7. The 1–1.5 week sprint plan

### Day 1–2 — Foundation refactor
- [ ] Add `next-intl` and extract all UI strings to `en.ts` + `sw.ts`
- [ ] Add language switcher to header
- [ ] Add Kenyan-flag-inspired color tokens to Tailwind config
- [ ] Add light/dark mode toggle
- [ ] Wire Inter + Manrope via `next/font/google`

### Day 3 — Real maps
- [ ] Install Leaflet + react-leaflet
- [ ] Replace mock map in demo step 5 with real Leaflet map
- [ ] Add tap-to-drop-pin in trigger step
- [ ] Geocode last-seen address via Nominatim

### Day 4 — Supabase backend
- [ ] Create Supabase project
- [ ] Run schema.sql (already exists in original PRD package)
- [ ] Add Supabase client to Next.js
- [ ] Wire phone-OTP sign-up
- [ ] Convert demo signup → real signup

### Day 5 — Volunteer & dashboards
- [ ] Build `/volunteer` landing
- [ ] Build `/dashboard/volunteer` (list active alerts near user)
- [ ] Build `/dashboard/parent`
- [ ] Build `/dashboard/admin` (basic — list users, approve volunteers)
- [ ] Volunteer verification flow

### Day 6 — Notifications
- [ ] Wire Firebase FCM for web push (using Firebase JS SDK)
- [ ] Wire Africa's Talking SMS (server-side route)
- [ ] Wire WhatsApp Business API (server-side route)
- [ ] Implement fallback delivery chain

### Day 7 — AI integration
- [ ] Get Gemini API key
- [ ] Implement real `matchSighting()` in `src/lib/ai/providers/gemini.ts`
- [ ] Implement translation for low-resource language sightings
- [ ] Optional: stub face-matching endpoint (real impl in week 2)

### Day 8–10 (slack / overflow)
- [ ] Privacy, terms, disclaimer, safeguarding pages
- [ ] AWS Rekognition face-match (if time)
- [ ] Polish & QA
- [ ] First demo to a Red Cross contact

---

## 8. Open questions / decisions needed from you

1. **GitHub collaborator** — what's your collaborator's GitHub handle?
   I'll add them to the `safezone` repo as a contributor.
2. **Domain name** — `safezone.ke`? `safezone.co.ke`? Something else?
3. **First NGO target** — do you have a contact at Red Cross Kenya, or
   should we plan to do cold outreach?
4. **Color palette** — are you happy with the Kenya-flag-inspired
   palette above, or do you want something different (e.g. less
   "national," more "calm-medical")?
5. **Light mode** — do you want it from V2 or push to V3?
6. **Children's homes** — we listed them as user #3. Do you have a
   specific home in mind for a pilot?
7. **The MVP demo URL** — keep it as `safezone-amber-one.vercel.app`
   for the demo, or buy the domain now and point it there?

---

## 9. Things to share in pitches / demos

(Lifted from the founder/builder-facing description we drafted today —
keep iterating on these.)

- **One-line:** "Compresses the missing-child first hour."
- **Why now:** Smartphone penetration in Kenya is now >65%. Push
  notifications are reliable. AI sighting-matching is finally cheap
  enough. Police data integration is becoming an active conversation in
  East Africa.
- **Why us:** Built in Kenya, for Kenya. NGO-first GTM. Free for
  end-users. Open-source-able.
- **What's defensible:** The verified volunteer network. Once 5,000
  verified neighbours are on the platform, switching cost is enormous.

---

## 10. Next immediate actions for you (this week)

1. Decide on the open questions in §8
2. Send your collaborator this document for review
3. Send me your collaborator's GitHub handle so I can add them
4. Schedule 2–3 NGO discovery calls (Red Cross Kenya is the first)
5. Reserve the domain
6. Approve the color palette so I can ship the V2 refresh

Reply with answers to §8 and I'll start the Day 1–2 work.

---

## 11. Session 2 log — shipped + action points

Everything below is **live on the demo** (https://safezone-amber-one.vercel.app)
and built client-side (still no backend/keys required).

### ✅ Shipped this session

1. **Trust-forward visual identity** — color psychology applied:
   green = trust/safety (CTAs), red = emergency only (alert trigger + radius),
   blue = institutional. No gold. Fonts: Manrope (display) + Inter (body) +
   JetBrains Mono (numbers).
2. **Volunteer sign-up page** (`/volunteer`) — languages spoken, response
   areas, NGO affiliation, code-of-conduct gate, "partner with us" callout.
3. **Trust pages** — `/privacy`, `/disclaimer`, `/safeguarding` + an AI
   disclaimer banner on the match result.
4. **Child photo upload** in the parent report flow + a mock "AI photo
   analysis" panel. Photo follows the case: shown to volunteers in the
   broadcast, as a reference while reporting a sighting, and on the match
   screen. Policy encoded in copy: photo visible to verified volunteers
   only during an active alert, removed on resolution.
5. **Real Google Maps** in the alert broadcast + trigger steps. Keyless
   embed works out of the box; upgrades to the official Maps Embed API if
   `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` is set in Vercel.
6. **Mobile responsiveness pass** — mobile nav menu (closes on tap),
   responsive demo header, fluid hero/section sizing, proper viewport
   config. Tooling: Tailwind CSS (mobile-first) — no new dependency needed.

### 🧠 Facial-recognition decision (recorded)

- **Core sighting-vs-photo match → AWS Rekognition** (fastest, 12-mo free
  tier) **or self-hosted InsightFace/DeepFace** (child photos never leave
  our servers — strong NGO/government trust pitch). Pick based on whether
  data sovereignty is part of the pitch.
- **PimEyes → NOT for the MVP.** It's a web-wide reverse-face *search*
  engine, not a 1:1 matcher; it carries serious legal/ethical/reputational
  risk for processing children's faces (Kenya DPA, GDPR precedent). Park it
  as a **future, partner-only (police), legally-reviewed trafficking
  web-search module** (V3+), where its strength genuinely applies.
- Always keep the disclaimer: AI is assistive only, weaker on African
  faces, a human confirms identity.

### 📋 Open action points (next sessions, priority order)

- [ ] **Language switcher** (i18n) — collaborator's #1 ask. EN/SW + Kikuyu,
      Luo, Luhya, Maa, Somali. `next-intl`.
- [ ] **Mock face-match demo step** — volunteer uploads a sighting photo →
      side-by-side with child's photo → simulated match % + bias disclaimer.
- [ ] **Interactive map upgrade** — Maps JavaScript API (billing key) to
      draw the 2 km radius circle + search-zone polygons on the real map.
- [ ] **Backend** — Supabase (DB + phone-OTP auth), convert mocks to real
      Next.js API routes. Wire real Gemini for sighting text matching.
- [ ] **Real notifications** — WhatsApp Business + Africa's Talking SMS +
      Firebase push, with fallback chain.
- [ ] **Dashboards** — parent / volunteer / NGO-admin (with volunteer
      verification gate).
- [ ] **Decisions still needed from you (§8):** collaborator's GitHub
      handle, domain name, first NGO contact, light-mode now or later.
