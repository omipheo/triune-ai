"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type MissionHUDProps = {
  fuelUsed: number;
  fuelCap: number;
};

export function MissionHUD({ fuelUsed, fuelCap }: MissionHUDProps) {
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <header className="glass-card sticky top-0 z-30 flex items-center justify-between border-b border-white/10 px-4 py-3">
      <Link href="/mission" className="flex items-center gap-2">
        <span className="text-xl font-bold text-[#FFD700]">T</span>
        <span className="font-semibold text-white">Triune AI</span>
      </Link>
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-white/5 px-3 py-1.5">
          <span className="text-xs text-[#94a3b8]">Fuel </span>
          <span className="font-mono font-medium text-[#FFD700]">
            {fuelCap - fuelUsed}/{fuelCap}
          </span>
        </div>
        <button
          type="button"
          onClick={handleSignOut}
          className="text-sm text-[#94a3b8] hover:text-white transition"
        >
          Sign out
        </button>
      </div>
    </header>
  );
}
