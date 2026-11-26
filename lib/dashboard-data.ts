/**
 * Mock data for the Zen admin dashboard.
 * Stats, revenue series and the seed user list all live here.
 */

export type UserRole = "Admin" | "Member" | "Viewer";
export type UserPlan = "Starter" | "Growth" | "Scale";
export type UserStatus = "active" | "pending" | "suspended";

export const currentUser = {
  name: "Tara Kent",
  email: "tara@zenlabs.io",
  role: "Admin" as UserRole,
  plan: "Scale" as UserPlan,
  company: "Zen Labs",
  initials: "TK",
};

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  plan: UserPlan;
  status: UserStatus;
  joined: string; // ISO date
  spend: number; // monthly USD
}

export interface Stat {
  key: string;
  label: string;
  value: number;
  format: "currency" | "number" | "percent";
  delta: number; // percentage change
  positiveIsGood: boolean;
  spark: number[];
}

export const overviewStats: Stat[] = [
  {
    key: "revenue",
    label: "Monthly revenue",
    value: 48290,
    format: "currency",
    delta: 12.4,
    positiveIsGood: true,
    spark: [28, 31, 30, 35, 39, 44, 48],
  },
  {
    key: "customers",
    label: "Active customers",
    value: 2847,
    format: "number",
    delta: 4.1,
    positiveIsGood: true,
    spark: [24, 25, 26, 26, 27, 28, 28],
  },
  {
    key: "signups",
    label: "New signups",
    value: 312,
    format: "number",
    delta: 8.2,
    positiveIsGood: true,
    spark: [18, 22, 19, 25, 24, 29, 31],
  },
  {
    key: "churn",
    label: "Churn rate",
    value: 1.8,
    format: "percent",
    delta: -0.3,
    positiveIsGood: false,
    spark: [26, 24, 25, 22, 21, 20, 18],
  },
];

export interface RevenuePoint {
  month: string;
  revenue: number;
  customers: number;
}

export const revenueSeries: RevenuePoint[] = [
  { month: "Jan", revenue: 28400, customers: 1980 },
  { month: "Feb", revenue: 31200, customers: 2080 },
  { month: "Mar", revenue: 30100, customers: 2110 },
  { month: "Apr", revenue: 35600, customers: 2240 },
  { month: "May", revenue: 38900, customers: 2360 },
  { month: "Jun", revenue: 37400, customers: 2410 },
  { month: "Jul", revenue: 41800, customers: 2520 },
  { month: "Aug", revenue: 44200, customers: 2630 },
  { month: "Sep", revenue: 42900, customers: 2690 },
  { month: "Oct", revenue: 45800, customers: 2744 },
  { month: "Nov", revenue: 47100, customers: 2805 },
  { month: "Dec", revenue: 48290, customers: 2847 },
];

export const planBreakdown = [
  { plan: "Starter", count: 1420, tone: "var(--color-ink-subtle)" },
  { plan: "Growth", count: 1080, tone: "var(--color-clay)" },
  { plan: "Scale", count: 347, tone: "var(--color-success)" },
];

export interface Activity {
  id: string;
  name: string;
  action: string;
  time: string;
  initials: string;
}

export const recentActivity: Activity[] = [
  { id: "a1", name: "Priya Nair", action: "upgraded to Scale", time: "12m ago", initials: "PN" },
  { id: "a2", name: "Marcus Hale", action: "invited 3 teammates", time: "48m ago", initials: "MH" },
  { id: "a3", name: "Sofia Almeida", action: "updated billing details", time: "2h ago", initials: "SA" },
  { id: "a4", name: "Jonas Keller", action: "started a free trial", time: "4h ago", initials: "JK" },
  { id: "a5", name: "Amara Osei", action: "resolved a support ticket", time: "6h ago", initials: "AO" },
];

export const seedUsers: User[] = [
  { id: "u-01", name: "Priya Nair", email: "priya@keystone.io", role: "Admin", plan: "Scale", status: "active", joined: "2024-03-14", spend: 99 },
  { id: "u-02", name: "Marcus Hale", email: "marcus@vela.co", role: "Admin", plan: "Growth", status: "active", joined: "2024-05-02", spend: 49 },
  { id: "u-03", name: "Sofia Almeida", email: "sofia@orbit.app", role: "Member", plan: "Growth", status: "active", joined: "2024-06-21", spend: 49 },
  { id: "u-04", name: "Jonas Keller", email: "jonas@mica.dev", role: "Member", plan: "Starter", status: "pending", joined: "2024-09-09", spend: 19 },
  { id: "u-05", name: "Amara Osei", email: "amara@lumen.io", role: "Viewer", plan: "Starter", status: "active", joined: "2024-01-30", spend: 19 },
  { id: "u-06", name: "Daniel Fischer", email: "daniel@fathom.co", role: "Member", plan: "Scale", status: "active", joined: "2023-11-12", spend: 99 },
  { id: "u-07", name: "Lena Petrova", email: "lena@keystone.io", role: "Member", plan: "Growth", status: "suspended", joined: "2024-02-18", spend: 49 },
  { id: "u-08", name: "Tomás Rivera", email: "tomas@vela.co", role: "Viewer", plan: "Starter", status: "active", joined: "2024-07-04", spend: 19 },
  { id: "u-09", name: "Hana Yamamoto", email: "hana@orbit.app", role: "Admin", plan: "Scale", status: "active", joined: "2023-09-27", spend: 99 },
  { id: "u-10", name: "Ravi Desai", email: "ravi@mica.dev", role: "Member", plan: "Growth", status: "pending", joined: "2024-10-15", spend: 49 },
  { id: "u-11", name: "Clara Moreau", email: "clara@lumen.io", role: "Viewer", plan: "Starter", status: "active", joined: "2024-04-08", spend: 19 },
  { id: "u-12", name: "Noah Bergström", email: "noah@fathom.co", role: "Member", plan: "Growth", status: "active", joined: "2024-08-23", spend: 49 },
  { id: "u-13", name: "Yuki Tanaka", email: "yuki@orbit.app", role: "Member", plan: "Scale", status: "suspended", joined: "2023-12-05", spend: 99 },
  { id: "u-14", name: "Elena Costa", email: "elena@keystone.io", role: "Viewer", plan: "Starter", status: "active", joined: "2024-11-01", spend: 19 },
];
