import Link from "next/link";
import type { ReactNode, CSSProperties } from "react";

function offset(pos: "top-left" | "top-right" | "bottom-left" | "bottom-right"): CSSProperties {
  const inset = 22;
  switch (pos) {
    case "top-left": return { top: inset, left: inset };
    case "top-right": return { top: inset, right: inset };
    case "bottom-left": return { bottom: inset, left: inset };
    case "bottom-right": return { bottom: inset, right: inset };
  }
}

interface Props {
  href: string;
  bg: string;
  tone: "dark" | "light";
  stepNum: string;
  stepPos: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  title: ReactNode;
  titlePos: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  gradient?: boolean;
}

export default function CtaStepCard({
  href,
  bg,
  tone,
  stepNum,
  stepPos,
  title,
  titlePos,
  gradient,
}: Props) {
  const txtColor = tone === "dark" ? "#0c0c0c" : "#fff";
  const stepBg = tone === "dark" ? "#0c0c0c" : "rgba(0,0,0,0.85)";
  const stepText = "#fff";
  return (
    <Link
      href={href}
      style={{
        textDecoration: "none",
        background: bg,
        borderRadius: 16,
        height: 200,
        position: "relative",
        overflow: "hidden",
        display: "block",
        backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px)",
        backgroundSize: "10px 10px",
        transition: "transform .25s ease, box-shadow .25s ease",
      }}
    >
      {gradient && (
        <div
          style={{
            position: "absolute",
            left: -30,
            bottom: -30,
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "radial-gradient(circle at 50% 50%, rgba(245,116,76,0.95), rgba(245,116,76,0) 65%)",
            backgroundImage: "radial-gradient(circle, rgba(245,116,76,0.7) 1px, transparent 1.5px)",
            backgroundSize: "6px 6px",
            filter: "blur(0.4px)",
          }}
          aria-hidden
        />
      )}
      <div style={{ position: "absolute", ...offset(stepPos) }}>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            background: stepBg,
            color: stepText,
            padding: "5px 5px 5px 12px",
            borderRadius: 999,
            fontSize: 11.5,
            fontWeight: 600,
            fontFamily: "Geist, system-ui, sans-serif",
          }}
        >
          Path
          <span
            style={{
              background: "#fff",
              color: stepBg,
              padding: "2px 8px",
              borderRadius: 999,
              fontWeight: 700,
              fontSize: 11.5,
            }}
          >
            {stepNum}
          </span>
        </span>
      </div>
      <div style={{ position: "absolute", maxWidth: "85%", ...offset(titlePos) }}>
        <div
          style={{
            fontFamily: "Geist, system-ui, sans-serif",
            fontWeight: 800,
            fontSize: 22,
            lineHeight: 1.15,
            letterSpacing: "-0.015em",
            color: txtColor,
          }}
        >
          {title}
        </div>
      </div>
    </Link>
  );
}
