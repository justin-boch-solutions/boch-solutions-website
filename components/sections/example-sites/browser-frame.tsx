interface BrowserFrameProps {
  url: string;
  children: React.ReactNode;
  height?: string;
}

export function BrowserFrame({ url, children, height = "480px" }: BrowserFrameProps) {
  return (
    <div className="mx-auto max-w-2xl overflow-hidden rounded-2xl border border-border-strong bg-surface shadow-2xl shadow-black/30">
      <div className="flex items-center gap-3 border-b border-border bg-surface-elevated px-4 py-3">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-red-400/70" />
          <span className="size-2.5 rounded-full bg-amber-400/70" />
          <span className="size-2.5 rounded-full bg-emerald-400/70" />
        </div>
        <div className="flex-1 truncate rounded-full bg-background px-3 py-1 text-center text-xs text-muted">
          {url}
        </div>
      </div>
      <div className="overflow-y-auto overscroll-contain" style={{ height }}>
        {children}
      </div>
    </div>
  );
}
