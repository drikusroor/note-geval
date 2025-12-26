"use client";

import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import {
  buildTree,
  filterTree,
  type SortCriteria,
  sortTree,
} from "@/lib/utils/tree";
import SidebarTreeItem from "./SidebarTreeItem";

interface SidebarTreeProps {
  filterQuery: string;
  sortCriteria: SortCriteria;
}

export default function SidebarTree({
  filterQuery,
  sortCriteria,
}: SidebarTreeProps) {
  const {
    data: files,
    isLoading,
    error,
  } = useQuery<any[]>({
    queryKey: ["notes", "recursive"],
    queryFn: () => fetch("/api/notes?recursive=true").then((res) => res.json()),
    refetchInterval: 30000,
  });

  const tree = useMemo(() => {
    if (!files) return [];
    let processedTree = buildTree(files);
    if (filterQuery) {
      processedTree = filterTree(processedTree, filterQuery);
    }
    return sortTree(processedTree, sortCriteria);
  }, [files, filterQuery, sortCriteria]);

  if (isLoading)
    return (
      <div className="p-4 text-sm text-muted-foreground">Loading notes...</div>
    );
  if (error)
    return (
      <div className="p-4 text-sm text-destructive">Error loading notes</div>
    );

  if (tree.length === 0 && filterQuery) {
    return (
      <div className="p-8 text-center">
        <p className="text-sm text-muted-foreground italic">
          No notes match your filter.
        </p>
      </div>
    );
  }

  return (
    <div className="py-2">
      {tree.map((node) => (
        <SidebarTreeItem key={node.path} node={node} />
      ))}
    </div>
  );
}
