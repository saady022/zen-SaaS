import { NextResponse } from "next/server";
import { listUsers, createUser } from "@/lib/users-store";
import type { UserPlan, UserRole, UserStatus } from "@/lib/dashboard-data";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(listUsers());
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body?.name || !body?.email) {
    return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
  }

  const user = createUser({
    name: String(body.name),
    email: String(body.email),
    role: (body.role ?? "Member") as UserRole,
    plan: (body.plan ?? "Starter") as UserPlan,
    status: (body.status ?? "active") as UserStatus,
    spend: Number(body.spend) || 0,
  });

  return NextResponse.json(user, { status: 201 });
}
