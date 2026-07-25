import { MessageCircle, Phone } from "lucide-react";
import { company } from "@/lib/constants";

export function StickyMobileCta() {
  return (
    <div
      data-theme="dark"
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-px overflow-hidden border-t border-border bg-border/50 lg:hidden"
    >
      <a
        href={company.phoneHref}
        className="flex items-center justify-center gap-1.5 bg-background/95 px-2 py-3.5 text-xs font-medium text-foreground backdrop-blur-xl sm:gap-2 sm:text-sm"
      >
        <Phone className="size-4 text-accent-secondary" />
        Anrufen
      </a>
      <a
        href={company.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-1.5 bg-background/95 px-2 py-3.5 text-xs font-medium text-foreground backdrop-blur-xl sm:gap-2 sm:text-sm"
      >
        <MessageCircle className="size-4 text-accent-secondary" />
        WhatsApp
      </a>
    </div>
  );
}
