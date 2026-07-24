import { cn } from "@/lib/cn";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "default" | "wide";
}

export function Container({ className, children, size = "default", ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-6 lg:px-8",
        size === "wide" ? "max-w-[1440px]" : "max-w-6xl",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
