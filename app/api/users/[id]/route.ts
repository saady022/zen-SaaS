import { NextResponse } from "next/server";
import { updateUser, deleteUser } from "@/lib/users-store";

export const dynamic = "force-dynamic";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }

  const updated = updateUser(id, {
    ...(body.name !== undefined && { name: String(body.name) }),
    ...(body.email !== undefined && { email: String(body.email) }),
    ...(body.role !== undefined && { role: body.role }),
    ...(body.plan !== undefined && { plan: body.plan }),
    ...(body.status !== undefined && { status: body.status }),
    ...(body.spend !== undefined && { spend: Number(body.spend) || 0 }),
  });

  if (!updated) {
    return NextResponse.json({ error: "User not found." }, { status: 404 });
  }
  return NextResponse.json(updated);
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const ok = deleteUser(id);
  if (!ok) {
    return NextResponse.json({ error: "User not found." }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
