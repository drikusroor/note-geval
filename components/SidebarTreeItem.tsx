"use client";

import * as Collapsible from "@radix-ui/react-collapsible";
import { ChevronDown, ChevronRight, FileText, Folder } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useExplorerStore } from "@/lib/store/useExplorerStore";
import type { TreeNode } from "@/lib/utils/tree";

interface SidebarTreeItemProps {
  node: TreeNode;
  level?: number;
}

export default function SidebarTreeItem({
  node,
  level = 0,
}: SidebarTreeItemProps) {
  const pathname = usePathname();
  const { isExpanded, setExpanded } = useExplorerStore();
  const isOpen = isExpanded(node.path);

  const toggleOpen = (open: boolean) => {
    setExpanded(node.path, open);
  };

  const isActive = pathname === `/notes/${node.path}`;

  if (!node.isDirectory) {
    return (
      <Link
        href={`/notes/${node.path}`}
        className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded-md transition-colors animate-in fade-in duration-200 ${
          isActive
            ? "bg-primary text-primary-foreground font-medium"
            : "hover:bg-accent text-muted-foreground hover:text-foreground"
        }`}
        style={{ paddingLeft: `${(level + 1) * 12}px` }}
      >
        <FileText className="w-4 h-4 shrink-0" />
        <span className="truncate">{node.name}</span>
      </Link>
    );
  }

  return (
    <Collapsible.Root open={isOpen} onOpenChange={toggleOpen}>
      <Collapsible.Trigger
        className={`w-full flex items-center gap-2 px-3 py-1.5 text-sm rounded-md hover:bg-accent transition-colors animate-in fade-in duration-200 text-muted-foreground hover:text-foreground group`}
        style={{ paddingLeft: `${(level + 1) * 12}px` }}
      >
        <div className="shrink-0">
          {isOpen ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </div>
        <Folder className="w-4 h-4 shrink-0 text-blue-500" />
        <span className="truncate flex-1 text-left">{node.name}</span>
      </Collapsible.Trigger>
      <Collapsible.Content className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
        {node.children?.map((child) => (
          <SidebarTreeItem key={child.path} node={child} level={level + 1} />
        ))}
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
