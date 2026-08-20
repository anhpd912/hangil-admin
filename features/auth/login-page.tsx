import { Suspense } from "react";
import { LoginForm } from "./components/login-form";

export function LoginPage() {
  return (
    <main className="grid min-h-[100dvh] bg-parchment lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)]">
      <section className="hidden flex-col justify-between bg-dark px-14 py-14 lg:flex">
        <p className="text-[22px] font-extrabold leading-none text-parchment">한길</p>
        <div>
          <p className="font-mono-label text-[11px] uppercase tracking-[0.16em] text-parchment/45">
            Khu vực quản trị
          </p>
          <p className="mt-4 max-w-[26ch] text-[2rem] font-extrabold leading-[1.15] text-parchment">
            Bảng điều khiển vận hành Hangil.
          </p>
        </div>
        <p className="font-mono-label max-w-[38ch] text-[11px] leading-5 text-parchment/40">
          Chỉ tài khoản có quyền admin mới truy cập được. Mọi thao tác đều được máy chủ kiểm tra lại.
        </p>
      </section>

      <section className="flex items-center px-6 py-16 sm:px-12">
        <div className="flex w-full max-w-[380px] flex-col gap-8">
          <div>
            <p className="font-mono-label text-[11px] uppercase tracking-[0.14em] text-muted-ink">Hangil Admin</p>
            <h1 className="mt-2 text-[1.75rem] font-extrabold leading-tight text-dark">Đăng nhập</h1>
          </div>
          <Suspense>
            <LoginForm />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
