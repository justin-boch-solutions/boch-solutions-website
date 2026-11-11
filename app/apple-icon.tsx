import { ImageResponse } from "next/og";
import { BrandIconMark } from "@/lib/brand-icon";

// Icon für "Zum Home-Bildschirm" auf iPhone/iPad. Next.js setzt daraus
// <link rel="apple-touch-icon"> in jede Seite. 180 × 180 ist Apples Vorgabe.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(<BrandIconMark fontSize={110} radius={0} />, { ...size });
}
