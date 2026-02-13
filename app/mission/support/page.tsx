import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function SupportPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  return (
    <main className="flex-1 overflow-auto px-4 pb-28 pt-6">
      <h1 className="text-xl font-semibold text-white">Support</h1>
      <p className="mt-1 text-sm text-[#94a3b8]">Help & contact</p>
      <div className="glass-card mt-6 rounded-xl p-4">
        <p className="text-sm text-white">
          Triune AI – P6 Math Mastery Engine. For support, contact your school or the Triune team.
        </p>
      </div>
    </main>
  );
}
