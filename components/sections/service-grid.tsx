import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { ServiceIcon } from "@/components/sections/service-icon";
import type { Service } from "@/lib/services";

export function ServiceGrid({ services }: { services: Service[] }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service, index) => (
        <Reveal key={service.slug} delay={(index % 3) * 90} className="h-full">
          <Link href={`/leistungen/${service.slug}`} className="block h-full">
            <Card className="flex h-full flex-col">
              <div className="mb-4 inline-flex size-11 items-center justify-center rounded-lg bg-gradient-to-br from-accent/20 to-accent-secondary/20 text-accent-secondary">
                <ServiceIcon name={service.icon} className="size-5" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground">{service.shortName}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{service.shortDescription}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent-secondary opacity-0 transition-opacity group-hover:opacity-100">
                Mehr erfahren <ArrowUpRight className="size-4" />
              </span>
            </Card>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
