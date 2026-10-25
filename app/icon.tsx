import { ImageResponse } from "next/og";
import { BrandIconMark } from "@/lib/brand-icon";

// Google's favicon guidelines want a square image sized as a multiple of 48px.
export const size = { width: 96, height: 96 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(<BrandIconMark fontSize={40} />, { ...size });
}
