import { ImageResponse } from "next/og";
import { getMessages } from "next-intl/server";

export const runtime = "edge";
export const alt = "AtlasBuild - Elite Software Factory";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const hero = messages.hero as {
    badge: string;
    headline: string;
    headlineGradient: string;
    subheadline: string;
  };

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #0D0D12 0%, #1a0a2e 50%, #16213e 100%)",
        fontFamily: "sans-serif",
      }}
    >
      {/* Background gradient orbs */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          left: "20%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "rgba(139, 92, 246, 0.3)",
          filter: "blur(100px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-10%",
          right: "20%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "rgba(6, 182, 212, 0.3)",
          filter: "blur(100px)",
        }}
      />

      {/* Content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px",
          textAlign: "center",
          zIndex: 10,
        }}
      >
        {/* Logo/Brand */}
        <div
          style={{
            fontSize: 48,
            fontWeight: "bold",
            background:
              "linear-gradient(135deg, #8B5CF6 0%, #3B82F6 50%, #06B6D4 100%)",
            backgroundClip: "text",
            color: "transparent",
            marginBottom: 40,
          }}
        >
          AtlasBuild
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: 64,
            fontWeight: "bold",
            color: "white",
            marginBottom: 20,
            maxWidth: "900px",
            lineHeight: 1.2,
          }}
        >
          {hero.headline}
        </div>

        {/* Gradient text */}
        <div
          style={{
            fontSize: 56,
            fontWeight: "bold",
            background:
              "linear-gradient(135deg, #8B5CF6 0%, #3B82F6 50%, #06B6D4 100%)",
            backgroundClip: "text",
            color: "transparent",
            marginBottom: 30,
          }}
        >
          {hero.headlineGradient}
        </div>

        {/* Badge */}
        <div
          style={{
            fontSize: 20,
            color: "#9ca3af",
            padding: "10px 24px",
            borderRadius: "24px",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(10px)",
          }}
        >
          {hero.badge}
        </div>
      </div>
    </div>,
    {
      ...size,
    },
  );
}
