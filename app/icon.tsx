import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#05060a",
          borderRadius: 14,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 40,
            fontWeight: 700,
            fontFamily: "sans-serif",
            backgroundImage: "linear-gradient(90deg, #8c52ff, #5ce0e6)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          S
        </div>
      </div>
    ),
    { ...size },
  );
}
