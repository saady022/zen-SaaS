"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input, Select, Field } from "@/components/ui/input";
import type { User, UserPlan, UserRole, UserStatus } from "@/lib/dashboard-data";

export interface UserFormValues {
  name: string;
  email: string;
  role: UserRole;
  plan: UserPlan;
  status: UserStatus;
}

const roles: UserRole[] = ["Admin", "Member", "Viewer"];
const plans: UserPlan[] = ["Starter", "Growth", "Scale"];
const statuses: UserStatus[] = ["active", "pending", "suspended"];

export function UserFormModal({
  open,
  mode,
  initial,
  busy,
  onClose,
  onSubmit,
}: {
  open: boolean;
  mode: "add" | "edit";
  initial?: User | null;
  busy: boolean;
  onClose: () => void;
  onSubmit: (values: UserFormValues) => void;
}) {
  const [values, setValues] = useState<UserFormValues>({
    name: initial?.name ?? "",
    email: initial?.email ?? "",
    role: initial?.role ?? "Member",
    plan: initial?.plan ?? "Starter",
    status: initial?.status ?? "active",
  });
  const [error, setError] = useState<string | null>(null);

  function set<K extends keyof UserFormValues>(key: K, value: UserFormValues[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!values.name.trim() || !values.email.trim()) {
      setError("Name and email are both required.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError(null);
    onSubmit(values);
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={mode === "add" ? "Add customer" : "Edit customer"}
      description={mode === "add" ? "Create a new customer record." : `Update ${initial?.name}.`}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Field label="Full name" htmlFor="name">
          <Input
            id="name"
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="Jordan Lee"
            autoFocus
          />
        </Field>

        <Field label="Email" htmlFor="email">
          <Input
            id="email"
            type="email"
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="jordan@company.com"
          />
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Role" htmlFor="role">
            <Select id="role" value={values.role} onChange={(e) => set("role", e.target.value as UserRole)}>
              {roles.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Plan" htmlFor="plan">
            <Select id="plan" value={values.plan} onChange={(e) => set("plan", e.target.value as UserPlan)}>
              {plans.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </Select>
          </Field>
        </div>

        <Field label="Status" htmlFor="status">
          <Select
            id="status"
            value={values.status}
            onChange={(e) => set("status", e.target.value as UserStatus)}
          >
            {statuses.map((s) => (
              <option key={s} value={s} className="capitalize">
                {s}
              </option>
            ))}
          </Select>
        </Field>

        {error && (
          <p className="rounded-xl bg-danger-soft px-3 py-2 text-sm text-[#8a3522]">{error}</p>
        )}

        <div className="mt-2 flex items-center justify-end gap-3">
          <Button type="button" variant="ghost" onClick={onClose} disabled={busy}>
            Cancel
          </Button>
          <Button type="submit" disabled={busy}>
            {busy ? "Saving…" : mode === "add" ? "Add customer" : "Save changes"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
