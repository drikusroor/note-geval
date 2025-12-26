import FileExplorer from "@/components/FileExplorer";
import FileSearch from "@/components/FileSearch";
import MobileNav from "@/components/MobileNav";
import SearchDialog from "@/components/SearchDialog";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="w-64 flex-shrink-0 hidden md:block">
        <FileExplorer />
      </aside>
      
      {/* Mobile Navigation */}
      <MobileNav />
      
      <main className="flex-1 relative overflow-y-auto bg-background">
        {children}
      </main>
      <SearchDialog />
      <FileSearch />
    </div>
  );
}
