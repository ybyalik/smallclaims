"use client";

import { useState } from "react";

interface Slide {
  case: {
    image: string;
    title: string;
    client: string;
  };
  result: {
    description: string;
    stats: { pct: string; label: string }[];
  };
}

const SLIDES: Slide[] = [
  {
    case: {
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1100&h=620&fit=crop",
      title: "Operational strategy for a manufacturing firm",
      client: "Client: Mid-sized Manufacturing",
    },
    result: {
      description:
        "We streamlined production workflows, introduced lean management practices, and aligned operations with demand forecasting boosting.",
      stats: [
        { pct: "22%", label: "Increase in Production Efficiency" },
        { pct: "18%", label: "Reduction in Operating Costs" },
      ],
    },
  },
  {
    case: {
      image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=1100&h=620&fit=crop",
      title: "Tax restructuring for a regional retailer",
      client: "Client: 22-store Retail Chain",
    },
    result: {
      description:
        "We restructured the entity model, captured under-utilized credits, and aligned timing of capital expenditures with state-level incentives.",
      stats: [
        { pct: "31%", label: "Reduction in Effective Tax Rate" },
        { pct: "$420K", label: "Annualized Tax Savings" },
      ],
    },
  },
  {
    case: {
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1100&h=620&fit=crop",
      title: "Cash-flow turnaround for a SaaS startup",
      client: "Client: Series A Software",
    },
    result: {
      description:
        "We rebuilt the rolling forecast, renegotiated key vendor terms, and tightened the AR follow-up process to extend runway materially.",
      stats: [
        { pct: "47%", label: "Increase in Free Cash Flow" },
        { pct: "9 mo", label: "Additional Runway Created" },
      ],
    },
  },
];

const arrowBtn: React.CSSProperties = {
  width: 40,
  height: 40,
  borderRadius: "50%",
  background: "transparent",
  border: 0,
  display: "grid",
  placeItems: "center",
  cursor: "pointer",
};

export default function SectionCaseStudySlider() {
  const [i, setI] = useState(0);
  const slide = SLIDES[i];
  const prev = () => setI((n) => (n - 1 + SLIDES.length) % SLIDES.length);
  const next = () => setI((n) => (n + 1) % SLIDES.length);

  return (
    <section style={{ background: "#f1eadc", padding: "32px 24px 96px" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        {/* Header row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr",
            gap: 64,
            alignItems: "start",
            marginBottom: 36,
          }}
        >
          <h2
            style={{
              fontFamily: "Geist, system-ui, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(34px, 3.6vw, 48px)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "#0c0c0c",
              margin: 0,
              maxWidth: "20ch",
            }}
          >
            Real-World case studies that showcase our strategic impact
          </h2>
          <p
            style={{
              fontSize: 15,
              lineHeight: 1.6,
              color: "#4a4a4a",
              margin: "8px 0 0",
              maxWidth: "44ch",
            }}
          >
            Discover how our tailored accounting and consulting solutions delivered real-world
            business improvements.
          </p>
        </div>

        {/* Two cards side by side — both driven by `slide` */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
          {/* LEFT — Case study card */}
          <div
            style={{
              background: "#fff",
              borderRadius: 18,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ background: "#fcd38a", padding: "16px 28px", fontSize: 14, fontWeight: 600, color: "#0c0c0c" }}>
              Case study
            </div>
            <div style={{ padding: "28px 32px", display: "flex", flexDirection: "column", gap: 22, flex: 1 }}>
              <div style={{ borderRadius: 10, overflow: "hidden", aspectRatio: "16/9" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  key={slide.case.image}
                  src={slide.case.image}
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    animation: "sec-fade .35s ease",
                  }}
                />
              </div>
              <div>
                <h3
                  style={{
                    fontFamily: "Geist, system-ui, sans-serif",
                    fontWeight: 700,
                    fontSize: 26,
                    lineHeight: 1.15,
                    letterSpacing: "-0.015em",
                    color: "#0c0c0c",
                    margin: "0 0 10px",
                    maxWidth: "20ch",
                  }}
                >
                  {slide.case.title}
                </h3>
                <div style={{ fontSize: 14.5, color: "#5b5b5b" }}>{slide.case.client}</div>
              </div>
            </div>
            {/* Carousel arrows */}
            <div
              style={{
                borderTop: "1px solid #ece4d3",
                padding: "18px 32px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <button aria-label="Previous" style={arrowBtn} onClick={prev}>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#d9402e" strokeWidth="2">
                  <path d="M19 12H5M11 18l-6-6 6-6" />
                </svg>
              </button>
              <div style={{ display: "flex", gap: 6 }}>
                {SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    aria-label={`Slide ${idx + 1}`}
                    onClick={() => setI(idx)}
                    style={{
                      width: idx === i ? 22 : 7,
                      height: 7,
                      borderRadius: 999,
                      border: 0,
                      padding: 0,
                      background: idx === i ? "#d9402e" : "#d8cfba",
                      cursor: "pointer",
                      transition: "width .25s ease, background .25s ease",
                    }}
                  />
                ))}
              </div>
              <button aria-label="Next" style={arrowBtn} onClick={next}>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#d9402e" strokeWidth="2">
                  <path d="M5 12h14M13 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>

          {/* RIGHT — Solution & Result */}
          <div
            style={{
              background: "#fff",
              borderRadius: 18,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ background: "#fcd38a", padding: "16px 28px", fontSize: 14, fontWeight: 600, color: "#0c0c0c" }}>
              Solution &amp; Result
            </div>
            <div
              key={i}
              style={{
                padding: "28px 32px",
                display: "flex",
                flexDirection: "column",
                flex: 1,
                animation: "sec-fade .35s ease",
              }}
            >
              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.6,
                  color: "#0c0c0c",
                  margin: "0 0 36px",
                  maxWidth: "60ch",
                }}
              >
                {slide.result.description}
              </p>

              {slide.result.stats.map((s, idx) => (
                <div key={idx}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "18px 0",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <span
                        style={{
                          width: 22,
                          height: 22,
                          borderRadius: "50%",
                          background: "#3dba6a",
                          color: "#fff",
                          display: "grid",
                          placeItems: "center",
                          flexShrink: 0,
                        }}
                      >
                        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="3">
                          <path d="M5 12l4 4 10-10" />
                        </svg>
                      </span>
                      <span
                        style={{
                          fontFamily: "Geist, system-ui, sans-serif",
                          fontWeight: 700,
                          fontSize: 22,
                          color: "#0c0c0c",
                          letterSpacing: "-0.015em",
                        }}
                      >
                        {s.pct}
                      </span>
                    </div>
                    <div style={{ fontSize: 14.5, color: "#0c0c0c", fontWeight: 500, textAlign: "right" }}>
                      {s.label}
                    </div>
                  </div>
                  <div style={{ height: 1, background: "#ece4d3" }} />
                </div>
              ))}

              <a
                href="#"
                style={{
                  alignSelf: "flex-start",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  background: "#d9402e",
                  color: "#fff",
                  padding: "14px 24px",
                  borderRadius: 10,
                  fontSize: 14.5,
                  fontWeight: 600,
                  textDecoration: "none",
                  fontFamily: "Geist, system-ui, sans-serif",
                  marginTop: "auto",
                }}
              >
                View full case study
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
