import Header from "@/app/(pages)/components/Header";
import LeftSidebar from "@/app/(pages)/components/LeftSidebar";
import RightSidebar from "@/app/(pages)/components/RightSidebar";
import { SidebarProvider } from "@/app/(pages)/context/SideBarContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="font-medium mx-auto">
      <SidebarProvider>
        {/* Header */}
        <Header />

        {/* Main content */}
        <div className="flex items-start min-h-full">
          <div className="flex justify-between w-[100%]">
            {/* Left Sidebar */}
            <LeftSidebar />

            {/* Main Content Area */}
            <div className="min-h-screen w-[100%] px-4 py-10">{children}</div>

            {/* Right Sidebar */}
            <div className="hidden md:flex min-h-screen w-120 mr-4 mt-4">
              <RightSidebar />
            </div>
          </div>
        </div>
      </SidebarProvider>
    </main>
  );
}
