// Shared page header used across (app) and admin routes.
//
// Renders the consistent "back link + h1 + subtitle + optional actions"
// block that every page in the app uses. Variant chooses the wrapper:
// "app" → div.app-page-head, "admin" → header.admin-page-head.

import Link from "next/link";
import type { ReactNode } from "react";

interface BackLink {
  href: string;
  label: string;
}

interface Props {
  title: ReactNode;
  sub?: ReactNode;
  back?: BackLink;
  actions?: ReactNode;
  // Optional className applied to the actions container. Used when the page
  // needs a special right-side layout (e.g. "app-case-head-actions" lines up
  // a status pill + button row).
  actionsClassName?: string;
  variant?: "app" | "admin";
}

export default function PageHead({
  title,
  sub,
  back,
  actions,
  actionsClassName,
  variant = "app",
}: Props) {
  const isAdmin = variant === "admin";
  const wrapperClass = isAdmin ? "admin-page-head" : "app-page-head";
  // Admin styles target `.admin-page-head p` directly; the app variant uses an
  // explicit `.app-page-sub` class. Match both conventions.
  const backClass = isAdmin ? "admin-back" : "app-back";

  const inner = (
    <>
      <div>
        {back ? (
          <Link href={back.href} className={backClass}>
            {back.label}
          </Link>
        ) : null}
        <h1>{title}</h1>
        {sub ? (
          isAdmin ? <p>{sub}</p> : <p className="app-page-sub">{sub}</p>
        ) : null}
      </div>
      {actions ? <div className={actionsClassName}>{actions}</div> : null}
    </>
  );

  if (variant === "admin") {
    return <header className={wrapperClass}>{inner}</header>;
  }
  return <div className={wrapperClass}>{inner}</div>;
}
