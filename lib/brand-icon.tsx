/** Das "S"-Icon als JSX, geteilt zwischen app/icon.tsx und app/favicon.ico/route.ts. */
export function BrandIconMark({ fontSize }: { fontSize: number }) {
  return (
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
          fontSize,
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
  );
}
