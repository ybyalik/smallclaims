import type { Metadata } from "next";
import IntakeForm from "./IntakeForm";

export const metadata: Metadata = {
  title: "New case",
};

export default function NewCasePage() {
  return (
    <div>
      <div className="app-page-head">
        <div>
          <h1>Start a new case</h1>
          <p className="app-page-sub">
            Tell us about the dispute. We&apos;ll draft a professional demand letter for you.
          </p>
        </div>
      </div>
      <IntakeForm />
    </div>
  );
}
