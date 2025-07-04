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
  const user = await getUserFromCookie();

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
