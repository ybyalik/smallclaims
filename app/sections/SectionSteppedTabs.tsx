"use client";

import { useState } from "react";

interface Step {
  num: number;
  title: React.ReactNode;
  description: string;
  image: string;
  labels: string[];
  pillText: string;
}

const STEPS: Step[] = [
  {
    num: 1,
    title: (
      <>
        Understand your<br />business
      </>
    ),
    description: "We dive deep into your business to tailor solutions that truly fit your goals.",
    image: "https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?w=1100&h=900&fit=crop",
    labels: ["Review\ncurrent books", "Compliance\nstatus", "Reporting\nstructure"],
    pillText: "Fast-track to financial\nclarity",
  },
  {
    num: 2,
    title: (
      <>
        Build the<br />roadmap
      </>
    ),
    description:
      "We translate findings into a 30/60/90-day plan with named owners and clear weekly checkpoints.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1100&h=900&fit=crop",
    labels: [
      "Quarterly\ntargets",
      "Cash-flow\nforecast",
      "Vendor &\ncost levers",
    ],
    pillText: "A plan that survives\nfirst contact",
  },
  {
    num: 3,
    title: (
      <>
        Execute &amp;<br />measure
      </>
    ),
    description:
      "We do the work alongside your team, then track every metric against the baseline so the win is measurable.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1100&h=900&fit=crop",
    labels: [
      "Monthly\nclose ritual",
      "KPI\ndashboards",
      "Quarterly\nreviews",
    ],
    pillText: "Compounding wins,\nquarter on quarter",
  },
];

export default function SectionSteppedTabs() {
  const [active, setActive] = useState(0);
  const step = STEPS[active];

  return (
    <section style={{ background: "#f1eadc", padding: "32px 24px 96px" }}>
      <div
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1.05fr",
          gap: 56,
          alignItems: "center",
        }}
      >
        {/* LEFT */}
        <div>
          <h2
            style={{
              fontFamily: "Geist, system-ui, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(34px, 3.4vw, 46px)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "#0c0c0c",
              margin: "0 0 18px",
              maxWidth: "20ch",
            }}
          >
            From first call to final result: Here&rsquo;s how it works
          </h2>
          <p style={{ fontSize: 15.5, lineHeight: 1.6, color: "#4a4a4a", margin: "0 0 40px", maxWidth: "44ch" }}>
            A proven framework that transforms your financial challenges into actionable
            growth strategies.
          </p>

          {/* Step tabs (functional) */}
          <div
            style={{
              display: "inline-flex",
              padding: 6,
              background: "#fff",
              borderRadius: 12,
              border: "1px solid #e5dcc7",
              marginBottom: 56,
              gap: 4,
            }}
            role="tablist"
          >
            {STEPS.map((s, i) => (
              <button
                key={s.num}
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                style={{
                  padding: "10px 22px",
                  borderRadius: 8,
                  fontFamily: "Geist, system-ui, sans-serif",
                  fontWeight: 600,
                  fontSize: 14,
                  background: i === active ? "#f1eadc" : "transparent",
                  color: i === active ? "#0c0c0c" : "#4a4a4a",
                  cursor: "pointer",
                  border: 0,
                  transition: "background .2s ease, color .2s ease",
                }}
              >
                Step {s.num}
              </button>
            ))}
          </div>

          {/* Avatars */}
          <div style={{ display: "flex", marginBottom: 14 }}>
            {[
              "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=120&h=120&fit=crop&crop=face",
              "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=120&h=120&fit=crop&crop=face",
              "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&crop=face",
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=face",
            ].map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={i}
                src={src}
                alt=""
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  border: "2px solid #f1eadc",
                  marginLeft: i === 0 ? 0 : -10,
                  objectFit: "cover",
                }}
              />
            ))}
          </div>

          <div
            style={{
              fontFamily: "Geist, system-ui, sans-serif",
              fontWeight: 700,
              fontSize: 18,
              color: "#0c0c0c",
              marginBottom: 4,
            }}
          >
            110+ CFOs
          </div>
          <p style={{ fontSize: 14.5, color: "#4a4a4a", margin: "0 0 32px" }}>
            To simplify accounting and unlock growth.
          </p>

          <a
            href="#"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: "#d9402e",
              color: "#fff",
              padding: "16px 28px",
              borderRadius: 10,
              fontSize: 15,
              fontWeight: 600,
              textDecoration: "none",
              fontFamily: "Geist, system-ui, sans-serif",
            }}
          >
            Let&rsquo;s get started
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>

        {/* RIGHT — photo card with step-driven content */}
        <div
          key={active}
          style={{
            background: "#1a1714",
            borderRadius: 22,
            overflow: "hidden",
            position: "relative",
            minHeight: 540,
            animation: "sec-fade .35s ease",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={step.image}
            alt=""
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.85,
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0.1) 100%)",
            }}
          />

          {/* Top — title block */}
          <div style={{ position: "absolute", top: 32, left: 36, right: 36, color: "#fff", zIndex: 2 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 8,
                  background: "#fff",
                  color: "#0c0c0c",
                  display: "grid",
                  placeItems: "center",
                  fontFamily: "Geist, system-ui, sans-serif",
                  fontWeight: 800,
                  fontSize: 22,
                  letterSpacing: "-0.02em",
                  flexShrink: 0,
                }}
              >
                {step.num}
              </div>
              <div
                style={{
                  fontFamily: "Geist, system-ui, sans-serif",
                  fontWeight: 700,
                  fontSize: 22,
                  letterSpacing: "-0.015em",
                  lineHeight: 1.2,
                }}
              >
                {step.title}
              </div>
            </div>
            <p
              style={{
                fontSize: 15,
                lineHeight: 1.5,
                color: "#fff",
                fontWeight: 500,
                margin: 0,
                maxWidth: "44ch",
              }}
            >
              {step.description}
            </p>
          </div>

          {/* Diagram overlay */}
          <div style={{ position: "absolute", inset: 0, zIndex: 2 }}>
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
            >
              <line x1="20" y1="55" x2="50" y2="65" stroke="rgba(255,255,255,0.4)" strokeWidth="0.25" strokeDasharray="0.6 0.6" />
              <line x1="20" y1="68" x2="50" y2="68" stroke="rgba(255,255,255,0.4)" strokeWidth="0.25" strokeDasharray="0.6 0.6" />
              <line x1="20" y1="80" x2="50" y2="71" stroke="rgba(255,255,255,0.4)" strokeWidth="0.25" strokeDasharray="0.6 0.6" />
              <line x1="55" y1="68" x2="78" y2="68" stroke="rgba(255,255,255,0.4)" strokeWidth="0.25" strokeDasharray="0.6 0.6" />
            </svg>

            {/* Left labels — driven by step */}
            {step.labels.map((label, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: 36,
                  top: ["48%", "62%", "76%"][i],
                  color: "#fff",
                  fontSize: 14,
                  lineHeight: 1.4,
                  fontWeight: 500,
                  opacity: 0.92,
                  whiteSpace: "pre-line",
                }}
              >
                {label}
              </div>
            ))}

            {/* Center gold node */}
            <div
              style={{
                position: "absolute",
                left: "calc(50% - 28px)",
                top: "63%",
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: "linear-gradient(180deg, #f8d764 0%, #f4ba4d 100%)",
                display: "grid",
                placeItems: "center",
                boxShadow: "0 0 0 6px rgba(248,215,100,0.18), 0 14px 30px -10px rgba(0,0,0,0.5)",
              }}
            >
              <svg viewBox="0 0 48 48" width="32" height="32">
                <path
                  d="M24 4 L27.5 20.5 L44 24 L27.5 27.5 L24 44 L20.5 27.5 L4 24 L20.5 20.5 Z"
                  fill="#d9402e"
                />
              </svg>
            </div>

            {/* Right pill */}
            <div
              style={{
                position: "absolute",
                right: 36,
                top: "63%",
                background: "rgba(255,255,255,0.18)",
                color: "#fff",
                padding: "10px 18px",
                borderRadius: 10,
                fontSize: 14,
                fontWeight: 600,
                lineHeight: 1.3,
                backdropFilter: "blur(4px)",
                border: "1px solid rgba(255,255,255,0.18)",
                whiteSpace: "pre-line",
              }}
            >
              {step.pillText}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
