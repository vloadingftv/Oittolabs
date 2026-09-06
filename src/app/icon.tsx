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
          background: "#0a1622",
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 999,
            border: "3px solid #f4f2ed",
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
      </div>
    ),
    size,
  );
}
