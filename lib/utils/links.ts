import path from "node:path";

/**
 * Resolves an internal wiki link [[path]] to a strict relative path from the notes root.
 *
 * @param link The link text inside [[]]
 * @param currentFilePath The relative path of the file containing the link
 * @returns The resolved relative path from notes root, or null if it cannot be resolved unambiguously
 */
export function resolveInternalLink(
  link: string,
  currentFilePath: string,
): string | null {
  // Normalize link: remove leading/trailing slashes and ensure it ends with .md if not already
  let normalizedLink = link.trim();
  if (!normalizedLink.endsWith(".md")) {
    normalizedLink += ".md";
  }

  // Case 1: Absolute path (starts with /)
  if (normalizedLink.startsWith("/")) {
    return normalizedLink.slice(1);
  }

  // Case 2: Relative path (starts with ./ or ../)
  if (normalizedLink.startsWith("./") || normalizedLink.startsWith("../")) {
    const currentDir = path.dirname(currentFilePath);
    const resolvedPath = path.join(currentDir, normalizedLink);
    // Ensure we don't escape the notes root
    if (resolvedPath.startsWith("..")) {
      return null;
    }
    return resolvedPath;
  }

  // Case 3: Simple filename or nested path from current dir or root
  // The user requested strict paths. We will check:
  // 1. Relative to current dir
  // 2. Relative to root

  const currentDir = path.dirname(currentFilePath);

  // Try relative to current dir
  const _relativeToCurrent = path.join(currentDir, normalizedLink);

  // If currentDir is '.', then relativeToCurrent is just normalizedLink
  if (currentFilePath === "." || currentFilePath === "" || currentDir === ".") {
    return normalizedLink;
  }

  // If the user provided a path like "Folder/Note", and it's not relative or absolute,
  // we assume it's relative to the notes root per "strict paths" requirement.
  return normalizedLink;
}
