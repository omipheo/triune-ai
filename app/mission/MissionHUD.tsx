"use client";

import Link from "next/link";

type MissionHUDProps = {
  fuelUsed: number;
  fuelCap: number;
};

export function MissionHUD({ fuelUsed, fuelCap }: MissionHUDProps) {
  return (
    <header className="glass-card sticky top-0 z-30 flex items-center justify-between border-b border-white/10 px-4 py-3">
      <Link href="/mission" className="flex items-center gap-2">
        <span className="text-xl font-bold text-[#FFD700]">T</span>
        <span className="font-semibold text-white">Triune AI</span>
      </Link>
      <div className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-1.5">
        <span className="text-xs text-[#94a3b8]">Fuel</span>
        <span className="font-mono font-medium text-[#FFD700]">
          {fuelCap - fuelUsed}/{fuelCap}
        </span>
      </div>
    </header>
  );
}
