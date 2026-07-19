"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/cn";
import { themeStore } from "@/lib/theme-store";

export function ThemeToggle({ className }: { className?: string }) {
  const theme = useSyncExternalStore(
    themeStore.subscribe,
    themeStore.getSnapshot,
    themeStore.getServerSnapshot,
  );

  function toggleTheme() {
    themeStore.setTheme(theme === "light" ? "dark" : "light");
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === "light" ? "Dunkles Design aktivieren" : "Helles Design aktivieren"}
      className={cn(
        "relative flex size-9 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-accent-secondary/60 hover:text-white",
        className,
      )}
    >
      <Sun
        className={cn(
          "absolute size-4 transition-all duration-300",
          theme === "light" ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0",
        )}
      />
      <Moon
        className={cn(
          "absolute size-4 transition-all duration-300",
          theme === "dark" ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-0 opacity-0",
        )}
      />
    </button>
  );
}
