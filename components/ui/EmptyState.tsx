// Shared "nothing here yet" panel. Replaces the hand-rolled `.app-empty` /
// `.admin-empty` divs used after PageHead on list and detail pages.

import type { ReactNode } from "react";

interface Props {
  title?: ReactNode;
  body?: ReactNode;
  cta?: ReactNode;
  variant?: "app" | "admin";
  children?: ReactNode;
}

export default function EmptyState({
  title,
  body,
  cta,
  variant = "app",
  children,
}: Props) {
  const wrapperClass = variant === "admin" ? "admin-empty" : "app-empty";
  return (
    <div className={wrapperClass}>
      {title ? <h2>{title}</h2> : null}
      {body ? <p>{body}</p> : null}
      {cta}
      {children}
    </div>
  );
}
