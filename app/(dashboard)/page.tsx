export default function DashboardPage() {
  return (
    <div className="flex items-center justify-center h-full text-muted-foreground p-4">
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
  );
}
