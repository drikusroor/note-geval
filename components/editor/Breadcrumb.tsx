"use client";

import { ChevronRight } from "lucide-react";
import { useExplorerStore } from "@/lib/store/useExplorerStore";
import { getCumulativePaths, splitPath } from "@/lib/utils/path";

interface BreadcrumbProps {
  path: string;
}

export function Breadcrumb({ path }: BreadcrumbProps) {
  const segments = splitPath(path);
  const cumulativePaths = getCumulativePaths(segments);
  const { expandRecursively } = useExplorerStore();

  const handleSegmentClick = (segmentPath: string, isLast: boolean) => {
    if (!isLast) {
      expandRecursively(segmentPath);
    }
  };

  // Truncation logic: if more than 4 segments, show first, ellipsis, and last two
  const shouldTruncate = segments.length > 4;
  const visibleSegments = shouldTruncate
    ? [
        { segment: segments[0], index: 0 },
        { segment: "...", index: -1 },
        { segment: segments[segments.length - 2], index: segments.length - 2 },
        { segment: segments[segments.length - 1], index: segments.length - 1 },
      ]
    : segments.map((s, i) => ({ segment: s, index: i }));

  return (
    <nav className="flex items-center text-xs font-medium text-muted-foreground overflow-hidden whitespace-nowrap px-2">
      {visibleSegments.map((item, displayIndex) => {
        const { segment, index } = item;
        const isLast = index === segments.length - 1;
        const isEllipsis = index === -1;
        const segmentPath = isEllipsis ? "" : cumulativePaths[index];

        return (
          <div
            key={isEllipsis ? `ellipsis-${displayIndex}` : segmentPath}
            className="flex items-center min-w-0"
          >
            {displayIndex > 0 && (
              <ChevronRight className="w-3 h-3 mx-1 flex-shrink-0" />
            )}
            {isEllipsis ? (
              <span className="flex-shrink-0">...</span>
            ) : (
              <button
                type="button"
                onClick={() => handleSegmentClick(segmentPath, isLast)}
                className={`truncate hover:text-foreground transition-colors ${
                  isLast ? "text-foreground font-bold" : ""
                } ${!isLast ? "cursor-pointer" : "cursor-default"}`}
                title={segment}
              >
                {segment}
              </button>
            )}
          </div>
        );
      })}
    </nav>
  );
}
