import { seedUsers, type User } from "./dashboard-data";

/**
 * In-memory user store backing the mock API.
 * Persisted on globalThis so dev HMR / repeated imports don't reseed it.
 */
const globalStore = globalThis as unknown as { __zenUsers?: User[] };
globalStore.__zenUsers ??= seedUsers.map((u) => ({ ...u }));

function db(): User[] {
  return globalStore.__zenUsers!;
}

export function listUsers(): User[] {
  return db();
}

export type UserInput = Omit<User, "id" | "joined"> & { joined?: string };

export function createUser(input: UserInput): User {
  const user: User = {
    id: `u-${Math.random().toString(36).slice(2, 8)}`,
    joined: input.joined ?? new Date().toISOString().slice(0, 10),
    name: input.name,
    email: input.email,
    role: input.role,
    plan: input.plan,
    status: input.status,
    spend: input.spend,
  };
  globalStore.__zenUsers = [user, ...db()];
  return user;
}

export function updateUser(id: string, patch: Partial<UserInput>): User | null {
  let updated: User | null = null;
  globalStore.__zenUsers = db().map((u) => {
    if (u.id !== id) return u;
    updated = { ...u, ...patch };
    return updated;
  });
  return updated;
}

export function deleteUser(id: string): boolean {
  const before = db().length;
  globalStore.__zenUsers = db().filter((u) => u.id !== id);
  return db().length < before;
}
