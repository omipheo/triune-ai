import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function VaultPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("node_cap, nodes_used, email, full_name")
    .eq("id", user.id)
    .single();

  return (
    <main className="flex-1 overflow-auto px-4 pb-28 pt-6">
      <h1 className="text-xl font-semibold text-white">Vault</h1>
      <p className="mt-1 text-sm text-[#94a3b8]">Account & stats</p>
      <div className="glass-card mt-6 rounded-xl p-4">
        <p className="text-sm text-[#94a3b8]">Email</p>
        <p className="font-medium text-white">{profile?.email ?? user.email}</p>
        <p className="mt-3 text-sm text-[#94a3b8]">Fuel (Nodes)</p>
        <p className="font-medium text-[#FFD700]">
          {profile?.nodes_used ?? 0} / {profile?.node_cap ?? 30} used
        </p>
        <p className="mt-2 text-xs text-[#94a3b8]">
          Refuel (PayNow/CC) will be available in Milestone 3.
        </p>
      </div>
    </main>
  );
}
