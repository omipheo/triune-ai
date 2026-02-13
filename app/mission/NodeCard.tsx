"use client";

import { motion } from "framer-motion";
import type { NodeId } from "@/lib/data/mastery-nodes";

type NodeState = "locked" | "active" | "mastered";

type NodeCardProps = {
  node: { id: NodeId; title: string; slug: string };
  state: NodeState;
  order: number;
};

export function NodeCard({ node, state, order }: NodeCardProps) {
  const isLocked = state === "locked";
  const isActive = state === "active";
  const isMastered = state === "mastered";

  return (
    <motion.button
      type="button"
      onClick={() => {
        if (isLocked) return;
        // Open Dr. Julian chat overlay – we'll use a client context or URL state
        window.dispatchEvent(
          new CustomEvent("triune-open-node", { detail: { node } })
        );
      }}
      disabled={isLocked}
      className={`glass-card w-full rounded-xl p-4 text-left transition flex items-center gap-4 ${
        isLocked
          ? "opacity-60 cursor-not-allowed"
          : "cursor-pointer hover:bg-white/[0.08]"
      } ${isActive ? "ring-2 ring-[#FFD700] glow-gold" : ""} ${
        isMastered ? "border-[#FFD700]/50" : ""
      }`}
      whileTap={isLocked ? undefined : { scale: 0.98 }}
    >
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-lg font-bold ${
          isLocked
            ? "bg-white/10 text-[#94a3b8]"
            : isMastered
              ? "bg-[#FFD700]/20 text-[#FFD700]"
              : "bg-[#FFD700]/10 text-[#FFD700]"
        }`}
      >
        {isMastered ? "✓" : order}
      </span>
      <div className="min-w-0 flex-1">
        <p
          className={`font-medium ${
            isLocked ? "text-[#94a3b8]" : "text-white"
          }`}
        >
          {node.title}
        </p>
        <p className="text-xs text-[#94a3b8]">
          {isLocked
            ? "Locked"
            : isMastered
              ? "Mastered"
              : "Active — Tap to begin"}
        </p>
      </div>
      {!isLocked && (
        <span className="text-[#94a3b8]">→</span>
      )}
    </motion.button>
  );
}
