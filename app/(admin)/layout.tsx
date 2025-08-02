import { AdminSidebar } from "@/app/(admin)/components/Sidebar";
import { SidebarInset, SidebarProvider } from "@/app/components/ui/sidebar";
import Header from "@/app/(admin)/components/Header";

import { getUserFromCookie } from "@/lib/auth";
import { User } from "@/types";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  let user: User | null = null;

  try {
    user = await getUserFromCookie();
  } catch (error) {
    console.error("Failed to get user from cookie:", error);
    return <div>An error occured</div>;
  }

  return (
    <SidebarProvider>
      <AdminSidebar user={user as User} />
      <SidebarInset>
        <Header />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
