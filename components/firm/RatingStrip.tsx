import Image from "next/image";
import { C, BODY_FONT } from "./index";

// Avatar stack + "Rated 4.9/5" line. Pulled from the home2 hero so service
// pages can show the same trust strip above their h1.

const AVATARS = [
  "/assets/home2/avatar-1.webp",
  "/assets/home2/avatar-2.webp",
  "/assets/home2/avatar-3.webp",
  "/assets/home2/avatar-4.webp",
];

export function RatingStrip({ style }: { style?: React.CSSProperties }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 12, ...style }}>
      <div style={{ display: "flex" }}>
        {AVATARS.map((src, i) => (
          <span
            key={src}
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              overflow: "hidden",
              display: "inline-block",
              position: "relative",
              border: "2px solid #fff",
              marginLeft: i ? -10 : 0,
            }}
          >
            <Image src={src} alt="" fill sizes="32px" style={{ objectFit: "cover" }} aria-hidden />
          </span>
        ))}
      </div>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 6, font: `500 13px/1 ${BODY_FONT}`, color: C.muted, marginLeft: 6 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill={C.fg} aria-hidden>
          <path d="M12 2l2.39 7.36H22l-6.18 4.49L18.21 22 12 17.27 5.79 22l2.39-8.15L2 9.36h7.61z" />
        </svg>
        Rated <strong style={{ color: C.fg, fontWeight: 700 }}>4.9/5</strong>
      </span>
    </div>
  );
}
