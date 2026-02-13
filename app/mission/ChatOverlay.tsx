"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { VerbalMastery } from "./VerbalMastery";
import type { NodeId } from "@/lib/data/mastery-nodes";

type NodeDetail = { id: NodeId; title: string; slug: string } | null;

export function ChatOverlay() {
  const [openNode, setOpenNode] = useState<NodeDetail>(null);
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; text: string }[]>([]);

  useEffect(() => {
    const handler = (e: CustomEvent<{ node: NodeDetail }>) => {
      setOpenNode(e.detail.node);
      setMessages([]);
      setInputText("");
    };
    window.addEventListener("triune-open-node", handler as EventListener);
    return () => window.removeEventListener("triune-open-node", handler as EventListener);
  }, []);

  const close = useCallback(() => setOpenNode(null), []);

  const sendMessage = useCallback(
    (text: string) => {
      const t = text.trim();
      if (!t) return;
      setMessages((prev) => [...prev, { role: "user", text: t }]);
      setInputText("");
      // M2: call AI (DeepSeek/Qwen). For M1 we just echo a placeholder.
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Dr. Julian Sterling: Logic engine will be connected in Milestone 2. You said: \"" + t + "\"",
        },
      ]);
    },
    []
  );

  const handleTranscript = useCallback(
    (text: string) => {
      sendMessage(text);
    },
    [sendMessage]
  );

  return (
    <AnimatePresence>
      {openNode && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex flex-col bg-[#0a0a0a]"
        >
          {/* Header */}
          <div className="glass-card flex items-center justify-between border-b border-white/10 px-4 py-3">
            <button
              type="button"
              onClick={close}
              className="text-[#94a3b8] hover:text-white"
              aria-label="Close"
            >
              ← Back
            </button>
            <h2 className="font-semibold text-white">{openNode.title}</h2>
            <div className="w-14" />
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-auto px-4 py-4">
            {messages.length === 0 && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-[#94a3b8]">
                <p className="font-medium text-white">Dr. Julian Sterling</p>
                <p className="mt-1 text-sm">
                  Welcome to the {openNode.title} node. Use Verbal Mastery to respond, or type below.
                  The logic engine will be connected in the next milestone.
                </p>
              </div>
            )}
            {messages.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-3 ${m.role === "user" ? "text-right" : ""}`}
              >
                <span
                  className={`inline-block max-w-[85%] rounded-2xl px-4 py-2 text-sm ${
                    m.role === "user"
                      ? "bg-[#FFD700]/20 text-white"
                      : "glass-card text-left"
                  }`}
                >
                  {m.role === "assistant" && (
                    <span className="block text-xs text-[#FFD700]">Dr. Julian</span>
                  )}
                  {m.text}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Input: Verbal Mastery + text fallback */}
          <div className="glass-card border-t border-white/10 p-4 pb-env(safe-area-inset-bottom)">
            <VerbalMastery onTranscript={handleTranscript} />
            <div className="mt-4 flex gap-2">
              <input
                type="text"
                placeholder="Or type your answer…"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendMessage(inputText);
                }}
                className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder:text-[#94a3b8] focus:border-[#FFD700]/50 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => sendMessage(inputText)}
                className="rounded-xl bg-[#FFD700] px-4 py-2.5 font-medium text-[#0a0a0a]"
              >
                Send
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
