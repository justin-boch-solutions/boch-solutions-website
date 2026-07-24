"use client";

import { useState, type FormEvent } from "react";
import { Send, ShoppingCart, Star, Trash2, Truck, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { BrowserFrame } from "./browser-frame";

const categories = ["Alle", "Schrauben", "Beschläge", "Werkzeug"] as const;

interface Product {
  name: string;
  price: number;
  category: (typeof categories)[number];
  tone: string;
  rating: number;
  sale?: boolean;
}

const products: Product[] = [
  { name: "Scharnier-Set (4-teilig)", price: 12.9, category: "Beschläge", tone: "from-stone-200 to-stone-300", rating: 5 },
  { name: "Torx-Schrauben 100er Pack", price: 6.5, category: "Schrauben", tone: "from-slate-200 to-slate-300", rating: 4, sale: true },
  { name: "Akku-Schrauber Bit-Set", price: 24.9, category: "Werkzeug", tone: "from-emerald-100 to-emerald-200", rating: 5 },
  { name: "Türband verzinkt", price: 8.2, category: "Beschläge", tone: "from-stone-200 to-stone-300", rating: 4 },
  { name: "Holzschrauben 4x40mm", price: 4.9, category: "Schrauben", tone: "from-slate-200 to-slate-300", rating: 4, sale: true },
  { name: "Wasserwaage 60cm", price: 16.9, category: "Werkzeug", tone: "from-emerald-100 to-emerald-200", rating: 5 },
];

function formatPrice(value: number) {
  return `${value.toFixed(2).replace(".", ",")} €`;
}

export function ShopExample() {
  const [category, setCategory] = useState<(typeof categories)[number]>("Alle");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [newsletterDone, setNewsletterDone] = useState(false);

  const filtered = category === "Alle" ? products : products.filter((p) => p.category === category);
  const cartEntries = Object.entries(cart).filter(([, qty]) => qty > 0);
  const cartCount = cartEntries.reduce((sum, [, qty]) => sum + qty, 0);
  const cartTotal = cartEntries.reduce((sum, [name, qty]) => {
    const product = products.find((p) => p.name === name);
    return sum + (product ? product.price * qty : 0);
  }, 0);

  function addToCart(name: string) {
    setCart((prev) => ({ ...prev, [name]: (prev[name] ?? 0) + 1 }));
  }

  function removeFromCart(name: string) {
    setCart((prev) => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }

  function handleNewsletter(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNewsletterDone(true);
  }

  return (
    <BrowserFrame url="beschlagteile24-beispiel.de" height="560px">
      <div className="flex items-center justify-center gap-2 bg-neutral-900 px-6 py-2 text-center text-[11px] text-neutral-300">
        <Truck className="size-3.5" />
        Kostenloser Versand ab 30 € Bestellwert
      </div>

      <nav className="sticky top-0 z-10 flex items-center justify-between border-b border-neutral-200 bg-white px-6 py-4">
        <span className="font-bold text-neutral-900">Beschlagteile24</span>
        <button
          onClick={() => setCartOpen((v) => !v)}
          className="flex items-center gap-2 rounded-full bg-neutral-100 px-3 py-1.5 text-sm text-neutral-700"
        >
          <ShoppingCart className="size-4" />
          {cartCount}
        </button>
      </nav>

      {cartOpen ? (
        <div className="border-b border-neutral-200 bg-neutral-50 px-6 py-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-neutral-900">Warenkorb</p>
            <button onClick={() => setCartOpen(false)} aria-label="Warenkorb schließen" className="text-neutral-400">
              <X className="size-4" />
            </button>
          </div>
          {cartEntries.length === 0 ? (
            <p className="mt-3 text-sm text-neutral-500">Noch keine Artikel im Warenkorb.</p>
          ) : (
            <div className="mt-3 space-y-2">
              {cartEntries.map(([name, qty]) => {
                const product = products.find((p) => p.name === name);
                return (
                  <div key={name} className="flex items-center justify-between text-sm">
                    <span className="text-neutral-700">
                      {qty} × {name}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-neutral-900">
                        {product ? formatPrice(product.price * qty) : ""}
                      </span>
                      <button
                        onClick={() => removeFromCart(name)}
                        aria-label={`${name} entfernen`}
                        className="text-neutral-400 hover:text-red-500"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
              <div className="flex items-center justify-between border-t border-neutral-200 pt-2 text-sm font-semibold text-neutral-900">
                <span>Gesamt</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
            </div>
          )}
        </div>
      ) : null}

      <div className="flex gap-5 bg-white px-6 py-6">
        <div className="hidden w-32 shrink-0 sm:block">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">Kategorie</p>
          <div className="mt-3 flex flex-col gap-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={cn(
                  "rounded-md px-2 py-1.5 text-left text-xs font-medium transition-colors",
                  category === cat ? "bg-emerald-700 text-white" : "text-neutral-600 hover:bg-neutral-100",
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1">
          <div className="mb-3 flex items-center justify-between sm:hidden">
            <div className="flex gap-1.5 overflow-x-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={cn(
                    "shrink-0 rounded-full px-3 py-1 text-xs font-medium",
                    category === cat ? "bg-emerald-700 text-white" : "bg-neutral-100 text-neutral-600",
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {filtered.map((product) => (
              <div key={product.name} className="overflow-hidden rounded-xl border border-neutral-200">
                <div className={cn("relative flex aspect-[4/3] items-center justify-center bg-gradient-to-br", product.tone)}>
                  {product.sale ? (
                    <span className="absolute left-2 top-2 rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-semibold text-white">
                      Sale
                    </span>
                  ) : null}
                </div>
                <div className="p-3">
                  <p className="text-xs font-medium text-neutral-900">{product.name}</p>
                  <div className="mt-1 flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={cn("size-3", i < product.rating ? "fill-amber-400 text-amber-400" : "text-neutral-200")}
                      />
                    ))}
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-sm font-semibold text-neutral-900">{formatPrice(product.price)}</span>
                    <button
                      onClick={() => addToCart(product.name)}
                      aria-label={`${product.name} in den Warenkorb legen`}
                      className="rounded-full bg-emerald-700 px-3 py-1 text-xs font-medium text-white"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-neutral-900 px-6 py-10 text-white">
        {newsletterDone ? (
          <p className="text-sm text-emerald-300">Danke, Sie sind angemeldet (Beispiel, kein echter Versand).</p>
        ) : (
          <form onSubmit={handleNewsletter} className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <p className="text-sm text-neutral-300 sm:mr-4">Neue Artikel per Newsletter erfahren:</p>
            <div className="flex flex-1 gap-2">
              <input
                type="email"
                placeholder="E-Mail-Adresse"
                required
                className="w-full flex-1 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm placeholder:text-neutral-500"
              />
              <button
                type="submit"
                className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white"
              >
                <Send className="size-4" />
              </button>
            </div>
          </form>
        )}
        <p className="mt-4 text-xs text-neutral-500">
          Beschlagteile24 · Beispiel-Onlineshop, keine echte Bestellung möglich.
        </p>
      </div>
    </BrowserFrame>
  );
}
