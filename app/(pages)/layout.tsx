import Header from "@/app/(pages)/components/Header";
import LeftSidebar from "@/app/(pages)/components/LeftSidebar";
import RightSidebar from "@/app/(pages)/components/RightSidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="font-medium mx-auto">
      {/* Header */}
      <Header />

      {/* Main content */}
      <div className="flex items-start min-h-full">
        <div className="flex justify-between w-[100%]">
          {/* Left Sidebar */}
          <div className="min-h-screen max-h-screen p-4 sticky min-w-65 top-20 left-0 border-r-2 border-gray-200">
            <LeftSidebar />
          </div>

          {/* Main Content Area */}
          <div className="min-h-screen w-[100%] p-4">{children}</div>

          {/* Right Sidebar */}
          <div className="min-h-screen w-120 mr-4 mt-4">
            <RightSidebar />
          </div>
        </div>
      </div>
    </main>
  );
}
