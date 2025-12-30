"use client";

import { useQuery } from "@tanstack/react-query";
import { FileText, Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function FileSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "p") {
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

  useEffect(() => {
    if (isOpen && inputRef.current) {
      // Use setTimeout to ensure the input is rendered before focusing
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  }, [isOpen]);

  const { data: files } = useQuery({
    queryKey: ["notes"],
    queryFn: () => fetch("/api/notes").then((res) => res.json()),
  });

  const filteredFiles = query
    ? files?.filter(
        // biome-ignore lint/suspicious/noExplicitAny: intended use
        (f: any) =>
          !f.isDirectory && f.name.toLowerCase().includes(query.toLowerCase()),
      )
    : // biome-ignore lint/suspicious/noExplicitAny: intended use
      files?.filter((f: any) => !f.isDirectory);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] bg-background/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg bg-card border rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[70vh]">
        <div className="flex items-center gap-2 p-4 border-b">
          <Search className="w-5 h-5 text-muted-foreground" />
          <input
            ref={inputRef}
            className="flex-1 bg-transparent border-none outline-none text-lg"
            placeholder="Search files..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="button" onClick={() => setIsOpen(false)}>
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          {/* biome-ignore lint/suspicious/noExplicitAny: intended use */}
          {filteredFiles?.slice(0, 10).map((file: any) => (
            <button
              type="button"
              key={file.path}
              onClick={() => {
                router.push(`/notes/${file.path}`);
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-accent text-left transition-colors"
            >
              <FileText className="w-4 h-4 text-muted-foreground" />
              <div className="flex flex-col">
                <span className="font-medium">{file.name}</span>
                <span className="text-xs text-muted-foreground">
                  {file.path}
                </span>
              </div>
            </button>
          ))}
          {filteredFiles?.length === 0 && (
            <div className="p-4 text-center text-muted-foreground">
              No files found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
