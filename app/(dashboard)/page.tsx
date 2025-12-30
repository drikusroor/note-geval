export default function DashboardPage() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center p-3 md:p-2 border-b bg-muted/50">
        <span className="text-xs font-mono text-muted-foreground px-2">
          Note Geval
        </span>
      </div>
      <div className="flex-1 flex items-center justify-center text-muted-foreground p-4">
        <div className="text-center max-w-md">
          <h2 className="text-xl md:text-2xl font-semibold mb-2">
            Welcome to Note Geval
          </h2>
          <p className="text-sm md:text-base">
            Select a note from the sidebar to start editing.
          </p>
          <p className="text-xs md:text-sm mt-4 md:hidden">
            Tap the menu button in the top-left corner to browse your notes.
          </p>
        </div>
      </div>
    </div>
  );
}
