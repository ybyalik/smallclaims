"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type ViewState = "ready" | "running" | "cooldown" | "max_attempts";

interface Props {
  caseId: string;
  initialStatus: string;
  initialViewState: ViewState;
  initialCooldownSeconds: number;
}

// Friendly stage labels for the customer. NEVER expose raw status keys.
const STAGE_LABEL: Record<string, string> = {
  pending: "Getting started",
  county_researching: "Fetching your county's forms and fees",
  sequencing: "Building your personalized plan",
  generating_report: "Writing your report",
  ready: "Done",
  failed: "Retrying",
};

const STAGE_ETA_SECONDS: Record<string, number> = {
  pending: 30,
  county_researching: 75,
  sequencing: 30,
  generating_report: 60,
};

function formatSeconds(seconds: number): string {
  if (seconds <= 0) return "any moment";
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (m === 0) return `${s}s`;
  if (s === 0) return `${m} min`;
  return `${m} min ${s}s`;
}

export default function CollectionPlanStatus({
  caseId,
  initialStatus,
  initialViewState,
  initialCooldownSeconds,
}: Props) {
  const router = useRouter();
  const [status, setStatus] = useState(initialStatus);
  const [viewState, setViewState] = useState<ViewState>(initialViewState);
  const [elapsed, setElapsed] = useState(0);
  const [cooldownLeft, setCooldownLeft] = useState(initialCooldownSeconds);

  // Elapsed timer ticks every second.
  useEffect(() => {
    const start = Date.now();
    const tick = setInterval(() => {
      setElapsed(Math.floor((Date.now() - start) / 1000));
      setCooldownLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(tick);
  }, []);

  // Poll the server every 5s for status changes (running, cooldown, ready).
  useEffect(() => {
    if (viewState === "ready" || viewState === "max_attempts") return;
    let cancelled = false;
    async function poll() {
      try {
        const res = await fetch(`/api/cases/${caseId}/collection-plan/status`, {
          cache: "no-store",
        });
        if (!res.ok) return;
        const data = (await res.json()) as {
          status?: string;
          view_state?: ViewState;
          cooldown_seconds_remaining?: number;
        };
        if (cancelled) return;
        if (data.status && data.status !== status) {
          setStatus(data.status);
        }
        if (data.view_state && data.view_state !== viewState) {
          setViewState(data.view_state);
          if (data.view_state === "ready") {
            router.refresh();
          }
        }
        if (typeof data.cooldown_seconds_remaining === "number") {
          setCooldownLeft(data.cooldown_seconds_remaining);
        }
      } catch {
        // ignore transient errors
      }
    }
    const id = setInterval(poll, 5000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [caseId, status, viewState, router]);

  if (viewState === "max_attempts") {
    return (
      <div className="collection-plan-status">
        <div className="collection-plan-status-row">
          <div>
            <strong>We&apos;re looking into this.</strong>
            <p>
              We&apos;ve flagged your plan for our team to regenerate by hand.
              Your purchase is fully recorded and you have not lost anything.
              We&apos;ll email you as soon as it&apos;s ready, usually within
              a few hours. If you don&apos;t hear back within 24 hours, reply
              to your purchase receipt and we&apos;ll prioritize it.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (viewState === "cooldown") {
    return (
      <div className="collection-plan-status">
        <div className="collection-plan-status-row">
          <div className="collection-plan-spinner" aria-hidden="true" />
          <div>
            <strong>Queued for retry</strong>
            <p>
              Our first attempt hit a snag and we&apos;ve queued a retry. Your
              purchase is fully recorded; nothing is lost. We&apos;ll start
              the next attempt in {formatSeconds(cooldownLeft)}. You can
              leave this page open or come back later.
            </p>
          </div>
        </div>
        <p className="collection-plan-status-meta">
          Next attempt in {formatSeconds(cooldownLeft)}
        </p>
      </div>
    );
  }

  // Running state.
  const stageLabel = STAGE_LABEL[status] ?? "Working on your plan";
  const eta = STAGE_ETA_SECONDS[status];
  const etaCopy = eta ? `Usually about ${formatSeconds(eta)} for this step.` : "";

  return (
    <div className="collection-plan-status">
      <div className="collection-plan-status-row">
        <div className="collection-plan-spinner" aria-hidden="true" />
        <div>
          <strong>{stageLabel}</strong>
          <p>
            Your plan is generating. The full pipeline usually takes 3 to 5
            minutes the first time. {etaCopy} You can leave this page open
            or come back later. We&apos;ll email you when it&apos;s ready.
          </p>
        </div>
      </div>
      <p className="collection-plan-status-meta">
        Elapsed: {formatSeconds(elapsed)}
      </p>
    </div>
  );
}
