import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { MissionNav } from "./MissionNav";
import { ChatOverlay } from "./ChatOverlay";

export default async function MissionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  return (
    <div className="flex min-h-screen flex-col bg-[#0a0a0a] safe-area-pb">
      {children}
      <MissionNav />
      <ChatOverlay />
    </div>
  );
}
