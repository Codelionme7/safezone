import { LegalShell, Section, Bullets } from "@/components/LegalShell";

export const metadata = { title: "Disclaimer — SafeZone" };

export default function DisclaimerPage() {
  return (
    <LegalShell
      title="Disclaimer"
      updated="May 2026"
      intro="SafeZone is a tool that helps communities and police coordinate. It is not a replacement for emergency services, and its AI is assistive — never the final word."
    >
      <Section heading="Always contact the police">
        <p>
          If a child is missing or in danger, contact the police and official emergency services
          immediately. SafeZone is designed to work alongside them, not instead of them. In Kenya,
          dial <strong>999</strong> or <strong>112</strong>.
        </p>
      </Section>

      <Section heading="AI is assistive, not a decision-maker">
        <Bullets
          items={[
            "The match confidence score is a signal to help prioritise, not proof of identity.",
            "Police and verified coordinators make the final identification — never the algorithm.",
            "AI face- and text-matching can be less accurate for African faces and for low-resource local languages, because most models are trained on data that under-represents them. We disclose this openly.",
            "A high score can still be wrong. A low score can still be the child. Treat every result with human judgement.",
          ]}
        />
      </Section>

      <Section heading="Never approach a child yourself">
        <p>
          Volunteers report sightings — they do not attempt physical recovery. Approaching a child,
          or a suspected abductor, can put the child, bystanders, and you at risk, and can compromise
          a police operation. Report, share the location, and let the authorities act.
        </p>
      </Section>

      <Section heading="No guarantee of outcome">
        <p>
          SafeZone improves coordination and speed, but no system can guarantee a child is found.
          Delivery of alerts depends on networks, devices, and the availability of volunteers and
          police in your area.
        </p>
      </Section>

      <Section heading="MVP status">
        <p>
          This is an early preview. Some features shown in the demo are simulated. Do not rely on this
          preview for a real emergency.
        </p>
      </Section>
    </LegalShell>
  );
}
