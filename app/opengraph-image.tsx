import { ImageResponse } from "next/og";

import { siteConfig } from "@/config/site";
import { theme } from "@/config/theme";

export const alt = siteConfig.seo.ogImageAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  const subtitle = `${siteConfig.tagline} · ${siteConfig.address.addressLocality}`;

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
          background: `linear-gradient(145deg, ${theme.colors.brand} 0%, ${theme.colors.brandDark} 55%, ${theme.colors.ink} 100%)`,
          color: theme.colors.surface,
          fontFamily: "system-ui, sans-serif",
          padding: 48,
          textAlign: "center",
        }}
      >
        <div style={{ display: "flex", fontSize: 72, fontWeight: 800 }}>
          {siteConfig.name}
        </div>
        <div style={{ display: "flex", fontSize: 28, marginTop: 16, opacity: 0.92 }}>
          {subtitle}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 32,
            fontSize: 22,
            padding: "12px 28px",
            borderRadius: 999,
            background: theme.colors.surface,
            color: theme.colors.brand,
            fontWeight: 700,
          }}
        >
          {siteConfig.phone.display}
        </div>
      </div>
    ),
    { ...size }
  );
}
