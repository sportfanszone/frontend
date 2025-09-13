import Header from "@/app/components/layout/UserHeader";
import LeftSidebar from "@/app/(pages)/components/LeftSidebar";
import { SidebarProvider } from "@/app/(pages)/context/SideBarContext";
import { getUserFromCookie } from "@/lib/auth";
import { User } from "@/types";
import { UserProvider } from "@/app/context/UserContext";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserFromCookie();
  return (
    <UserProvider initialUser={user as User}>
      <SidebarProvider>
        <main className="font-medium mx-auto bg-gray-100">
          {/* Header */}
          <Header />

          {/* Main content */}
          <div className="flex items-start min-h-full">
            <div className="flex justify-between w-[100%]">
              {/* Left Sidebar */}
              <LeftSidebar />

              {children}
            </div>
          </div>
        </main>
      </SidebarProvider>
    </UserProvider>
  );
}
