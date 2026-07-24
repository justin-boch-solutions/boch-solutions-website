import Image from "next/image";
import { cn } from "@/lib/cn";

interface HeroPhotoProps {
  src: string;
  alt: string;
  className?: string;
}

export function HeroPhoto({ src, alt, className }: HeroPhotoProps) {
  return (
    <div
      className={cn(
        "relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border-strong shadow-2xl shadow-black/30",
        className,
      )}
    >
      <Image src={src} alt={alt} fill className="object-cover" sizes="(min-width: 1024px) 480px, 100vw" />
    </div>
  );
}
