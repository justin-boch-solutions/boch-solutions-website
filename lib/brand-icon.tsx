/** Das "S"-Icon als JSX, geteilt zwischen app/icon.tsx und app/favicon.ico/route.ts. */
/** radius 0 für das Apple-Touch-Icon: iOS rundet selbst ab und füllt transparente Ecken schwarz. */
export function BrandIconMark({ fontSize, radius = 14 }: { fontSize: number; radius?: number }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#05060a",
        borderRadius: radius,
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
