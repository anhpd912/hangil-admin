import { createAuthClient } from "better-auth/react";
import { setAuthTokenGetter } from "@/shared/api/api-client";

const TOKEN_STORAGE_KEY = "hangil_admin_token";

export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_STORAGE_KEY);
}

function setStoredToken(token: string | null) {
  if (typeof window === "undefined") return;
  if (token) localStorage.setItem(TOKEN_STORAGE_KEY, token);
  else localStorage.removeItem(TOKEN_STORAGE_KEY);
}

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  basePath: "/api/v1/auth",
  fetchOptions: {
    /** Bearer-only flow, không cookie — BE cors không set credentials:true nên phải tắt include. */
    credentials: "omit",
    auth: { type: "Bearer", token: () => getStoredToken() ?? undefined },
    onSuccess: (ctx) => {
      const token = ctx.response.headers.get("set-auth-token");
      if (token) setStoredToken(token);
    },
  },
});

/** apiFetch (shared/api) dùng cùng token Bearer với authClient — không import vòng. */
setAuthTokenGetter(getStoredToken);

export const { signIn, useSession } = authClient;

export async function signOutAndClearToken() {
  await authClient.signOut();
  setStoredToken(null);
}
