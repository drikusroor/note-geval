"use client";

import { useQuery } from "@tanstack/react-query";
import { buildTree } from "@/lib/utils/tree";
import SidebarTreeItem from "./SidebarTreeItem";

export default function SidebarTree() {
  const {
    data: files,
    isLoading,
    error,
  } = useQuery<any[]>({
    queryKey: ["notes", "recursive"],
    queryFn: () => fetch("/api/notes?recursive=true").then((res) => res.json()),
    refetchInterval: 30000,
  });

  if (isLoading)
    return (
      <div className="p-4 text-sm text-muted-foreground">Loading notes...</div>
    );
  if (error)
    return (
      <div className="p-4 text-sm text-destructive">Error loading notes</div>
    );

  const tree = files ? buildTree(files) : [];

  return (
    <div className="py-2">
      {tree.map((node) => (
        <SidebarTreeItem key={node.path} node={node} />
      ))}
    </div>
  );
}
