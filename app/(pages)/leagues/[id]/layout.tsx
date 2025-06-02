import RightSidebar from "../../components/RightSidebar";

export default function LeagueClubsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="min-h-screen w-[100%] px-4 py-10">{children}</div>
      {/* Right Sidebar */}
      <div className="hidden md:flex min-h-screen w-120 mr-4 mt-4">
        <RightSidebar />
      </div>
    </>
  );
}
