import { UserProvider } from "@/app/context/UserContext";
import { getUserFromCookie } from "@/lib/auth";

export async function Providers({ children }: { children: React.ReactNode }) {
  const user = await getUserFromCookie();
  return <UserProvider initialUser={user}>{children}</UserProvider>;
}
