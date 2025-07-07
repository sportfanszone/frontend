import Header from "@/app/components/layout/UserHeader";
import LeftSidebar from "@/app/(pages)/components/LeftSidebar";
import { SidebarProvider } from "@/app/(pages)/context/SideBarContext";
import { getUserFromCookie } from "@/lib/auth";
import { User } from "@/types";
import LoginSuccessAlert from "./components/dashboard/LoginSuccessAlert";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserFromCookie();
  return (
    <main className="font-medium mx-auto bg-gray-100">
      <SidebarProvider>
        {/* Header */}
        <Header user={user as User} />

        {/* Main content */}
        <div className="flex items-start min-h-full">
          <div className="flex justify-between w-[100%]">
            {/* Left Sidebar */}
            <LeftSidebar user={user as User} />
            {children}
          </div>
        </div>
        <LoginSuccessAlert />
      </SidebarProvider>
    </main>
  );
}
