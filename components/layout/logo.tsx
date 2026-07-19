import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

export function Logo({
  className,
  size = "default",
}: {
  className?: string;
  size?: "default" | "large";
}) {
  return (
    <Link
      href="/"
      className={cn("inline-flex items-center transition-transform duration-200 hover:scale-[1.03]", className)}
      aria-label="JB Solutions – Startseite"
    >
      <Image
        src="/images/logo.svg"
        alt="Justin Boch Solutions"
        width={430}
        height={200}
        priority
        unoptimized
        className={cn("w-auto", size === "large" ? "h-16 sm:h-20" : "h-12 sm:h-14")}
      />
    </Link>
  );
}
