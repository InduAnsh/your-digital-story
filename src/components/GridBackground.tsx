export default function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(var(--hero-foreground)) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      {/* Radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full opacity-20"
        style={{
          background: "radial-gradient(ellipse, hsl(var(--primary) / 0.15), transparent 70%)",
        }}
      />
      {/* Corner gradient accent */}
      <div
        className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, hsl(var(--accent) / 0.3), transparent 70%)",
        }}
      />
    </div>
  );
}
