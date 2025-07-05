import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <div className="hidden md:block sm:w-[100px] md:w-[180px] lg:w-[240px] bg-white border-r border-gray-200">
        <Menu />
      </div>

      {/* Main Content */}
      <div className="flex-1 w-full flex flex-col h-full bg-[#F7F8FA]">
        <Navbar />
        <div className="p-2 flex-1 overflow-x-scroll">{children}</div>
      </div>
    </div>
  );
}
