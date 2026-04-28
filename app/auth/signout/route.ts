// Sign-out endpoint. POST or GET both work.

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../lib/supabase/server";

async function handler(req: NextRequest) {
  const supabase = createClient();
  await supabase.auth.signOut();
  return NextResponse.redirect(new URL("/", req.url));
}

export const GET = handler;
export const POST = handler;
