/**
 * Splits a file path into segments for breadcrumb display.
 * Example: "notes/work/project-a/todo.md" -> ["notes", "work", "project-a", "todo.md"]
 */
export function splitPath(path: string): string[] {
  if (!path) return [];
  return path.split("/").filter((segment) => segment.length > 0);
}

/**
 * Gets the cumulative paths for each segment.
 * Example: ["notes", "work", "todo.md"] -> ["notes", "notes/work", "notes/work/todo.md"]
 */
export function getCumulativePaths(segments: string[]): string[] {
  const paths: string[] = [];
  let currentPath = "";
  for (const segment of segments) {
    currentPath = currentPath ? `${currentPath}/${segment}` : segment;
    paths.push(currentPath);
  }
  return paths;
}
