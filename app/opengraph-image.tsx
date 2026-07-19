import { ImageResponse } from "next/og";
import { company } from "@/lib/constants";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#05060a",
          backgroundImage:
            "radial-gradient(circle at 25% 15%, rgba(140,82,255,0.35), transparent 45%), radial-gradient(circle at 80% 80%, rgba(92,224,230,0.25), transparent 45%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            fontFamily: "sans-serif",
          }}
        >
          <span style={{ fontSize: 96, fontWeight: 700, color: "#8c52ff" }}>S</span>
          <span style={{ fontSize: 96, fontWeight: 700, color: "#ffffff" }}>OLUTIONS</span>
        </div>
        <div style={{ display: "flex", marginTop: 24, fontSize: 32, color: "#9aa3b2", fontFamily: "sans-serif" }}>
          {company.tagline}
        </div>
        <div style={{ display: "flex", marginTop: 8, fontSize: 24, color: "#5ce0e6", fontFamily: "sans-serif" }}>
          Microsoft 365 & Azure · SEO/GEO · Webdesign · Individuelle Software
        </div>
      </div>
    ),
    { ...size },
  );
}
