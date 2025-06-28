import Header from "@/app/(pages)/components/Header";
import LeftSidebar from "@/app/(pages)/components/LeftSidebar";
import { SidebarProvider } from "@/app/(pages)/context/SideBarContext";
import { getUserFromCookie } from "@/lib/auth";
import { User } from "@/types";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserFromCookie();
  return (
    <main className="font-medium mx-auto">
      <SidebarProvider>
        {/* Header */}
        <Header />

        {/* Main content */}
        <div className="flex items-start min-h-full">
          <div className="flex justify-between w-[100%]">
            {/* Left Sidebar */}
            <LeftSidebar user={user as User} />

            {children}
          </div>
        </div>
      </SidebarProvider>
    </main>
  );
}
