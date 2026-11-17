import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, MapPin } from "lucide-react";
import { cn } from "@/lib/cn";
import type { Referenz } from "@/lib/referenzen";

/** Desktop-Screenshot im Browserfenster, davor der Handy-Screenshot. */
export function ReferenzScreens({ referenz, className }: { referenz: Referenz; className?: string }) {
  return (
    <div className={cn("relative pb-10 pr-10 sm:pb-12 sm:pr-14", className)}>
      <div className="overflow-hidden rounded-xl border border-border-strong bg-surface shadow-2xl shadow-black/30">
        <div className="flex items-center gap-2 border-b border-border bg-surface-elevated px-3 py-2">
          <span className="size-2 rounded-full bg-border-strong" />
          <span className="size-2 rounded-full bg-border-strong" />
          <span className="size-2 rounded-full bg-border-strong" />
          <span className="ml-2 truncate text-[11px] text-muted">{referenz.domain}</span>
        </div>
        <div className="relative aspect-[16/10]">
          <Image
            src={referenz.bilder.desktop}
            alt={`Startseite von ${referenz.kunde} am Desktop`}
            fill
            className="object-cover object-top"
            sizes="(min-width: 1024px) 640px, 100vw"
          />
        </div>
      </div>
      <div className="absolute bottom-0 right-0 w-[26%] min-w-[96px] overflow-hidden rounded-[1.2rem] border-[5px] border-neutral-800 bg-surface shadow-2xl">
        <div className="relative aspect-[585/996]">
          <Image
            src={referenz.bilder.mobile}
            alt={`Startseite von ${referenz.kunde} auf dem Smartphone`}
            fill
            className="object-cover object-top"
            sizes="180px"
          />
        </div>
      </div>
    </div>
  );
}

/** Ausführliche Darstellung eines Projekts für die Referenzseite. */
export function ReferenzDetail({ referenz, reverse = false }: { referenz: Referenz; reverse?: boolean }) {
  return (
    <article className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
      <ReferenzScreens referenz={referenz} className={cn("lg:sticky lg:top-28", reverse && "lg:order-2")} />
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-accent-secondary">{referenz.branche}</p>
        <h2 className="mt-2 font-display text-3xl font-bold text-foreground">{referenz.kunde}</h2>
        <p className="mt-2 flex items-center gap-1.5 text-sm text-muted">
          <MapPin className="size-4 text-accent-secondary" />
          {referenz.ort}
        </p>
        <p className="mt-5 text-base leading-relaxed text-muted">{referenz.kurz}</p>

        <dl className="mt-6 grid grid-cols-3 gap-3">
          {referenz.eckdaten.map((e) => (
            <div key={e.label} className="rounded-xl border border-border bg-surface p-3">
              <dt className="sr-only">{e.label}</dt>
              <dd className="font-display text-xl font-bold text-foreground">{e.wert}</dd>
              <dd className="mt-0.5 hyphens-auto break-words text-xs leading-snug text-muted" lang="de">{e.label}</dd>
            </div>
          ))}
        </dl>

        <h3 className="mt-8 font-display text-lg font-semibold text-foreground">Ausgangslage</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{referenz.ausgangslage}</p>

        <h3 className="mt-6 font-display text-lg font-semibold text-foreground">Was wir umgesetzt haben</h3>
        <ul className="mt-3 space-y-2.5">
          {referenz.umsetzung.map((punkt) => (
            <li key={punkt} className="flex gap-3 text-sm leading-relaxed text-muted">
              <Check className="mt-0.5 size-4 shrink-0 text-accent-secondary" />
              {punkt}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href={referenz.url}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-accent to-accent-secondary px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Website ansehen <ArrowUpRight className="size-4" />
          </a>
          {referenz.leistungen.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-full border border-border-strong px-3 py-1.5 text-xs text-foreground hover:border-accent-secondary/60"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}

/** Alte und neue Startseite am Handy nebeneinander, beide frei scrollbar. */
export function VorherNachher({ referenz }: { referenz: Referenz }) {
  if (!referenz.vergleich) return null;
  const seiten = [
    { label: "Vorher", hinweis: "Die alte Website", bild: referenz.vergleich.vorher, akzent: false },
    { label: "Nachher", hinweis: "Die neue Website", bild: referenz.vergleich.nachher, akzent: true },
  ];
  return (
    <div className="mt-16">
      <h3 className="text-center font-display text-2xl font-bold text-foreground">Vorher und nachher</h3>
      <p className="mx-auto mt-2 max-w-xl text-center text-sm text-muted">
        Die Startseite auf dem Smartphone – scrollen Sie in beiden Geräten durch die ganze Seite.
      </p>
      <div className="mt-8 flex flex-wrap items-start justify-center gap-6 sm:gap-10">
        {seiten.map((seite) => (
          <figure key={seite.label} className="w-[min(100%,280px)]">
            <figcaption className="mb-3 flex items-center justify-center gap-2">
              <span
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider",
                  seite.akzent ? "bg-accent-secondary text-white" : "border border-border-strong text-muted",
                )}
              >
                {seite.label}
              </span>
              <span className="text-xs text-muted">{seite.hinweis}</span>
            </figcaption>
            <div className="rounded-[1.8rem] border-[6px] border-neutral-800 bg-neutral-800 shadow-2xl">
              <div
                className="h-[520px] overflow-y-auto overscroll-contain rounded-[1.3rem] bg-white"
                tabIndex={0}
                aria-label={`${seite.hinweis} von ${referenz.kunde}, scrollbar`}
              >
                <Image
                  src={seite.bild.src}
                  alt={`${seite.hinweis} von ${referenz.kunde} auf dem Smartphone`}
                  width={seite.bild.width}
                  height={seite.bild.height}
                  className="block h-auto w-full"
                  sizes="280px"
                  unoptimized
                />
              </div>
            </div>
          </figure>
        ))}
      </div>
    </div>
  );
}

/** Kompakte Karte für Startseite und Webdesign-Seite. */
export function ReferenzKarte({ referenz }: { referenz: Referenz }) {
  return (
    <Link
      href={`/referenzen#${referenz.slug}`}
      className="group block rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-accent-secondary/50"
    >
      <ReferenzScreens referenz={referenz} />
      <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-accent-secondary">{referenz.branche}</p>
      <h3 className="mt-1 font-display text-xl font-semibold text-foreground">{referenz.kunde}</h3>
      <p className="mt-1 text-sm text-muted">{referenz.ort}</p>
      <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-accent-secondary group-hover:underline">
        Projekt ansehen <ArrowUpRight className="size-4" />
      </span>
    </Link>
  );
}
