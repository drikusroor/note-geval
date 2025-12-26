export interface TreeNode {
  name: string;
  path: string; // Relative path from root
  isDirectory: boolean;
  children?: TreeNode[];
  lastModified?: Date;
}

export function buildTree(files: any[]): TreeNode[] {
  const root: TreeNode[] = [];
  const map: { [key: string]: TreeNode } = {};

  // Sort files by path length to ensure parents are processed before children
  const sortedFiles = [...files].sort(
    (a, b) => a.path.split("/").length - b.path.split("/").length,
  );

  for (const file of sortedFiles) {
    const node: TreeNode = {
      name: file.name,
      path: file.path,
      isDirectory: file.isDirectory,
      lastModified: file.lastModified ? new Date(file.lastModified) : undefined,
      children: file.isDirectory ? [] : undefined,
    };

    map[file.path] = node;

    const pathParts = file.path.split("/");
    if (pathParts.length === 1) {
      root.push(node);
    } else {
      const parentPath = pathParts.slice(0, -1).join("/");
      const parent = map[parentPath];
      if (parent?.children) {
        parent.children.push(node);
      } else {
        // Fallback: if parent not found in map, add to root
        root.push(node);
      }
    }
  }

  // Sort children: folders first, then alphabetically
  const sortNodes = (nodes: TreeNode[]) => {
    nodes.sort((a, b) => {
      if (a.isDirectory && !b.isDirectory) return -1;
      if (!a.isDirectory && b.isDirectory) return 1;
      return a.name.localeCompare(b.name);
    });
    for (const node of nodes) {
      if (node.children) {
        sortNodes(node.children);
      }
    }
  };

  sortNodes(root);

  // Filter out directories that don't contain any .md files recursively
  const filterEmptyDirs = (nodes: TreeNode[]): TreeNode[] => {
    return nodes.filter((node) => {
      if (!node.isDirectory) {
        return node.name.endsWith(".md");
      }
      if (node.children) {
        node.children = filterEmptyDirs(node.children);
        return node.children.length > 0;
      }
      return false;
    });
  };

  return filterEmptyDirs(root);
}
