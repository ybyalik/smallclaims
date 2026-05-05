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
  return res;
}

export const GET = handler;
export const POST = handler;
