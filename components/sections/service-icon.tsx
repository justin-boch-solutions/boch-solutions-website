import {
  BadgeCheck,
  Cloud,
  Code2,
  Globe,
  LayoutTemplate,
  LifeBuoy,
  Mail,
  MapPin,
  ShieldCheck,
  TrendingUp,
  Workflow,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Cloud,
  BadgeCheck,
  Mail,
  Globe,
  LifeBuoy,
  ShieldCheck,
  TrendingUp,
  MapPin,
  LayoutTemplate,
  Code2,
  Workflow,
};

export function ServiceIcon({ name, className }: { name: string; className?: string }) {
  const Icon = iconMap[name] ?? Cloud;
  return <Icon className={className} />;
}
