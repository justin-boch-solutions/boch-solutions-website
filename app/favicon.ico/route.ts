import { createElement } from "react";
import { ImageResponse } from "next/og";
import { BrandIconMark } from "@/lib/brand-icon";

/**
 * Next.js serves the generated icon at /icon, but browsers and Google both
 * still probe the classic /favicon.ico path directly and treat a 404 there
 * as "no icon" in some contexts. Serving the same mark here closes that gap
 * without a second, divergent icon design.
 *
 * Plain .ts, not .tsx: Next.js only recognizes "route" as a special file
 * convention under that exact name, so the JSX has to go through
 * createElement instead of JSX syntax.
 */
export async function GET() {
  const image = new ImageResponse(createElement(BrandIconMark, { fontSize: 14 }), {
    width: 32,
    height: 32,
  });
  return new Response(image.body, {
    headers: { "Content-Type": "image/png", "Cache-Control": "public, max-age=86400" },
  });
}
