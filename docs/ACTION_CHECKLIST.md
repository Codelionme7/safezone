# SafeZone — Action Checklist

Status tracked against the collaborator review. **P0** before backend or any real data.
Last reviewed: this session.

## P0 — before backend or any real data

- [ ] **Abuse & threat model doc** — predators posing as neighbours, custody-dispute
  misuse, false/swatting alarms, vigilante mobs; a mitigation for each; schema &
  permissions designed from it. *(Not started — needs a dedicated doc. Highest-priority
  remaining item.)*
- [x] **Restrained hero / how-it-works copy** — hero is now "coordination beats chaos";
  "report, don't approach" appears in the main funnel (hero pill + how-it-works callout),
  not just a policy page.
- [x] **Stop claiming automatic police handoff** — reworded everywhere to "prepare a
  structured summary a coordinator can share with police"; "call 999 / 112" promoted into
  the hero, how-it-works, demo disclaimer, and match result.
- [x] **NGO lines clearly aspirational** — volunteer page and safeguarding page now state
  partnerships (Kenya Red Cross etc.) are wanted, not in place.
- [x] **Volunteer form labelled preview** — visible banner: nothing sent/stored, phone
  number never leaves the device.

## P1 — before launch

- [x] **Privacy link conflict fixed** — header "Privacy" now points to `/privacy`
  (canonical); the on-page section is relabelled "Safety" (`/#trust`).
- [x] **One standard header on every page** — landing now uses the shared `SiteNav`;
  Safeguarding & Disclaimer surfaced in the mobile menu (beyond footer).
- [x] **Anchors verified** — nav targets `/#how` and `/#trust` exist; removed dangling
  `#problem` / `#stack` nav items.
- [x] **About section added** — who we are, mission, real contact emails.
- [x] **Metrics relabelled as targets** — caption under the hero stats: "design targets,
  not yet independently measured."
- [x] **Demo disclaimer persistent** — a "simulated, nothing stored, call 999/112" banner
  shows on every demo step, not just the intro.
- [ ] **SMS/USSD scope decision** — affects backend architecture; make WhatsApp fallback
  first-class. *(Decision pending — documented in V2 plan §3.4.)*
- [ ] **Throttled "Slow 3G" performance pass** — keep landing under ~1MB. *(Pending; note:
  Leaflet tiles load only on the demo, landing stays light.)*

## P2 — polish

- [ ] Automated accessibility pass (axe/Lighthouse); contrast + form labels; keyboard-only
  demo. *(Pending.)*
- [x] Removed the `maximum-scale=5` zoom cap.
- [ ] Add `og:image` (1200×630) + `summary_large_image`. *(Pending — needs an asset.)*
- [ ] Confirm `safezone.app` domain + the email inboxes actually work. *(Pending — external.)*
- [ ] Check favicon, 404 page, `/demo` deep-link behaviour. *(Pending.)*

---

## Related
- `DESIGN_TOKENS.md` — the colour system (implemented).
- `V2_BUILD_PLAN.md` — full roadmap + session logs.
- Source files from the collaborator: `SafeZone-action-checklist.md`,
  `SafeZone-color-palette.md`, `SafeZone-feedback-and-backlog.md`.
