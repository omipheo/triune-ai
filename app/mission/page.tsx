import { createClient } from "@/lib/supabase/server";
import { MissionHUD } from "./MissionHUD";
import { MissionMap } from "./MissionMap";

export default async function MissionPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("node_cap, nodes_used")
    .eq("id", user.id)
    .single();

  const nodeCap = profile?.node_cap ?? 30;
  const nodesUsed = profile?.nodes_used ?? 0;
  const fuelRemaining = Math.max(0, nodeCap - nodesUsed);

  return (
    <>
      <MissionHUD fuelUsed={nodesUsed} fuelCap={nodeCap} />
      <main className="flex-1 overflow-auto px-4 pb-28 pt-2">
        <MissionMap />
      </main>
    </>
  );
}
