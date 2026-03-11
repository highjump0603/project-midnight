import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background: "linear-gradient(135deg, #050816 0%, #0f172a 55%, #132042 100%)",
          color: "#f8fafc",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 20% 20%, rgba(96, 165, 250, 0.18), transparent 24%), radial-gradient(circle at 82% 18%, rgba(250, 204, 21, 0.18), transparent 18%), radial-gradient(circle at 70% 75%, rgba(148, 163, 184, 0.16), transparent 22%)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            padding: "56px 64px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
              fontSize: 26,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#93c5fd",
            }}
          >
            <div
              style={{
                width: 18,
                height: 18,
                borderRadius: 999,
                background: "#f7d774",
                boxShadow: "0 0 18px rgba(247, 215, 116, 0.7)",
              }}
            />
            <span>Project Midnight</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 840 }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: 78,
                fontWeight: 700,
                lineHeight: 1.02,
              }}
            >
              <span>Full Stack Projects</span>
              <span>and Engineering Notes</span>
            </div>
            <div
              style={{
                display: "flex",
                maxWidth: 760,
              }}
            >
              <span style={{ fontSize: 30, lineHeight: 1.45, color: "#cbd5e1" }}>
                Portfolio, technical writing, and experiments built with Next.js, FastAPI,
                TypeScript, and Python.
              </span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: 24,
              color: "#94a3b8",
            }}
          >
            <div style={{ display: "flex" }}>
              <span>project-midnight.dev</span>
            </div>
            <div style={{ display: "flex" }}>
              <span>Projects • Blog • Contact</span>
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
