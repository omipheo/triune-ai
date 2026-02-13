import { Suspense } from "react";
import { LoginForm } from "./LoginForm";

export const dynamic = "force-dynamic";

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a] text-[#94a3b8]">
          Loading…
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
