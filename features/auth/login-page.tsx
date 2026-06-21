import { Suspense } from "react";
import { LoginForm } from "./components/login-form";

export function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-parchment px-4">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <h1 className="font-black text-2xl text-dark">Hangil Admin</h1>
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
