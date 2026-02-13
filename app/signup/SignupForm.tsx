"use client";

import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);
  const router = useRouter();
  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: `${typeof window !== "undefined" ? window.location.origin : ""}/auth/callback`,
      },
    });
    setLoading(false);
    if (error) {
      setMessage({ type: "error", text: error.message });
      return;
    }
    setMessage({
      type: "success",
      text: "Check your email for the confirmation link.",
    });
    router.refresh();
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 bg-[#0a0a0a]">
      <div className="glass-card w-full max-w-sm rounded-2xl p-8">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold text-white">Triune AI</h1>
          <p className="mt-1 text-sm text-[#94a3b8]">Create account</p>
        </div>

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
            type="text"
            placeholder="Full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-[#94a3b8] focus:border-[#FFD700]/50 focus:outline-none focus:ring-1 focus:ring-[#FFD700]/50"
          />
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
            placeholder="Password (min 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-[#94a3b8] focus:border-[#FFD700]/50 focus:outline-none focus:ring-1 focus:ring-[#FFD700]/50"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#FFD700] px-4 py-3 font-medium text-[#0a0a0a] transition hover:bg-[#FFD700]/90 disabled:opacity-50"
          >
            {loading ? "Creating account…" : "Sign up"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#94a3b8]">
          Already have an account?{" "}
          <Link href="/login" className="text-[#FFD700] hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
