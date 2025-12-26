import SidebarTree from "./SidebarTree";

export default function FileExplorer() {
  return (
    <div className="flex flex-col h-full border-r bg-muted/30">
      <div className="p-4 border-b font-semibold">Notes</div>
      <div className="flex-1 overflow-y-auto">
        <SidebarTree />
      </div>
    </div>
  );
}
