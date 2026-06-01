# SafeZone — Action Checklist

Tick items as you complete them. Tackle **P0** before any backend work or real data collection.

## P0 — before backend or any real data

- [ ] Write an abuse & threat model doc covering predators posing as neighbours, custody-dispute misuse, false/swatting alarms, and vigilante mobs. Define a mitigation for each, then design the schema and permissions from it.
- [ ] Rewrite the hero and "How it works" copy away from "your whole street shows up" toward coordinated, restrained reporting. Put "report, don't approach" in the main funnel, not just a policy page.
- [ ] Stop claiming "automatic police handoff" until a real police integration exists. Reword to what's actually true, and promote "call 999/112" into the primary flow.
- [ ] Reword the Kenya Red Cross / NGO partnership lines to clearly aspirational ("organisations we want to partner with, such as…") until agreements are real.
- [ ] Decide on the volunteer form: either disable real submission and label it a preview, or store hashed phone + timestamped consent behind a privacy gate. Don't collect real numbers into an undefined endpoint.

## P1 — before launch

- [ ] Fix the "Privacy" link conflict: header goes to `/#trust`, footer goes to `/privacy`. Pick one canonical destination.
- [ ] Build one standard header used on every page; surface Safeguarding and Disclaimer beyond footer-only.
- [ ] Verify every `#anchor` target still exists after standardising nav.
- [ ] Add an About section: who you are, the mission, a real contact.
- [ ] Relabel headline metrics (<30s, 2km, $0) as targets, not measured facts.
- [ ] Keep the "nothing here is real" demo disclaimer visible inside the demo steps, not just the intro.
- [ ] Decide whether SMS/USSD is in scope (affects backend architecture). Make WhatsApp fallback first-class.
- [ ] Run a throttled "Slow 3G" performance pass; keep the landing page well under ~1MB.

## P2 — polish

- [ ] Run an automated accessibility pass (axe/Lighthouse); fix contrast and form-label issues; test the demo keyboard-only.
- [ ] Remove the `maximum-scale=5` zoom cap on the homepage.
- [ ] Add an `og:image` (1200×630) and switch to `summary_large_image`.
- [ ] Confirm the `safezone.app` domain and the three email inboxes actually work.
- [ ] Check favicon, 404 page, and `/demo` deep-link behaviour.

---

## Related files
- `SafeZone-feedback-and-backlog.md` — full reasoning behind each item.
- `SafeZone-color-palette.md` — design tokens (hex, CSS vars, RN object).
