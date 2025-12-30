"use client";

import { ChevronDown, ChevronUp, Search, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface InternalSearchProps {
  content: string;
}

// biome-ignore lint/correctness/noUnusedFunctionParameters: intended use
export default function InternalSearch({ content }: InternalSearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [isFuzzy, setIsFuzzy] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "f" && !e.shiftKey) {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      // Use setTimeout to ensure the input is rendered before focusing
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="absolute top-4 right-4 z-40 w-80 bg-card border rounded-lg shadow-lg overflow-hidden animate-in slide-in-from-top-2">
      <div className="flex items-center gap-2 p-2 bg-muted/50">
        <Search className="w-4 h-4 text-muted-foreground" />
        <input
          ref={inputRef}
          className="flex-1 bg-transparent border-none outline-none text-sm"
          placeholder={isFuzzy ? "Fuzzy search..." : "Find in note..."}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="button"
          onClick={() => setIsFuzzy(!isFuzzy)}
          className={`p-1 rounded ${isFuzzy ? "bg-primary text-primary-foreground" : "hover:bg-accent"}`}
          title="Toggle Fuzzy Match"
        >
          <Sparkles className="w-3 h-3" />
        </button>
        <div className="flex border-l pl-2 gap-1">
          <button type="button" className="p-1 hover:bg-accent rounded">
            <ChevronUp className="w-4 h-4 text-muted-foreground" />
          </button>
          <button type="button" className="p-1 hover:bg-accent rounded">
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-accent rounded"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
}
