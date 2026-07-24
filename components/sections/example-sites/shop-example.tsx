"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { cn } from "@/lib/cn";
import { BrowserFrame } from "./browser-frame";

const categories = ["Alle", "Schrauben", "Beschläge", "Werkzeug"];

const products = [
  { name: "Scharnier-Set (4-teilig)", price: "12,90 €", category: "Beschläge" },
  { name: "Torx-Schrauben 100er Pack", price: "6,50 €", category: "Schrauben" },
  { name: "Akku-Schrauber Bit-Set", price: "24,90 €", category: "Werkzeug" },
  { name: "Türband verzinkt", price: "8,20 €", category: "Beschläge" },
  { name: "Holzschrauben 4x40mm", price: "4,90 €", category: "Schrauben" },
  { name: "Wasserwaage 60cm", price: "16,90 €", category: "Werkzeug" },
];

export function ShopExample() {
  const [category, setCategory] = useState("Alle");
  const [cartCount, setCartCount] = useState(0);

  const filtered = category === "Alle" ? products : products.filter((p) => p.category === category);

  return (
    <BrowserFrame url="beschlagteile24-beispiel.de">
      <nav className="sticky top-0 z-10 flex items-center justify-between border-b border-neutral-200 bg-white px-6 py-4">
        <span className="font-bold text-neutral-900">Beschlagteile24</span>
        <div className="flex items-center gap-2 rounded-full bg-neutral-100 px-3 py-1.5 text-sm text-neutral-700">
          <ShoppingCart className="size-4" />
          {cartCount}
        </div>
      </nav>

      <div className="bg-gradient-to-br from-emerald-800 to-emerald-600 px-6 py-12 text-white">
        <p className="text-xs font-semibold uppercase tracking-wider text-emerald-200">Online-Shop</p>
        <h2 className="mt-2 text-2xl font-bold">Ersatzteile & Beschläge direkt bestellen</h2>
        <p className="mt-2 max-w-sm text-sm text-emerald-100">
          Versand innerhalb von 24 Stunden, auch für Kleinmengen.
        </p>
      </div>

      <div className="bg-white px-6 py-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={cn(
                "rounded-full px-4 py-1.5 text-xs font-medium transition-colors",
                category === cat ? "bg-emerald-700 text-white" : "bg-neutral-100 text-neutral-600",
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {filtered.map((product) => (
            <div key={product.name} className="rounded-xl border border-neutral-200 p-3">
              <div className="aspect-square rounded-lg bg-gradient-to-br from-neutral-100 to-neutral-200" />
              <p className="mt-3 text-xs font-medium text-neutral-900">{product.name}</p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-sm font-semibold text-neutral-900">{product.price}</span>
                <button
                  onClick={() => setCartCount((c) => c + 1)}
                  aria-label={`${product.name} in den Warenkorb legen`}
                  className="rounded-full bg-emerald-700 px-3 py-1 text-xs font-medium text-white"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-neutral-900 px-6 py-8 text-xs text-neutral-400">
        Beschlagteile24 · Beispiel-Onlineshop, keine echte Bestellung möglich.
      </div>
    </BrowserFrame>
  );
}
