import Header from "@/app/(pages)/components/Header";
import LeftSidebar from "@/app/(pages)/components/LeftSidebar";
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

            {children}
          </div>
        </div>
      </SidebarProvider>
    </main>
  );
}
