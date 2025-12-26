"use client";

import { useState } from "react";
import type { SortAttribute, SortDirection } from "@/lib/utils/tree";
import SidebarFilter from "./SidebarFilter";
import SidebarSort from "./SidebarSort";
import SidebarTree from "./SidebarTree";

export default function FileExplorer() {
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

  const handleSortAttrChange = (attr: SortAttribute) => {
    setSortAttr(attr);
    localStorage.setItem("sort-attr", attr);
  };

  const handleSortDirChange = (dir: SortDirection) => {
    setSortDir(dir);
    localStorage.setItem("sort-dir", dir);
  };

  return (
    <div className="flex flex-col h-full border-r bg-muted/30">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-sm tracking-tight">Notes</h2>
          <SidebarSort
            attribute={sortAttr}
            direction={sortDir}
            onAttributeChange={handleSortAttrChange}
            onDirectionChange={handleSortDirChange}
          />
        </div>
        <SidebarFilter query={query} onQueryChange={setQuery} />
      </div>
      <div className="flex-1 overflow-y-auto">
        <SidebarTree
          filterQuery={query}
          sortCriteria={{ attribute: sortAttr, direction: sortDir }}
        />
      </div>
    </div>
  );
}
