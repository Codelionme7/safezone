# SafeZone — Design Tokens & Colour System

A palette for a child-rescue app: calm and trustworthy by default, with **red owned
entirely by emergency** and **green owned by "found / safe."** The marketing site +
demo currently run the **dark theme**. A light theme is specified for the eventual
in-app screens (readable outdoors in sun) and is a future task.

> Implemented in `tailwind.config.ts`. This doc is the source of truth for *why*
> each colour exists. Run a final WCAG AA contrast check (axe / Lighthouse / WebAIM)
> against real screens before any launch.

---

## 1. The rule (non-negotiable)

- **Red (`alert`) = emergency only.** The trigger-alert button, an active live alert,
  and a "very strong match" score are the *only* red things on screen. Never decorative.
- **Green (`safe`) = resolution.** Found, safe, resolved, verified.
- **Blue (`brand`) = trust / brand / primary actions** that are not emergencies.
- **Amber (`caution`) = caution / pending / secondary accent** (also used for demo &
  safety disclaimers).
- **Neutrals (`ink`) = everything else.**

This was a deliberate shift: blue is now the primary brand colour (it used to be green).
Green is reserved for genuine "safe / found" moments only.

---

## 2. Tailwind tokens (implemented, dark site)

| Token | Anchor hex | Meaning |
|---|---|---|
| `brand-600` | `#2563eb` | Primary buttons / brand chrome |
| `brand-400/300` | `#60a5fa` / `#93c5fd` | Accents & links on dark (pop) |
| `alert-500` | `#f04438` | Emergency fill (trigger button, live alert) |
| `safe-400/600` | `#4ade80` / `#16a34a` | Found / safe / resolved / verified |
| `caution-400/300` | `#fbbf24` / `#fcd34d` | Caution, pending, disclaimers |
| `ink-*` | `#0b0e18`→`#f6f7f9` | Backgrounds, surfaces, text |

Button text is white on `brand`, `alert`, and `safe` fills. Use dark text on amber fills
(amber + white fails contrast).

---

## 3. AI confidence scale (0–100)

**Never rely on colour alone** — always render **number + text label + bar length**.
The ramp goes neutral → amber → orange → red, because a higher match is also more urgent.
Implemented in `confidenceBand()` in `DemoFlow.tsx`.

| Range | Label | Colour (dark) |
|---|---|---|
| 0–39 | "Low — verify" | `ink-400` (slate) |
| 40–69 | "Possible match" | `caution-400` (amber) |
| 70–89 | "Strong match" | `orange-400` |
| 90–100 | "Very strong — prioritise" | `alert-400` (red) |

Renders as: `78  ████████░░  Strong match`.

---

## 4. Light theme (future — for the functional app)

Specified but not yet built. In-app screens should default to light for outdoor sun
readability. Key tokens: `bg #F8FAFC`, `surface #FFFFFF`, `text #0F172A`,
`brand #1D4ED8`, `emergency #DC2626`, `safe #16A34A`, `caution #F59E0B`.
Full token table + CSS variables + a React Native object live in the original
`SafeZone-color-palette.md` source.

---

## 5. Usage checklist

- [x] Only the trigger-alert button and live-alert UI use `alert` red.
- [x] White text on `brand`, `alert`, `safe` fills.
- [x] AI score shows number + label + bar, not colour alone.
- [ ] Run an axe/Lighthouse contrast pass on the final screens (pending).
- [ ] Build the light theme for in-app screens (future).
