"use client";

import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SidebarFilterProps {
  query: string;
  onQueryChange: (query: string) => void;
}

export default function SidebarFilter({
  query,
  onQueryChange,
}: SidebarFilterProps) {
  return (
    <div className="relative group">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none group-focus-within:text-foreground transition-colors" />
      <Input
        type="text"
        placeholder="Filter notes..."
        className="pl-9 pr-8 h-9 text-sm bg-muted/50 border-none focus-visible:ring-1 focus-visible:ring-ring"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
      />
      {query && (
        <button
          type="button"
          onClick={() => onQueryChange("")}
          className="absolute right-2 top-2.5 p-0.5 rounded-sm hover:bg-muted text-muted-foreground transition-colors"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </div>
  );
}
