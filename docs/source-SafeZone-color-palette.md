# SafeZone — Color Palette & Design Tokens

A palette built for a child-rescue app: calm and trustworthy by default, with **red owned entirely by emergency** and **green owned by "found / safe."** Light, high-contrast base for the in-app screens (readable outdoors in sun); optional dark variant for the marketing site and battery saving.

All values target **WCAG AA** for their stated use. Run a final contrast check (axe / Lighthouse / WebAIM) against your real UI before shipping.

---

## 1. Core principle (the rule Claude Code must follow)

- **Red = emergency only.** The trigger-alert button, an active live alert, and "very strong match" are the *only* red things on screen. Never use red decoratively.
- **Green = resolution.** Found, safe, resolved, verified.
- **Blue = trust / brand / primary actions** that are not emergencies.
- **Amber = caution / pending** (and your secondary brand accent).
- **Neutrals = everything else.**

---

## 2. Light theme (use for the functional app)

| Token | Hex | Use |
|---|---|---|
| `bg` | `#F8FAFC` | App background |
| `surface` | `#FFFFFF` | Cards, sheets, inputs |
| `border` | `#E2E8F0` | Dividers, input borders |
| `text` | `#0F172A` | Primary text |
| `text-secondary` | `#475569` | Labels, secondary text |
| `text-muted` | `#64748B` | Hints, timestamps |
| `brand` | `#1D4ED8` | Primary buttons, links, brand chrome |
| `brand-strong` | `#1E3A8A` | Headers, pressed brand state |
| `brand-tint` | `#DBEAFE` | Brand backgrounds, selected states |
| `emergency` | `#DC2626` | Live alert accents, emergency icons |
| `emergency-strong` | `#B91C1C` | Trigger-alert button fill, pressed |
| `emergency-tint` | `#FEE2E2` | Alert banner background |
| `emergency-on-tint` | `#991B1B` | Text on emergency-tint |
| `safe` | `#16A34A` | Found / safe icons + indicators |
| `safe-strong` | `#15803D` | "Mark resolved" button fill (white text) |
| `safe-tint` | `#DCFCE7` | Resolved banner background |
| `safe-on-tint` | `#166534` | Text on safe-tint |
| `caution` | `#F59E0B` | Pending / caution fills + icons |
| `caution-text` | `#B45309` | Caution text on light backgrounds |
| `caution-tint` | `#FEF3C7` | Caution banner background |
| `caution-on-tint`| `#78350F` | Text on caution-tint |

**Button text colors:** white (`#FFFFFF`) on `brand`, `emergency-strong`, and `safe-strong`. Dark text (`#0F172A`) on `caution`/amber fills (amber + white fails contrast).

---

## 3. Dark theme (use for the marketing site; optional app dark mode)

Keeps your existing near-black brand feel.

| Token | Hex | Use |
|---|---|---|
| `bg` | `#0B0E18` | Background (your current theme color) |
| `surface` | `#161B2E` | Cards |
| `border` | `#2A3350` | Dividers |
| `text` | `#F1F5F9` | Primary text |
| `text-muted` | `#94A3B8` | Secondary text |
| `brand` | `#60A5FA` | Links / brand accent (lighter so it pops) |
| `emergency` | `#F87171` | Emergency text/icons (button fill stays `#DC2626` + white) |
| `safe` | `#4ADE80` | Found / safe |
| `caution` | `#FBBF24` | Caution / your "amber" brand accent on dark |

---

## 4. AI confidence scale (0–100)

**Never rely on color alone.** Always show the **number + a text label + a bar length**. The ramp goes neutral → amber → red because a higher match is also more urgent.

| Range | Label | Color (light) | Color (dark) |
|---|---|---|---|
| 0–39 | "Low — verify" | `#64748B` | `#94A3B8` |
| 40–69 | "Possible match" | `#F59E0B` | `#FBBF24` |
| 70–89 | "Strong match" | `#EA580C` | `#FB923C` |
| 90–100 | "Very strong — prioritise" | `#DC2626` | `#F87171` |

(Each row should render as: `[██████░░░░] 78 · Strong match`.)

---

## 5. CSS custom properties (for the web / landing page)

```css
:root {
  --bg: #F8FAFC;
  --surface: #FFFFFF;
  --border: #E2E8F0;
  --text: #0F172A;
  --text-secondary: #475569;
  --text-muted: #64748B;

  --brand: #1D4ED8;
  --brand-strong: #1E3A8A;
  --brand-tint: #DBEAFE;

  --emergency: #DC2626;
  --emergency-strong: #B91C1C;
  --emergency-tint: #FEE2E2;
  --emergency-on-tint: #991B1B;

  --safe: #16A34A;
  --safe-strong: #15803D;
  --safe-tint: #DCFCE7;
  --safe-on-tint: #166534;

  --caution: #F59E0B;
  --caution-text: #B45309;
  --caution-tint: #FEF3C7;
  --caution-on-tint: #78350F;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg: #0B0E18;
    --surface: #161B2E;
    --border: #2A3350;
    --text: #F1F5F9;
    --text-secondary: #94A3B8;
    --text-muted: #94A3B8;
    --brand: #60A5FA;
    --emergency: #F87171;
    --safe: #4ADE80;
    --caution: #FBBF24;
  }
}
```

---

## 6. TypeScript token object (for React Native)

```ts
export const colors = {
  light: {
    bg: '#F8FAFC',
    surface: '#FFFFFF',
    border: '#E2E8F0',
    text: '#0F172A',
    textSecondary: '#475569',
    textMuted: '#64748B',
    brand: '#1D4ED8',
    brandStrong: '#1E3A8A',
    brandTint: '#DBEAFE',
    emergency: '#DC2626',
    emergencyStrong: '#B91C1C',
    emergencyTint: '#FEE2E2',
    emergencyOnTint: '#991B1B',
    safe: '#16A34A',
    safeStrong: '#15803D',
    safeTint: '#DCFCE7',
    safeOnTint: '#166534',
    caution: '#F59E0B',
    cautionText: '#B45309',
    cautionTint: '#FEF3C7',
    cautionOnTint: '#78350F',
    onAccent: '#FFFFFF',
  },
  dark: {
    bg: '#0B0E18',
    surface: '#161B2E',
    border: '#2A3350',
    text: '#F1F5F9',
    textMuted: '#94A3B8',
    brand: '#60A5FA',
    emergency: '#F87171',
    safe: '#4ADE80',
    caution: '#FBBF24',
    onAccent: '#FFFFFF',
  },
} as const;

export const confidenceScale = [
  { min: 0,  max: 39,  label: 'Low — verify',              light: '#64748B', dark: '#94A3B8' },
  { min: 40, max: 69,  label: 'Possible match',            light: '#F59E0B', dark: '#FBBF24' },
  { min: 70, max: 89,  label: 'Strong match',              light: '#EA580C', dark: '#FB923C' },
  { min: 90, max: 100, label: 'Very strong — prioritise',  light: '#DC2626', dark: '#F87171' },
];
```

---

## 7. Tailwind config snippet (if the web app uses Tailwind)

```js
// tailwind.config.js -> theme.extend.colors
colors: {
  brand:     { DEFAULT: '#1D4ED8', strong: '#1E3A8A', tint: '#DBEAFE' },
  emergency: { DEFAULT: '#DC2626', strong: '#B91C1C', tint: '#FEE2E2' },
  safe:      { DEFAULT: '#16A34A', strong: '#15803D', tint: '#DCFCE7' },
  caution:   { DEFAULT: '#F59E0B', text: '#B45309',   tint: '#FEF3C7' },
}
```

---

## 8. Usage checklist for Claude Code

- [ ] Only the trigger-alert button and live-alert UI use `emergency` red.
- [ ] White text on `brand`, `emergency-strong`, `safe-strong`; dark text on amber fills.
- [ ] AI score always shows number + label + bar, not color alone.
- [ ] Body text uses `text` / `text-secondary`; never `text-muted` for long passages.
- [ ] Run an axe/Lighthouse contrast pass on the final screens.
- [ ] In-app screens default to the **light** theme for outdoor sun readability.
