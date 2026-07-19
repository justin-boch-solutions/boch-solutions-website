import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  name: string;
  href?: string;
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1.5 text-sm text-muted">
      {items.map((item, index) => (
        <span key={item.name} className="flex items-center gap-1.5">
          {index > 0 ? <ChevronRight className="size-3.5 shrink-0" /> : null}
          {item.href ? (
            <Link href={item.href} className="transition-colors hover:text-foreground">
              {item.name}
            </Link>
          ) : (
            <span className="text-foreground">{item.name}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
