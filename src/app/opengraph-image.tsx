import { ImageResponse } from "next/og";

import { site } from "@/content/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "linear-gradient(135deg, #060d14 0%, #0f2131 58%, #163149 100%)",
          padding: 72,
          color: "#f4f2ed",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 999,
              border: "2px solid #f4f2ed",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: 999,
                background: "#b8863b",
              }}
            />
          </div>
          <div
            style={{
              fontSize: 28,
              letterSpacing: 8,
              textTransform: "uppercase",
              color: "#d3cdc0",
            }}
          >
            Target Advisor
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 76, lineHeight: 1.05, maxWidth: 940 }}>
            Assessoria em fusões e aquisições
          </div>
          <div style={{ fontSize: 30, color: "#a9a294", maxWidth: 820 }}>
            Venda, compra e capitalização de empresas no middle market
            brasileiro.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 24,
            color: "#7c766a",
            borderTop: "1px solid rgba(244,242,237,0.15)",
            paddingTop: 28,
          }}
        >
          <div>targetadvisor.com.br</div>
          <div style={{ color: "#cfa15f" }}>Desde 2010</div>
        </div>
      </div>
    ),
    size,
  );
}
