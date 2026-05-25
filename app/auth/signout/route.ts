// Sign-out endpoint. POST or GET both work.
//
// Also clears the cc_dl_session cookie so any anonymous draft cases the
// browser was accessing don't remain reachable after the user signs out.
// (The case has already been claimed to the user_id by loadOwnedCase by
// this point, but clearing the cookie is the belt-and-suspenders fix.)

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../lib/supabase/server";

async function handler(req: NextRequest) {
  const supabase = createClient();
  await supabase.auth.signOut();
  const res = NextResponse.redirect(new URL("/", req.url));
  res.cookies.set("cc_dl_session", "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
  // Strip the SiteHeaderClient marker so the next page paints the
  // logged-out shell instantly instead of optimistically painting
  // the logged-in chrome.
  res.cookies.set("cc_has_session", "", {
    path: "/",
    maxAge: 0,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  return res;
}

export const GET = handler;
export const POST = handler;
