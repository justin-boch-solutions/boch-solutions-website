import Link from "next/link";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "md" | "lg";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-accent to-accent-secondary text-white shadow-[0_0_0_1px_rgba(255,255,255,0.08)_inset] hover:brightness-110 focus-visible:brightness-110",
  secondary:
    "bg-surface-elevated text-foreground border border-border-strong hover:border-accent-secondary/60 hover:bg-surface-elevated/80",
  ghost: "text-foreground hover:text-accent-secondary",
};

const sizeStyles: Record<ButtonSize, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
}

type ButtonAsLink = BaseProps & { href: string } & Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    "href" | "className"
  >;
type ButtonAsButton = BaseProps & { href?: undefined } & Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "className"
  >;

type ButtonProps = ButtonAsLink | ButtonAsButton;

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 whitespace-nowrap hover:scale-[1.03] active:scale-[0.98]";

export function Button({ variant = "primary", size = "md", className, children, ...props }: ButtonProps) {
  const styles = cn(baseStyles, variantStyles[variant], sizeStyles[size], className);

  if ("href" in props && props.href) {
    const { href, ...rest } = props as ButtonAsLink;
    return (
      <Link href={href} className={styles} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button className={styles} {...(props as ButtonAsButton)}>
      {children}
    </button>
  );
}
