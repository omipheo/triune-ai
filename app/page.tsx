import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function HomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/mission");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 bg-[#0a0a0a]">
      <div className="glass-card max-w-sm rounded-2xl p-8 text-center">
        <h1 className="text-2xl font-semibold text-white">Triune AI</h1>
        <p className="mt-2 text-[#94a3b8]">P6 Math Mastery Engine. Command Bridge.</p>
        <div className="mt-8 flex flex-col gap-3">
          <Link
            href="/login"
            className="rounded-xl bg-[#FFD700] px-6 py-3 font-medium text-[#0a0a0a] transition hover:bg-[#FFD700]/90"
          >
            Sign in
          </Link>
          <Link
            href="/signup"
            className="rounded-xl border border-white/20 px-6 py-3 font-medium text-white transition hover:bg-white/5"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
