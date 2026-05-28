import { LegalShell, Section, Bullets } from "@/components/LegalShell";

export const metadata = { title: "Privacy Policy — SafeZone" };

export default function PrivacyPage() {
  return (
    <LegalShell
      title="Privacy Policy"
      updated="May 2026"
      intro="SafeZone handles sensitive information about children and families. We collect the minimum we need, protect it carefully, and delete it as soon as it's no longer needed."
    >
      <Section heading="What we collect">
        <Bullets
          items={[
            "Account: a hashed version of your phone number (never the plaintext) and the last 4 digits for display.",
            "Child profiles: age, physical description, and clothing — encrypted before storage. Photos are never uploaded to our servers; only a mathematical hash stays on your device.",
            "Alerts & sightings: location of last-seen and reported sightings, and the text of witness reports.",
            "Volunteer details: languages you speak and the areas you choose to respond in.",
          ]}
        />
      </Section>

      <Section heading="What we never do">
        <Bullets
          items={[
            "We never store a child's photo on our servers.",
            "We never sell, rent, or share your data with advertisers.",
            "We never expose a parent's full phone number to volunteers or the public.",
            "We never keep alert data longer than needed — active alerts expire in 24 hours.",
          ]}
        />
      </Section>

      <Section heading="How long we keep data">
        <p>
          Active alerts auto-expire after 24 hours. Resolved alerts and their sighting text are
          pruned on a rolling schedule. Police notifications are kept in a permanent, access-controlled
          audit log for accountability — this is the one record we deliberately retain, because a
          child-safety system must be auditable.
        </p>
      </Section>

      <Section heading="Your rights">
        <p>
          Under the Kenya Data Protection Act (2019) you can request access to your data, ask us to
          correct it, or ask us to delete it. Contact us and we will respond within the timeframe the
          law requires.
        </p>
      </Section>

      <Section heading="Where your data lives">
        <p>
          Data is stored with reputable cloud providers using encryption in transit and at rest.
          Before any real-world deployment, we will register with Kenya&apos;s Office of the Data
          Protection Commissioner and complete a Data Protection Impact Assessment.
        </p>
      </Section>

      <Section heading="Contact">
        <p>
          Questions about your privacy? Email{" "}
          <a href="mailto:privacy@safezone.app" className="text-brand-300 underline underline-offset-2">
            privacy@safezone.app
          </a>
          .
        </p>
      </Section>
    </LegalShell>
  );
}
