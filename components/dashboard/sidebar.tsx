"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Settings, ArrowLeft, LogOut } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { currentUser } from "@/lib/dashboard-data";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/users", label: "Customers", icon: Users },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

  return (
    <>
      <div
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-40 bg-ink/30 backdrop-blur-sm transition-opacity lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden="true"
      />

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-line bg-surface-2 transition-transform duration-200 lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center border-b border-line px-5">
          <Link href="/" aria-label="Zen home">
            <Logo />
          </Link>
        </div>

        <nav className="flex flex-1 flex-col gap-1 p-3">
          {navItems.map(({ href, label, icon: Icon, exact }) => {
            const active = exact ? pathname === href : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-clay-soft text-clay-hover"
                    : "text-ink-muted hover:bg-canvas hover:text-ink",
                )}
              >
                <Icon className="h-[18px] w-[18px]" strokeWidth={active ? 2.2 : 1.8} />
                {label}
              </Link>
            );
          })}

          <div className="my-3 border-t border-line" />

          <Link
            href="/"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-ink-muted transition-colors hover:bg-canvas hover:text-ink"
          >
            <ArrowLeft className="h-[18px] w-[18px]" strokeWidth={1.8} />
            Back to website
          </Link>
        </nav>

        <div className="border-t border-line p-3">
          <div className="flex items-center gap-3 rounded-xl p-2">
            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-clay-soft text-xs font-semibold text-clay-hover">
              {currentUser.initials}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-ink">{currentUser.name}</p>
              <p className="truncate text-xs text-ink-muted">{currentUser.plan} plan</p>
            </div>
            <button
              type="button"
              className="rounded-lg p-1.5 text-ink-subtle transition-colors hover:bg-canvas hover:text-ink"
              aria-label="Sign out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
