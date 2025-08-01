import { getUserFromCookie } from "@/lib/auth";
import BackButton from "@/app/components/ui/BackButton";

export default async function UserDashboard() {
  return (
    <>
      <div className="flex items-center gap-2">
        <BackButton />
        <h1>Comming soon...</h1>
      </div>
    </>
  );
}
