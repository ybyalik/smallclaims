// Admin-only data helpers. Uses the service-role client which bypasses RLS.
// Layout middleware enforces is_admin = true before any admin page renders.

import { createServiceRoleClient } from "../supabase/service-role";

export interface AdminUserRow {
  id: string;
  email: string;
  fullName: string | null;
  createdAt: string;
  lastSignInAt: string | null;
  isAdmin: boolean;
  caseCount: number;
  paidCount: number;
  totalPaidCents: number;
  stripeCustomerId: string | null;
}

/**
 * Lists every registered user with rolled-up case + payment stats.
 * For admin index views.
 */
export async function listAdminUsers(): Promise<AdminUserRow[]> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const admin = createServiceRoleClient() as any;

  // Auth users (paginated; for v1 just grab the first 1000)
  const { data: usersResp } = await admin.auth.admin.listUsers({ perPage: 1000 });
  const users = usersResp?.users ?? [];
  if (users.length === 0) return [];

  const userIds = users.map((u: { id: string }) => u.id);

  const [{ data: profiles }, { data: cases }, { data: payments }] = await Promise.all([
    admin.from("profiles").select("user_id, full_name, is_admin, stripe_customer_id").in("user_id", userIds),
    admin.from("cases").select("id, owner_user_id, status").in("owner_user_id", userIds),
    admin
      .from("payments")
      .select("user_id, amount_cents, status")
      .in("user_id", userIds)
      .eq("status", "succeeded"),
  ]);

  const profileMap = new Map<string, { full_name: string | null; is_admin: boolean; stripe_customer_id: string | null }>();
  for (const p of profiles ?? []) profileMap.set(p.user_id, p);

  const caseCountByUser = new Map<string, number>();
  for (const c of cases ?? []) {
    caseCountByUser.set(c.owner_user_id, (caseCountByUser.get(c.owner_user_id) ?? 0) + 1);
  }

  const paidByUser = new Map<string, { count: number; cents: number }>();
  for (const p of payments ?? []) {
    const cur = paidByUser.get(p.user_id) ?? { count: 0, cents: 0 };
    cur.count += 1;
    cur.cents += p.amount_cents ?? 0;
    paidByUser.set(p.user_id, cur);
  }

  const rows: AdminUserRow[] = users.map((u: {
    id: string;
    email?: string;
    created_at: string;
    last_sign_in_at: string | null;
  }) => {
    const profile = profileMap.get(u.id);
    const paid = paidByUser.get(u.id) ?? { count: 0, cents: 0 };
    return {
      id: u.id,
      email: u.email ?? "",
      fullName: profile?.full_name ?? null,
      createdAt: u.created_at,
      lastSignInAt: u.last_sign_in_at,
      isAdmin: !!profile?.is_admin,
      caseCount: caseCountByUser.get(u.id) ?? 0,
      paidCount: paid.count,
      totalPaidCents: paid.cents,
      stripeCustomerId: profile?.stripe_customer_id ?? null,
    };
  });

  // Most recently signed-up first
  rows.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  return rows;
}

export interface AdminUserDetail {
  id: string;
  email: string;
  fullName: string | null;
  createdAt: string;
  lastSignInAt: string | null;
  isAdmin: boolean;
  stripeCustomerId: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cases: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payments: any[];
}

export async function loadAdminUser(userId: string): Promise<AdminUserDetail | null> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const admin = createServiceRoleClient() as any;
  const { data: userResp } = await admin.auth.admin.getUserById(userId);
  if (!userResp?.user) return null;

  const [{ data: profile }, { data: cases }, { data: payments }] = await Promise.all([
    admin.from("profiles").select("*").eq("user_id", userId).maybeSingle(),
    admin.from("cases").select("*").eq("owner_user_id", userId).order("updated_at", { ascending: false }),
    admin.from("payments").select("*").eq("user_id", userId).order("created_at", { ascending: false }),
  ]);

  return {
    id: userResp.user.id,
    email: userResp.user.email ?? "",
    fullName: profile?.full_name ?? null,
    createdAt: userResp.user.created_at,
    lastSignInAt: userResp.user.last_sign_in_at ?? null,
    isAdmin: !!profile?.is_admin,
    stripeCustomerId: profile?.stripe_customer_id ?? null,
    cases: cases ?? [],
    payments: payments ?? [],
  };
}

export interface AdminCaseRow {
  id: string;
  ownerUserId: string | null;
  ownerEmail: string | null;
  status: string;
  disputeType: string;
  state: string;
  amountCents: number;
  defendantName: string | null;
  plaintiffName: string | null;
  productKey: string | null;
  paidCents: number;
  createdAt: string;
  updatedAt: string;
}

export async function listAdminCases(): Promise<AdminCaseRow[]> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const admin = createServiceRoleClient() as any;
  const { data: cases } = await admin
    .from("cases")
    .select("*")
    .order("updated_at", { ascending: false })
    .limit(500);
  if (!cases || cases.length === 0) return [];

  const userIds = Array.from(
    new Set(cases.map((c: { owner_user_id: string | null }) => c.owner_user_id).filter(Boolean))
  );

  const [emailMap, paymentsByCase] = await Promise.all([
    (async () => {
      const map = new Map<string, string>();
      // Look up emails via auth.admin
      for (const id of userIds) {
        try {
          const { data: u } = await admin.auth.admin.getUserById(id);
          if (u?.user?.email) map.set(id as string, u.user.email);
        } catch {
          // ignore
        }
      }
      return map;
    })(),
    (async () => {
      const map = new Map<string, { cents: number; productKey: string | null }>();
      const { data: ps } = await admin
        .from("payments")
        .select("case_id, product_key, amount_cents, status")
        .eq("status", "succeeded");
      for (const p of ps ?? []) {
        const cur = map.get(p.case_id) ?? { cents: 0, productKey: null };
        cur.cents += p.amount_cents ?? 0;
        if (!cur.productKey) cur.productKey = p.product_key;
        map.set(p.case_id, cur);
      }
      return map;
    })(),
  ]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return cases.map((c: any) => {
    const paid = paymentsByCase.get(c.id) ?? { cents: 0, productKey: null };
    return {
      id: c.id,
      ownerUserId: c.owner_user_id,
      ownerEmail: c.owner_user_id ? emailMap.get(c.owner_user_id) ?? null : null,
      status: c.status,
      disputeType: c.dispute_type,
      state: c.state,
      amountCents: c.amount_cents ?? 0,
      defendantName: c.defendant_name,
      plaintiffName: c.plaintiff_name,
      productKey: paid.productKey,
      paidCents: paid.cents,
      createdAt: c.created_at,
      updatedAt: c.updated_at,
    };
  });
}

export interface AdminCaseDetail {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  caseRow: any;
  ownerEmail: string | null;
  ownerName: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payments: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  documents: any[];
}

export async function loadAdminCase(caseId: string): Promise<AdminCaseDetail | null> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const admin = createServiceRoleClient() as any;
  const { data: caseRow } = await admin.from("cases").select("*").eq("id", caseId).maybeSingle();
  if (!caseRow) return null;

  let ownerEmail: string | null = null;
  let ownerName: string | null = null;
  if (caseRow.owner_user_id) {
    try {
      const { data: u } = await admin.auth.admin.getUserById(caseRow.owner_user_id);
      ownerEmail = u?.user?.email ?? null;
    } catch {
      // ignore
    }
    const { data: profile } = await admin
      .from("profiles")
      .select("full_name")
      .eq("user_id", caseRow.owner_user_id)
      .maybeSingle();
    ownerName = profile?.full_name ?? null;
  }

  const [{ data: payments }, { data: documents }] = await Promise.all([
    admin.from("payments").select("*").eq("case_id", caseId).order("created_at", { ascending: false }),
    admin.from("documents").select("*").eq("case_id", caseId).order("created_at", { ascending: false }),
  ]);

  return {
    caseRow,
    ownerEmail,
    ownerName,
    payments: payments ?? [],
    documents: documents ?? [],
  };
}
