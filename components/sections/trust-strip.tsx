import { MapPin, ShieldCheck, UserCheck, Cloud } from "lucide-react";
import { Container } from "@/components/ui/container";

const items = [
  { icon: MapPin, label: "Standort Münster, Betreuung im Umkreis" },
  { icon: Cloud, label: "Spezialisiert auf Microsoft 365 & Azure" },
  { icon: ShieldCheck, label: "DSGVO-bewusste IT-Einrichtung" },
  { icon: UserCheck, label: "Persönlicher Ansprechpartner statt Hotline" },
];

export function TrustStrip() {
  return (
    <div className="border-b border-border bg-surface/40 py-6">
      <Container className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-center">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-2 text-sm text-muted">
            <item.icon className="size-4 text-accent-secondary" />
            {item.label}
          </div>
        ))}
      </Container>
    </div>
  );
}
