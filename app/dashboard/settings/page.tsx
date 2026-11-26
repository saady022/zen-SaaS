"use client";

import { useState } from "react";
import { Check, Trash2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Field } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Modal } from "@/components/ui/modal";
import { currentUser } from "@/lib/dashboard-data";

const notifItems = [
  { key: "product", label: "Product updates", desc: "News about features and improvements." },
  { key: "weekly", label: "Weekly summary", desc: "A digest of your workspace every Monday." },
  { key: "security", label: "Security alerts", desc: "Important activity on your account." },
  { key: "marketing", label: "Tips & offers", desc: "Occasional tips and the odd promotion." },
] as const;

type NotifKey = (typeof notifItems)[number]["key"];

function SettingsCard({
  title,
  description,
  children,
  tone = "default",
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  tone?: "default" | "danger";
}) {
  return (
    <section
      className={`rounded-card border bg-surface p-6 ${
        tone === "danger" ? "border-danger/30" : "border-line"
      }`}
    >
      <div className="mb-5 border-b border-line pb-4">
        <h3 className={`text-lg font-bold ${tone === "danger" ? "text-danger" : "text-ink"}`}>
          {title}
        </h3>
        <p className="mt-0.5 text-sm text-ink-muted">{description}</p>
      </div>
      {children}
    </section>
  );
}

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    name: currentUser.name,
    email: currentUser.email,
    company: currentUser.company,
  });
  const [savedProfile, setSavedProfile] = useState(false);
  const [notif, setNotif] = useState<Record<NotifKey, boolean>>({
    product: true,
    weekly: true,
    security: true,
    marketing: false,
  });
  const [twoFA, setTwoFA] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const initials = profile.name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  function saveProfile(e: React.FormEvent) {
    e.preventDefault();
    setSavedProfile(true);
    setTimeout(() => setSavedProfile(false), 2500);
  }

  return (
    <div className="flex max-w-3xl flex-col gap-6">
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight">Settings</h2>
        <p className="mt-1 text-ink-muted">Manage your profile, notifications and account.</p>
      </div>

      {/* Profile */}
      <SettingsCard title="Profile" description="Update your personal details and how you appear.">
        <form onSubmit={saveProfile} className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-clay-soft text-xl font-bold text-clay-hover">
              {initials}
            </span>
            <div>
              <Button type="button" variant="outline" size="sm">
                Change photo
              </Button>
              <p className="mt-1.5 text-xs text-ink-subtle">JPG or PNG, up to 2MB.</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full name" htmlFor="pf-name">
              <Input
                id="pf-name"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              />
            </Field>
            <Field label="Email" htmlFor="pf-email">
              <Input
                id="pf-email"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              />
            </Field>
            <Field label="Company" htmlFor="pf-company" className="sm:col-span-2">
              <Input
                id="pf-company"
                value={profile.company}
                onChange={(e) => setProfile({ ...profile, company: e.target.value })}
              />
            </Field>
          </div>

          <div className="flex items-center gap-3">
            <Button type="submit">Save changes</Button>
            {savedProfile && (
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-success">
                <Check className="h-4 w-4" /> Saved
              </span>
            )}
          </div>
        </form>
      </SettingsCard>

      {/* Notifications */}
      <SettingsCard title="Notifications" description="Choose what Zen emails you about.">
        <ul className="flex flex-col divide-y divide-line">
          {notifItems.map((item) => (
            <li key={item.key} className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
              <div>
                <p className="text-sm font-semibold text-ink">{item.label}</p>
                <p className="text-sm text-ink-muted">{item.desc}</p>
              </div>
              <Switch
                checked={notif[item.key]}
                onChange={(next) => setNotif((n) => ({ ...n, [item.key]: next }))}
                label={item.label}
              />
            </li>
          ))}
        </ul>
      </SettingsCard>

      {/* Security */}
      <SettingsCard title="Security" description="Keep your account protected.">
        <div className="flex flex-col gap-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="New password" htmlFor="pw-new">
              <Input id="pw-new" type="password" placeholder="••••••••" />
            </Field>
            <Field label="Confirm password" htmlFor="pw-confirm">
              <Input id="pw-confirm" type="password" placeholder="••••••••" />
            </Field>
          </div>
          <div className="flex items-center justify-between gap-4 rounded-xl bg-canvas p-4">
            <div>
              <p className="text-sm font-semibold text-ink">Two-factor authentication</p>
              <p className="text-sm text-ink-muted">Add an extra layer of security at sign in.</p>
            </div>
            <Switch checked={twoFA} onChange={setTwoFA} label="Two-factor authentication" />
          </div>
          <div>
            <Button variant="outline" size="sm">
              Update password
            </Button>
          </div>
        </div>
      </SettingsCard>

      {/* Danger zone */}
      <SettingsCard
        tone="danger"
        title="Danger zone"
        description="Irreversible actions for your workspace."
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-ink-muted">
            Delete this workspace and all of its data permanently.
          </p>
          <button
            type="button"
            onClick={() => setConfirmDelete(true)}
            className="inline-flex items-center gap-2 rounded-pill border-[1.5px] border-danger px-5 py-2.5 text-[0.95rem] font-semibold text-danger transition-colors hover:bg-danger hover:text-[#fdf6ee]"
          >
            <Trash2 className="h-4 w-4" />
            Delete workspace
          </button>
        </div>
      </SettingsCard>

      <Modal open={confirmDelete} onClose={() => setConfirmDelete(false)} title="Delete workspace">
        <div className="flex flex-col gap-5">
          <div className="flex items-start gap-3">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-danger-soft text-danger">
              <AlertTriangle className="h-5 w-5" />
            </span>
            <p className="text-sm text-ink-muted">
              This permanently deletes <span className="font-semibold text-ink">{profile.company}</span>{" "}
              and everything in it. There&rsquo;s no going back.
            </p>
          </div>
          <div className="flex items-center justify-end gap-3">
            <Button variant="ghost" onClick={() => setConfirmDelete(false)}>
              Cancel
            </Button>
            <button
              type="button"
              onClick={() => setConfirmDelete(false)}
              className="inline-flex items-center justify-center rounded-pill bg-danger px-5 py-2.5 text-[0.95rem] font-semibold text-[#fdf6ee] transition-colors hover:brightness-110"
            >
              Delete workspace
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
