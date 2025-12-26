"use client";

import { useQuery } from "@tanstack/react-query";
import { ChevronRight, FileText, Folder } from "lucide-react";
import Link from "next/link";

interface FileInfo {
  path: string;
  name: string;
  isDirectory: boolean;
  lastModified: string;
}

export default function FileExplorer() {
  const {
    data: files,
    isLoading,
    error,
  } = useQuery<FileInfo[]>({
    queryKey: ["notes"],
    queryFn: () => fetch("/api/notes").then((res) => res.json()),
    refetchInterval: 30000, // Poll every 30 seconds
  });

  if (isLoading) return <div className="p-4">Loading notes...</div>;
  if (error)
    return <div className="p-4 text-destructive">Error loading notes</div>;

  return (
    <div className="flex flex-col h-full border-r bg-muted/30">
      <div className="p-4 border-b font-semibold">Notes</div>
      <div className="flex-1 overflow-y-auto">
        <nav className="p-2 space-y-1">
          {files?.map((file) => (
            <Link
              key={file.path}
              href={file.isDirectory ? `#` : `/notes/${file.path}`}
              className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors"
            >
              {file.isDirectory ? (
                <Folder className="w-4 h-4 text-blue-500" />
              ) : (
                <FileText className="w-4 h-4 text-muted-foreground" />
              )}
              <span className="flex-1 truncate">{file.name}</span>
              {file.isDirectory && (
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              )}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
