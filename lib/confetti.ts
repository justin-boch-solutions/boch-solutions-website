const COLORS = ["#8c52ff", "#5ce0e6", "#4f7dff", "#ffffff"];

export function fireConfetti(count = 80) {
  if (typeof document === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.inset = "0";
  container.style.pointerEvents = "none";
  container.style.zIndex = "9999";
  container.style.overflow = "hidden";
  document.body.appendChild(container);

  for (let i = 0; i < count; i++) {
    const piece = document.createElement("span");
    const size = 6 + Math.random() * 6;
    const duration = 2.2 + Math.random() * 1.4;
    const delay = Math.random() * 0.4;

    piece.style.position = "absolute";
    piece.style.top = "-5vh";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.width = `${size}px`;
    piece.style.height = `${size * 0.4}px`;
    piece.style.backgroundColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    piece.style.borderRadius = "2px";
    piece.style.animationDuration = `${duration}s`;
    piece.style.animationDelay = `${delay}s`;
    piece.className = "animate-confetti-fall";

    container.appendChild(piece);
  }

  window.setTimeout(() => container.remove(), 4000);
}

export function fireConfettiRain(duration = 2500) {
  if (typeof window === "undefined") return;

  fireConfetti(60);
  const interval = window.setInterval(() => fireConfetti(30), 300);
  window.setTimeout(() => window.clearInterval(interval), duration);
}
