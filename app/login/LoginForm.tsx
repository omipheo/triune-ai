"use client";

import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  const error = searchParams.get("error");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setMessage({ type: "error", text: error.message });
      return;
    }
    router.push("/mission");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 bg-[#0a0a0a]">
      <div className="glass-card w-full max-w-sm rounded-2xl p-8">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold text-white">Triune AI</h1>
          <p className="mt-1 text-sm text-[#94a3b8]">Command Bridge</p>
        </div>

        {error === "auth" && (
          <p className="mb-4 rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400">
            Authentication failed. Please try again.
          </p>
        )}
        {message && (
          <p
            className={`mb-4 rounded-lg px-3 py-2 text-sm ${
              message.type === "error"
                ? "bg-red-500/10 text-red-400"
                : "bg-[#FFD700]/10 text-[#FFD700]"
            }`}
          >
            {message.text}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-[#94a3b8] focus:border-[#FFD700]/50 focus:outline-none focus:ring-1 focus:ring-[#FFD700]/50"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-[#94a3b8] focus:border-[#FFD700]/50 focus:outline-none focus:ring-1 focus:ring-[#FFD700]/50"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#FFD700] px-4 py-3 font-medium text-[#0a0a0a] transition hover:bg-[#FFD700]/90 disabled:opacity-50"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#94a3b8]">
          No account?{" "}
          <Link href="/signup" className="text-[#FFD700] hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
