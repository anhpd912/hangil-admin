"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient, signIn, signOutAndClearToken } from "@/shared/auth/auth-client";

type SessionUser = { role?: string; email?: string };

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(
    searchParams.get("error") === "admin_required" ? "Tài khoản này không có quyền admin." : null,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const { error: signInError } = await signIn.email({ email, password });
      if (signInError) {
        setError(signInError.status === 401 ? "Email hoặc mật khẩu không đúng." : (signInError.message ?? "Đăng nhập thất bại."));
        return;
      }

      // Xác thực quyền ngay tại đây thay vì để AdminGuard tự phát hiện: user thường
      // đăng nhập đúng mật khẩu sẽ bị đá về /login mà không hiểu vì sao.
      const { data: session } = await authClient.getSession();
      const user = session?.user as SessionUser | undefined;
      if (user?.role !== "admin") {
        await signOutAndClearToken();
        setError("Tài khoản này không có quyền admin.");
        return;
      }

      const redirect = searchParams.get("redirect");
      router.replace(redirect?.startsWith("/") ? redirect : "/admin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lỗi không xác định");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="font-mono-label text-[11px] uppercase tracking-[0.12em] text-muted">
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="username"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-2xl border border-dark/15 bg-cream px-4 py-3 text-[15px] text-dark outline-none transition-colors focus:border-dark/60"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="font-mono-label text-[11px] uppercase tracking-[0.12em] text-muted">
          Mật khẩu
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="rounded-2xl border border-dark/15 bg-cream px-4 py-3 text-[15px] text-dark outline-none transition-colors focus:border-dark/60"
        />
      </div>
      {error && (
        <p role="alert" className="rounded-2xl border border-red/30 bg-red/5 px-4 py-3 text-sm text-red">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-full bg-dark px-4 py-3 text-[15px] font-semibold text-parchment transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
      </button>
    </form>
  );
}
