import { ImageResponse } from "next/og";
import { getToolBySlug } from "@/lib/tools";

export const alt = "Free Online Developer & Text Tools | ToolSnippet";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";
export const runtime = "edge";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            backgroundColor: "#0a0a0a",
            color: "#ffffff",
            padding: "80px",
            justifyContent: "space-between",
            fontFamily: "system-ui, -apple-system, sans-serif",
            borderTop: "12px solid #0f766e",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: "28px", fontWeight: "bold", color: "#0f766e" }}>
              ToolSnippet
            </span>
          </div>
          <div>
            <h1 style={{ fontSize: "60px", fontWeight: "bold" }}>Developer Tools</h1>
            <p style={{ fontSize: "24px", color: "#a3a3a3" }}>
              Free, local utilities for developer productivity.
            </p>
          </div>
          <div style={{ borderTop: "1px solid #262626", paddingTop: "32px" }}>
            <span style={{ color: "#0f766e", fontSize: "20px" }}>toolsnippet.com</span>
          </div>
        </div>
      ),
      size
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          backgroundColor: "#0a0a0a",
          color: "#ffffff",
          padding: "80px",
          justifyContent: "space-between",
          fontFamily: "system-ui, -apple-system, sans-serif",
          borderTop: "12px solid #2dd4bf",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                display: "flex",
                height: "40px",
                width: "40px",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "8px",
                backgroundColor: "#2dd4bf",
                color: "#0a0a0a",
                fontWeight: "bold",
                fontSize: "22px",
              }}
            >
              {"<>"}
            </div>
            <span style={{ fontSize: "28px", fontWeight: "bold", color: "#2dd4bf", marginLeft: "12px" }}>
              ToolSnippet
            </span>
          </div>
          <span style={{ fontSize: "20px", color: "#737373", letterSpacing: "0.05em", textTransform: "uppercase" }}>
            Client-Side Utility
          </span>
        </div>

        {/* Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "20px" }}>
          <span
            style={{
              fontSize: "18px",
              fontWeight: "600",
              color: "#2dd4bf",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            {tool.category} Tool
          </span>
          <h1
            style={{
              fontSize: "64px",
              fontWeight: "bold",
              color: "#ffffff",
              margin: "0",
              lineHeight: 1.1,
            }}
          >
            {tool.name}
          </h1>
          <p
            style={{
              fontSize: "24px",
              color: "#a3a3a3",
              lineHeight: 1.4,
              margin: "0",
              maxWidth: "950px",
            }}
          >
            {tool.shortDescription}
          </p>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #262626",
            paddingTop: "32px",
          }}
        >
          <div style={{ display: "flex", gap: "24px", color: "#737373", fontSize: "18px" }}>
            <span>🔒 100% Client-Side</span>
            <span>•</span>
            <span>⚡ Instant & Free</span>
            <span>•</span>
            <span>🛡️ Zero Data Storage</span>
          </div>
          <span style={{ color: "#2dd4bf", fontSize: "20px", fontWeight: "600" }}>
            toolsnippet.com/tools/{tool.slug}
          </span>
        </div>
      </div>
    ),
    size
  );
}
