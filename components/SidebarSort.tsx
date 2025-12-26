"use client";

import {
  ArrowDownAZ,
  Calendar,
  Clock,
  HardDrive,
  ListFilter,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { SortAttribute, SortDirection } from "@/lib/utils/tree";

interface SidebarSortProps {
  attribute: SortAttribute;
  direction: SortDirection;
  onAttributeChange: (attr: SortAttribute) => void;
  onDirectionChange: (dir: SortDirection) => void;
}

export default function SidebarSort({
  attribute,
  direction,
  onAttributeChange,
  onDirectionChange,
}: SidebarSortProps) {
  return (
    <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="p-1 rounded-md hover:bg-accent text-muted-foreground transition-colors"
                title="Sort notes"
              >
                <ListFilter className="w-4 h-4" />
              </button>
            </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>Sort By</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={attribute}
          onValueChange={(v) => onAttributeChange(v as SortAttribute)}
        >
          <DropdownMenuRadioItem value="name" className="gap-2">
            <ArrowDownAZ className="w-4 h-4" />
            <span>Name</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="modifiedAt" className="gap-2">
            <Clock className="w-4 h-4" />
            <span>Modified At</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="createdAt" className="gap-2">
            <Calendar className="w-4 h-4" />
            <span>Created At</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="size" className="gap-2">
            <HardDrive className="w-4 h-4" />
            <span>Size</span>
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Order</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={direction}
          onValueChange={(v) => onDirectionChange(v as SortDirection)}
        >
          <DropdownMenuRadioItem value="asc">Ascending</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="desc">Descending</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
