import { createElement } from "react";
import { ImageResponse } from "next/og";
import { BrandIconMark } from "@/lib/brand-icon";

/**
 * iOS und viele Website-Prüftools fragen das Touch-Icon unter diesem festen
 * Pfad ab, ohne <link rel="apple-touch-icon"> zu lesen. app/apple-icon.tsx
 * liefert es nur unter /apple-icon aus – hier dasselbe Motiv unter dem
 * klassischen Pfad (gleiches Muster wie app/favicon.ico/route.ts).
 */
export async function GET() {
  const image = new ImageResponse(createElement(BrandIconMark, { fontSize: 110, radius: 0 }), {
    width: 180,
    height: 180,
  });
  return new Response(image.body, {
    headers: { "Content-Type": "image/png", "Cache-Control": "public, max-age=86400" },
  });
}
