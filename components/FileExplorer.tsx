"use client";

import { useState } from "react";
import type { SortAttribute, SortDirection } from "@/lib/utils/tree";
import SidebarFilter from "./SidebarFilter";
import SidebarSort from "./SidebarSort";
import SidebarTree from "./SidebarTree";
import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";

export default function FileExplorer({ border = true }: { border?: boolean }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [query, setQuery] = useState("");
  const [sortAttr, setSortAttr] = useState<SortAttribute>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("sort-attr") as SortAttribute) || "name";
    }
    return "name";
  });
  const [sortDir, setSortDir] = useState<SortDirection>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("sort-dir") as SortDirection) || "asc";
    }
    return "asc";
  });

  const createNoteMutation = useMutation({
    mutationFn: async () => {
      const name = `Untitled-${Date.now()}.md`;
      const res = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, content: "" }),
      });
      if (!res.ok) throw new Error("Failed to create note");
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["notes", "recursive"] });
      router.push(`/notes/${data.path}`);
    },
  });

  const handleSortAttrChange = (attr: SortAttribute) => {
    setSortAttr(attr);
    localStorage.setItem("sort-attr", attr);
  };

  const handleSortDirChange = (dir: SortDirection) => {
    setSortDir(dir);
    localStorage.setItem("sort-dir", dir);
  };

  return (
    <div className={`flex flex-col h-full bg-muted/30 ${border ? "border-r" : ""}`}>
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-sm tracking-tight">Notes</h2>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => createNoteMutation.mutate()}
              disabled={createNoteMutation.isPending}
              title="New Note"
              aria-label="New note"
            >
              <Plus className="h-4 w-4" />
            </Button>
            <SidebarSort
              attribute={sortAttr}
              direction={sortDir}
              onAttributeChange={handleSortAttrChange}
              onDirectionChange={handleSortDirChange}
            />
          </div>
        </div>
        <SidebarFilter query={query} onQueryChange={setQuery} />
      </div>
      <div className="flex-1 overflow-y-auto">
        <SidebarTree
          filterQuery={query}
          sortCriteria={{ attribute: sortAttr, direction: sortDir }}
        />
      </div>
      <div className="p-4 border-t bg-muted/50 flex items-center justify-between">
        <ThemeToggle />
        <span className="text-xs text-muted-foreground italic">Note Geval</span>
      </div>
    </div>
  );
}
