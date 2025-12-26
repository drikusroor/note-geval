"use client";

import { useQuery } from "@tanstack/react-query";
import { FileText, Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === "f") {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const { data: results, isLoading } = useQuery({
    queryKey: ["search", query],
    queryFn: () =>
      query.length > 2
        ? fetch(`/api/search?q=${encodeURIComponent(query)}`).then((res) =>
            res.json(),
          )
        : Promise.resolve([]),
    enabled: query.length > 2,
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] bg-background/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl bg-card border rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[70vh]">
        <div className="flex items-center gap-2 p-4 border-b">
          <Search className="w-5 h-5 text-muted-foreground" />
          <input
            autoFocus
            className="flex-1 bg-transparent border-none outline-none text-lg"
            placeholder="Search notes content..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={() => setIsOpen(false)}>
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          {isLoading && <div className="p-4 text-center">Searching...</div>}
          {!isLoading && query.length > 2 && results?.length === 0 && (
            <div className="p-4 text-center text-muted-foreground">
              No results found
            </div>
          )}
          {results?.map((result: any) => (
            <button
              key={result.item.path}
              onClick={() => {
                router.push(`/notes/${result.item.path}`);
                setIsOpen(false);
              }}
              className="w-full flex flex-col gap-1 p-3 rounded-lg hover:bg-accent text-left transition-colors"
            >
              <div className="flex items-center gap-2 font-medium">
                <FileText className="w-4 h-4 text-muted-foreground" />
                {result.item.name}
              </div>
              <div className="text-sm text-muted-foreground truncate">
                {result.item.path}
              </div>
            </button>
          ))}
          {query.length <= 2 && (
            <div className="p-4 text-center text-muted-foreground">
              Type at least 3 characters to search
            </div>
          )}
        </div>

        <div className="p-2 border-t bg-muted/30 text-[10px] text-muted-foreground flex justify-center gap-4">
          <span>
            <kbd className="border rounded px-1 px-0.5">ESC</kbd> to close
          </span>
          <span>
            <kbd className="border rounded px-1 px-0.5">↑↓</kbd> to navigate
          </span>
          <span>
            <kbd className="border rounded px-1 px-0.5">ENTER</kbd> to select
          </span>
        </div>
      </div>
    </div>
  );
}
