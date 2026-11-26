"use client";

import { usePathname } from "next/navigation";
import { Menu, Search, Bell } from "lucide-react";
import { currentUser } from "@/lib/dashboard-data";

const titles: Record<string, string> = {
  "/dashboard": "Overview",
  "/dashboard/users": "Customers",
  "/dashboard/settings": "Settings",
};

export function Topbar({ onMenu }: { onMenu: () => void }) {
  const pathname = usePathname();
  const title = titles[pathname] ?? "Dashboard";

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-line bg-canvas/80 px-4 backdrop-blur-md sm:px-6 lg:px-8">
      <button
        type="button"
        onClick={onMenu}
        className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-ink transition-colors hover:bg-surface-2 lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      <h1 className="font-display text-lg font-extrabold tracking-tight">{title}</h1>

      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        <div className="relative hidden sm:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-subtle" />
          <input
            type="search"
            placeholder="Search"
            className="w-44 rounded-pill border border-line bg-surface py-2 pl-9 pr-3 text-sm text-ink placeholder:text-ink-subtle focus:border-clay focus:outline-none focus:ring-[3px] focus:ring-clay-soft lg:w-56"
          />
        </div>

        <button
          type="button"
          className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl text-ink-muted transition-colors hover:bg-surface-2 hover:text-ink"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full border-2 border-canvas bg-clay" />
        </button>

        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-clay-soft text-xs font-semibold text-clay-hover">
          {currentUser.initials}
        </span>
      </div>
    </header>
  );
}
