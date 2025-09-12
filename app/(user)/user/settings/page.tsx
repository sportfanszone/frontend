export const dynamic = "force-dynamic";
import SettingsSection from "@/app/(user)/components/settings/SettingsSection";
import { getUserFromCookie } from "@/lib/auth";
import { User } from "@/types";

export default async function UserDashboard() {
  const user = await getUserFromCookie();

  return (
    <div className="min-h-screen w-[100%] px-4 py-10">
      <main className="font-medium max-w-400 mx-auto px-4">
        <section className="w-full max-w-300 mx-auto">
          <SettingsSection user={user as User} />
        </section>
      </main>
    </div>
  );
}
