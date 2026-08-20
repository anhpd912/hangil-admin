"use client";

import { useSession } from "./auth-client";

type SessionUser = {
  id: string;
  name: string | null;
  email: string;
  role?: string;
  plan?: string;
};

export function useAdminSession() {
  const { data, isPending, isRefetching, refetch } = useSession();
  const user = (data?.user ?? null) as SessionUser | null;
  const isAdmin = user?.role === "admin";

  return { user, isAdmin, isPending, isRefetching, refetch };
}
