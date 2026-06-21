import { ApiError, type ApiErrorCode } from "./api-error";

type ApiEnvelope<T> = { success: true; data: T } | { success: false; error: string; code?: string };

let getAuthToken: (() => string | null) | null = null;

/** Module-level injector — phase 02 auth gọi để tránh import vòng api-client ↔ shared/auth. */
export function setAuthTokenGetter(getter: () => string | null) {
  getAuthToken = getter;
}

function resolveBaseUrl(): string {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!base) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL chưa được set trong .env.local");
  }
  return base;
}

export function buildQuery(params: Record<string, string | number | boolean | undefined>): string {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) search.set(key, String(value));
  }
  const qs = search.toString();
  return qs ? `?${qs}` : "";
}

function statusToFallbackCode(status: number): ApiErrorCode {
  if (status === 401) return "UNAUTHORIZED";
  if (status === 403) return "FORBIDDEN";
  return "UNKNOWN";
}

export async function apiFetch<T>(
  path: string,
  opts: { method?: string; body?: unknown; signal?: AbortSignal } = {},
): Promise<T> {
  const url = `${resolveBaseUrl()}${path}`;
  const token = getAuthToken?.();

  const res = await fetch(url, {
    method: opts.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined,
    signal: opts.signal,
  });

  const json = (await res.json()) as ApiEnvelope<T>;

  if (!res.ok || json.success === false) {
    const code = (json as { code?: ApiErrorCode }).code ?? statusToFallbackCode(res.status);
    const message = json.success === false ? json.error : "Lỗi không xác định";
    throw new ApiError(code, message, res.status);
  }

  return json.data;
}
