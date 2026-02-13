"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/mission", label: "Mission", icon: "◉" },
  { href: "/mission/vault", label: "Vault", icon: "◇" },
  { href: "/mission/support", label: "Support", icon: "?" },
];

export function MissionNav() {
  const pathname = usePathname();

  return (
    <nav className="glass-card fixed bottom-0 left-0 right-0 z-40 flex justify-around border-t border-white/10 py-2 pb-env(safe-area-inset-bottom)">
      {navItems.map(({ href, label, icon }) => {
        const isActive = pathname === href || (href !== "/mission" && pathname.startsWith(href));
        return (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center gap-0.5 px-6 py-2 text-sm transition ${
              isActive ? "text-[#FFD700]" : "text-[#94a3b8] hover:text-white"
            }`}
          >
            <span className="text-lg">{icon}</span>
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
