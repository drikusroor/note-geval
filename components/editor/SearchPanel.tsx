"use client";

import type { EditorView } from "@codemirror/view";
import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { setSearchQuery } from "./extensions/search";

interface SearchPanelProps {
  view: EditorView | null;
  onClose: () => void;
}

export function SearchPanel({ view, onClose }: SearchPanelProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    if (view) {
      view.dispatch({
        effects: setSearchQuery.of(newQuery),
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <div className="absolute top-4 right-4 z-40 w-80 bg-card border rounded-lg shadow-lg overflow-hidden animate-in slide-in-from-top-2">
      <div className="flex items-center gap-2 p-2 bg-muted/50">
        <Search className="w-4 h-4 text-muted-foreground" />
        <input
          placeholder="Search..."
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <button
          type="button"
          onClick={onClose}
          className="p-1 hover:bg-accent rounded"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>
    </div>
  );
}
