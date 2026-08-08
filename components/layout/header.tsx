"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Gauge, Menu, Phone, Search, X } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { clusterMeta, services, type ServiceCluster } from "@/lib/services";
import { company } from "@/lib/constants";
import { cn } from "@/lib/cn";

const navLinks = [
  { href: "/leistungen/webdesign", label: "Webdesign" },
  { href: "/agentur", label: "Agentur" },
  { href: "/ablauf", label: "Ablauf" },
  { href: "/pakete", label: "Pakete" },
  { href: "/magazin", label: "Magazin" },
];

const clusters: ServiceCluster[] = ["infrastruktur", "sichtbarkeit", "digitalisierung"];

const analyseItems = [
  {
    href: "/it-check",
    label: "IT-Check",
    description: "Kostenloser Selbsttest: Wie zukunftsfähig ist Ihre IT?",
    icon: Gauge,
  },
  {
    href: "/website-check",
    label: "Website-Check",
    description: "Performance, SEO & technische Basis Ihrer Webseite prüfen.",
    icon: Search,
  },
];

export function Header() {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isAnalyseOpen, setIsAnalyseOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const [lastPathname, setLastPathname] = useState(pathname);

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setIsMobileOpen(false);
    setIsServicesOpen(false);
    setIsAnalyseOpen(false);
  }

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-theme="dark"
      className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl transition-[height] duration-300 ease-out"
    >
      <Container
        size="wide"
        className={cn(
          "flex items-center justify-between transition-[height] duration-300 ease-out",
          isScrolled ? "h-16" : "h-20",
        )}
      >
        <Logo className={cn("origin-left transition-transform duration-300", isScrolled && "scale-90")} />

        <nav className="hidden items-center gap-2 lg:flex">
          <div
            className="relative"
            onMouseEnter={() => setIsServicesOpen(true)}
            onMouseLeave={() => setIsServicesOpen(false)}
            onKeyDown={(e) => {
              if (e.key === "Escape") setIsServicesOpen(false);
            }}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                setIsServicesOpen(false);
              }
            }}
          >
            <button
              className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-foreground/90 transition-colors hover:text-accent-secondary"
              aria-expanded={isServicesOpen}
              onFocus={() => setIsServicesOpen(true)}
              onClick={() => setIsServicesOpen(true)}
            >
              Leistungen
              <ChevronDown className={cn("size-4 transition-transform", isServicesOpen && "rotate-180")} />
            </button>

            {isServicesOpen ? (
              <div className="absolute left-1/2 top-full w-[640px] -translate-x-1/2 pt-3">
                <div className="grid grid-cols-3 gap-6 rounded-2xl border border-border bg-surface p-6 shadow-2xl shadow-black/40">
                  {clusters.map((cluster) => (
                    <div key={cluster}>
                      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-accent-secondary">
                        {clusterMeta[cluster].label}
                      </p>
                      <ul className="space-y-2">
                        {services
                          .filter((s) => s.cluster === cluster)
                          .map((service) => (
                            <li key={service.slug}>
                              <Link
                                href={`/leistungen/${service.slug}`}
                                className="text-sm text-muted transition-colors hover:text-foreground"
                              >
                                {service.shortName}
                              </Link>
                            </li>
                          ))}
                      </ul>
                    </div>
                  ))}
                  <div className="col-span-3 flex items-center justify-between border-t border-border pt-4">
                    <Link href="/leistungen" className="text-sm font-medium text-foreground hover:text-accent-secondary">
                      Alle Leistungen im Überblick →
                    </Link>
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          <div
            className="relative"
            onMouseEnter={() => setIsAnalyseOpen(true)}
            onMouseLeave={() => setIsAnalyseOpen(false)}
            onKeyDown={(e) => {
              if (e.key === "Escape") setIsAnalyseOpen(false);
            }}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                setIsAnalyseOpen(false);
              }
            }}
          >
            <button
              className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-foreground/90 transition-colors hover:text-accent-secondary"
              aria-expanded={isAnalyseOpen}
              onFocus={() => setIsAnalyseOpen(true)}
              onClick={() => setIsAnalyseOpen(true)}
            >
              Analyse
              <ChevronDown className={cn("size-4 transition-transform", isAnalyseOpen && "rotate-180")} />
            </button>

            {isAnalyseOpen ? (
              <div className="absolute left-1/2 top-full w-80 -translate-x-1/2 pt-3">
                <div className="flex flex-col gap-1 rounded-2xl border border-border bg-surface p-3 shadow-2xl shadow-black/40">
                  {analyseItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-surface-elevated"
                    >
                      <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent-secondary">
                        <item.icon className="size-4" />
                      </span>
                      <span>
                        <span className="block text-sm font-medium text-foreground">{item.label}</span>
                        <span className="block text-xs text-muted">{item.description}</span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-foreground/90 transition-colors hover:text-accent-secondary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={company.phoneHref}
            className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
          >
            <Phone className="size-4" />
            {company.phone}
          </a>
          <ThemeToggle />
          <Button href="/kontakt" size="md">
            Kontakt aufnehmen
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            className="relative flex size-9 items-center justify-center rounded-full border border-border text-foreground"
            aria-label={isMobileOpen ? "Menü schließen" : "Menü öffnen"}
            onClick={() => setIsMobileOpen((v) => !v)}
          >
            <Menu
              className={cn(
                "absolute size-5 transition-all duration-300",
                isMobileOpen ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100",
              )}
            />
            <X
              className={cn(
                "absolute size-5 transition-all duration-300",
                isMobileOpen ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0",
              )}
            />
          </button>
        </div>
      </Container>

      <div
        className={cn(
          "grid transition-all duration-300 ease-out lg:hidden",
          isMobileOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
        inert={!isMobileOpen}
      >
        <div className="overflow-hidden">
          <div className="border-t border-border bg-background px-6 pb-8 pt-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-accent-secondary">
              Leistungen
            </p>
            <ul className="mb-6 grid grid-cols-1 gap-1">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/leistungen/${service.slug}`}
                    className="block rounded-lg px-2 py-2 text-sm text-muted hover:bg-surface hover:text-foreground"
                  >
                    {service.shortName}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-accent-secondary">Analyse</p>
            <ul className="mb-6 grid grid-cols-1 gap-1">
              {analyseItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block rounded-lg px-2 py-2 text-sm text-muted hover:bg-surface hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-1 border-t border-border pt-4">
              {[{ href: "/leistungen", label: "Alle Leistungen" }, ...navLinks, { href: "/faq", label: "FAQ" }].map(
                (link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-lg px-2 py-2.5 text-base font-medium text-foreground hover:bg-surface"
                  >
                    {link.label}
                  </Link>
                ),
              )}
            </div>
            <div className="mt-6 flex flex-col gap-3">
              <a href={company.phoneHref} className="flex items-center gap-2 text-sm text-muted">
                <Phone className="size-4" />
                {company.phone}
              </a>
              <Button href="/kontakt" size="lg" className="w-full">
                Kontakt aufnehmen
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
