import { LegalShell, Section, Bullets } from "@/components/LegalShell";

export const metadata = { title: "Safeguarding & Volunteer Code of Conduct — SafeZone" };

export default function SafeguardingPage() {
  return (
    <LegalShell
      title="Safeguarding & Code of Conduct"
      updated="May 2026"
      intro="Protecting children is the entire point of SafeZone. Every volunteer agrees to this code before they can respond to a live alert."
    >
      <Section heading="The volunteer code of conduct">
        <Bullets
          items={[
            "I will report sightings — I will not approach, follow, detain, or confront a child or any suspected person.",
            "I will let the police handle all physical recovery.",
            "I will only use information from an alert to help find that child, and never for any other purpose.",
            "I will not photograph, film, or publicly share details of a child or an active case.",
            "I will not raise false alarms or submit fake sightings — doing so endangers real children and may be reported to police.",
            "I will treat every family with dignity and respect, regardless of background.",
          ]}
        />
      </Section>

      <Section heading="How we keep the network safe">
        <Bullets
          items={[
            "Verification: every volunteer is reviewed by an NGO coordinator or the SafeZone team before going live.",
            "Rate limits: parents can trigger a limited number of alerts to prevent misuse.",
            "Audit trail: every police notification is permanently logged.",
            "Minimal exposure: volunteers see only what they need — never a parent's full contact details.",
          ]}
        />
      </Section>

      <Section heading="Reporting concerns">
        <p>
          If you see a volunteer behaving inappropriately, or you believe a child is being put at
          risk by misuse of the platform, tell us immediately at{" "}
          <a href="mailto:safeguarding@safezone.app" className="text-brand-300 underline underline-offset-2">
            safeguarding@safezone.app
          </a>
          . Reports are taken seriously and handled confidentially.
        </p>
      </Section>

      <Section heading="Working with NGOs">
        <p>
          We partner with established organisations — such as the Kenya Red Cross, activist networks,
          and children&apos;s homes — precisely because they already practise safeguarding. NGO partners
          approve their own volunteers, giving every alert a layer of human trust before it reaches
          the network.
        </p>
      </Section>
    </LegalShell>
  );
}
