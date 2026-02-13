"use client";

import { motion } from "framer-motion";
import { MASTERY_NODES } from "@/lib/data/mastery-nodes";
import { NodeCard } from "./NodeCard";

// For M1 we don't have progress from DB yet – first node is "active", rest locked.
// In M2 we'll load mastered/current from profile or a progress table.
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

export function MissionMap() {
  return (
    <motion.ul
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-3"
    >
      {MASTERY_NODES.map((node, index) => (
        <motion.li key={node.id} variants={item}>
          <NodeCard
            node={node}
            state={index === 0 ? "active" : "locked"}
            order={index + 1}
          />
        </motion.li>
      ))}
    </motion.ul>
  );
}
