import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { Container } from "@/components/ui/container";
import { CookieSettingsLink } from "@/components/consent/cookie-settings-link";
import { addressLine, company } from "@/lib/constants";
import { clusterMeta, services, type ServiceCluster } from "@/lib/services";

const clusters: ServiceCluster[] = ["infrastruktur", "sichtbarkeit", "digitalisierung"];

const companyLinks = [
  { href: "/agentur", label: "Agentur" },
  { href: "/ablauf", label: "Ablauf" },
  { href: "/pakete", label: "Pakete" },
  { href: "/magazin", label: "Magazin" },
  { href: "/faq", label: "FAQ" },
  { href: "/kontakt", label: "Kontakt" },
  { href: "/support", label: "Support (Bestandskunden)" },
];

export function Footer() {
  return (
    <footer data-theme="dark" className="border-t border-border bg-surface">
      <Container className="py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Logo size="large" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
              IT-Modernisierung, Sichtbarkeit und individuelle Software für Handwerksbetriebe – auf
              Basis von Microsoft-Technologie.
            </p>
            <div className="mt-6 space-y-3 text-sm text-muted">
              <a href={company.phoneHref} className="flex items-center gap-2 hover:text-foreground">
                <Phone className="size-4 shrink-0" />
                {company.phone}
              </a>
              <a href={company.emailHref} className="flex items-center gap-2 hover:text-foreground">
                <Mail className="size-4 shrink-0" />
                {company.email}
              </a>
              <a
                href={company.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-foreground"
              >
                <MessageCircle className="size-4 shrink-0" />
                WhatsApp
              </a>
              <p className="flex items-center gap-2">
                <MapPin className="size-4 shrink-0" />
                {addressLine}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {clusters.map((cluster) => (
              <div key={cluster}>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-accent-secondary">
                  {clusterMeta[cluster].label.split(" ")[0]}
                </p>
                <ul className="space-y-2">
                  {services
                    .filter((s) => s.cluster === cluster)
                    .map((service) => (
                      <li key={service.slug}>
                        <Link
                          href={`/leistungen/${service.slug}`}
                          className="text-sm text-muted hover:text-foreground"
                        >
                          {service.shortName}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            ))}

            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-accent-secondary">
                Unternehmen
              </p>
              <ul className="space-y-2">
                {companyLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-muted hover:text-foreground">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-border pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {company.legalName}. Alle Rechte vorbehalten.
          </p>
          <div className="flex gap-6">
            <Link href="/impressum" className="hover:text-foreground">
              Impressum
            </Link>
            <Link href="/datenschutz" className="hover:text-foreground">
              Datenschutz
            </Link>
            <Link href="/agb" className="hover:text-foreground">
              AGB
            </Link>
            <CookieSettingsLink className="hover:text-foreground" />
          </div>
        </div>
      </Container>
    </footer>
  );
}
