import { Bell, LayoutGrid, Mail, Search, Shield, Users } from "lucide-react";
import { cn } from "@/lib/cn";

const navItems = [
  { icon: LayoutGrid, label: "Start", active: true },
  { icon: Users, label: "Benutzer" },
  { icon: Mail, label: "Exchange" },
  { icon: Shield, label: "Sicherheit" },
];

const users = [
  { name: "M. Hausmann", role: "Geschäftsführung", status: "Aktiv" },
  { name: "J. Nottbeck", role: "Bauleitung", status: "Aktiv" },
  { name: "S. Reimann", role: "Buchhaltung", status: "Aktiv" },
];

export function CloudDiagram({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border-strong bg-surface shadow-2xl shadow-black/30",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-border bg-surface-elevated px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-border-strong" />
        <span className="size-2.5 rounded-full bg-border-strong" />
        <span className="size-2.5 rounded-full bg-border-strong" />
        <span className="ml-2 truncate text-xs text-muted">admin.microsoft.com</span>
      </div>

      <div className="flex h-full">
        <div className="hidden w-32 shrink-0 flex-col gap-1 border-r border-border bg-background/40 p-3 sm:flex">
          <p className="mb-1 px-2 text-[11px] font-semibold uppercase tracking-wide text-muted">Microsoft 365</p>
          {navItems.map((item) => (
            <div
              key={item.label}
              className={cn(
                "flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs",
                item.active ? "bg-accent/15 text-accent-secondary" : "text-muted",
              )}
            >
              <item.icon className="size-3.5 shrink-0" />
              {item.label}
            </div>
          ))}
        </div>

        <div className="flex-1 p-4">
          <div className="flex items-center justify-between">
            <p className="font-display text-sm font-semibold text-foreground">Aktive Benutzer</p>
            <div className="flex items-center gap-2 text-muted">
              <Search className="size-3.5" />
              <Bell className="size-3.5" />
            </div>
          </div>

          <div className="mt-3 space-y-2">
            {users.map((user) => (
              <div
                key={user.name}
                className="flex items-center justify-between rounded-lg border border-border bg-surface-elevated px-3 py-2"
              >
                <div className="flex items-center gap-2">
                  <div className="flex size-6 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-secondary text-[10px] font-semibold text-white">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-medium text-foreground">{user.name}</p>
                    <p className="text-[10px] text-muted">{user.role}</p>
                  </div>
                </div>
                <span className="rounded-full bg-green-500/15 px-2 py-0.5 text-[10px] font-medium text-green-400">
                  {user.status}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-3 flex items-center gap-2 rounded-lg border border-border-strong bg-surface-elevated px-3 py-2 text-[11px] text-muted">
            <Shield className="size-3.5 text-accent-secondary" />
            12 / 12 Lizenzen aktiv &middot; Backup läuft
          </div>
        </div>
      </div>
    </div>
  );
}
