"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus, Search, Pencil, Trash2, Users as UsersIcon, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { UserFormModal, type UserFormValues } from "@/components/dashboard/user-form-modal";
import type { User, UserPlan, UserStatus } from "@/lib/dashboard-data";
import { formatCurrency, cn } from "@/lib/utils";

const statusTone: Record<UserStatus, "success" | "warning" | "danger"> = {
  active: "success",
  pending: "warning",
  suspended: "danger",
};

const planSpend: Record<UserPlan, number> = { Starter: 19, Growth: 49, Scale: 99 };

function initialsOf(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function UsersTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | UserStatus>("all");
  const [planFilter, setPlanFilter] = useState<"all" | UserPlan>("all");
  const [modal, setModal] = useState<{ mode: "add" | "edit"; user?: User } | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<User | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    fetch("/api/users")
      .then((r) => r.json())
      .then((d: User[]) => setUsers(d))
      .catch(() => setUsers([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return users.filter((u) => {
      const matchQ = !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
      const matchS = statusFilter === "all" || u.status === statusFilter;
      const matchP = planFilter === "all" || u.plan === planFilter;
      return matchQ && matchS && matchP;
    });
  }, [users, query, statusFilter, planFilter]);

  async function handleSubmit(values: UserFormValues) {
    setBusy(true);
    const payload = { ...values, spend: planSpend[values.plan] };
    try {
      if (modal?.mode === "add") {
        const res = await fetch("/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const created: User = await res.json();
        setUsers((prev) => [created, ...prev]);
      } else if (modal?.mode === "edit" && modal.user) {
        const id = modal.user.id;
        const res = await fetch(`/api/users/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const updated: User = await res.json();
        setUsers((prev) => prev.map((u) => (u.id === id ? updated : u)));
      }
      setModal(null);
    } finally {
      setBusy(false);
    }
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    const id = deleteTarget.id;
    setBusy(true);
    try {
      await fetch(`/api/users/${id}`, { method: "DELETE" });
      setUsers((prev) => prev.filter((u) => u.id !== id));
      setDeleteTarget(null);
    } finally {
      setBusy(false);
    }
  }

  const cellPad = "px-4 py-3.5";

  return (
    <div className="flex flex-col gap-5">
      {/* header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight">Customers</h2>
          <p className="mt-1 text-ink-muted">
            {loading ? "Loading…" : `${users.length} total · managing access and billing`}
          </p>
        </div>
        <Button onClick={() => setModal({ mode: "add" })}>
          <Plus className="h-4 w-4" />
          Add customer
        </Button>
      </div>

      {/* toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-subtle" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or email"
            className="w-full rounded-pill border-[1.5px] border-line-strong bg-surface py-2.5 pl-10 pr-4 text-sm text-ink placeholder:text-ink-subtle focus:border-clay focus:outline-none focus:ring-[3px] focus:ring-clay-soft"
          />
        </div>
        <div className="flex gap-3">
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as "all" | UserStatus)}
            className="w-full sm:w-36"
            aria-label="Filter by status"
          >
            <option value="all">All statuses</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="suspended">Suspended</option>
          </Select>
          <Select
            value={planFilter}
            onChange={(e) => setPlanFilter(e.target.value as "all" | UserPlan)}
            className="w-full sm:w-36"
            aria-label="Filter by plan"
          >
            <option value="all">All plans</option>
            <option value="Starter">Starter</option>
            <option value="Growth">Growth</option>
            <option value="Scale">Scale</option>
          </Select>
        </div>
      </div>

      {/* table */}
      <div className="overflow-hidden rounded-card border border-line bg-surface">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-line text-xs uppercase tracking-wider text-ink-subtle">
                <th className={cn(cellPad, "font-semibold")}>Customer</th>
                <th className={cn(cellPad, "hidden font-semibold sm:table-cell")}>Role</th>
                <th className={cn(cellPad, "font-semibold")}>Plan</th>
                <th className={cn(cellPad, "font-semibold")}>Status</th>
                <th className={cn(cellPad, "hidden font-semibold md:table-cell")}>Spend</th>
                <th className={cn(cellPad, "hidden font-semibold lg:table-cell")}>Joined</th>
                <th className={cn(cellPad, "font-semibold")}>
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {!loading &&
                filtered.map((u) => (
                  <tr key={u.id} className="transition-colors hover:bg-surface-2/60">
                    <td className={cellPad}>
                      <div className="flex items-center gap-3">
                        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-clay-soft text-xs font-semibold text-clay-hover">
                          {initialsOf(u.name)}
                        </span>
                        <div className="min-w-0">
                          <p className="truncate font-semibold text-ink">{u.name}</p>
                          <p className="truncate text-xs text-ink-muted">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className={cn(cellPad, "hidden text-ink-muted sm:table-cell")}>{u.role}</td>
                    <td className={cn(cellPad, "font-medium text-ink")}>{u.plan}</td>
                    <td className={cellPad}>
                      <Badge tone={statusTone[u.status]} className="capitalize">
                        {u.status}
                      </Badge>
                    </td>
                    <td className={cn(cellPad, "hidden font-mono text-ink-muted tabular-nums md:table-cell")}>
                      {formatCurrency(u.spend)}/mo
                    </td>
                    <td className={cn(cellPad, "hidden text-ink-muted lg:table-cell")}>
                      {formatDate(u.joined)}
                    </td>
                    <td className={cellPad}>
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => setModal({ mode: "edit", user: u })}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-ink-muted transition-colors hover:bg-canvas hover:text-ink"
                          aria-label={`Edit ${u.name}`}
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(u)}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-ink-muted transition-colors hover:bg-danger-soft hover:text-danger"
                          aria-label={`Delete ${u.name}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* loading / empty states */}
        {loading && (
          <div className="flex flex-col gap-3 p-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-12 animate-pulse rounded-xl bg-surface-2" />
            ))}
          </div>
        )}
        {!loading && filtered.length === 0 && (
          <div className="flex flex-col items-center gap-3 px-6 py-16 text-center">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-surface-2 text-ink-subtle">
              <UsersIcon className="h-6 w-6" />
            </span>
            <div>
              <p className="font-semibold text-ink">No customers found</p>
              <p className="mt-1 text-sm text-ink-muted">
                Try adjusting your search or filters.
              </p>
            </div>
          </div>
        )}
      </div>

      {!loading && filtered.length > 0 && (
        <p className="text-sm text-ink-subtle">
          Showing {filtered.length} of {users.length} customers
        </p>
      )}

      {/* add / edit */}
      {modal && (
        <UserFormModal
          key={modal.user?.id ?? "new"}
          open
          mode={modal.mode}
          initial={modal.user}
          busy={busy}
          onClose={() => setModal(null)}
          onSubmit={handleSubmit}
        />
      )}

      {/* delete confirm */}
      <Modal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Delete customer"
      >
        <div className="flex flex-col gap-5">
          <div className="flex items-start gap-3">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-danger-soft text-danger">
              <AlertTriangle className="h-5 w-5" />
            </span>
            <p className="text-sm text-ink-muted">
              Remove <span className="font-semibold text-ink">{deleteTarget?.name}</span> from your
              workspace? This can&rsquo;t be undone.
            </p>
          </div>
          <div className="flex items-center justify-end gap-3">
            <Button variant="ghost" onClick={() => setDeleteTarget(null)} disabled={busy}>
              Cancel
            </Button>
            <button
              type="button"
              onClick={confirmDelete}
              disabled={busy}
              className="inline-flex items-center justify-center gap-2 rounded-pill bg-danger px-5 py-2.5 text-[0.95rem] font-semibold text-[#fdf6ee] transition-colors hover:brightness-110 disabled:pointer-events-none disabled:opacity-50"
            >
              {busy ? "Deleting…" : "Delete"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
