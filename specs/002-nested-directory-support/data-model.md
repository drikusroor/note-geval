# Data Model: Nested Directory Support

## Hierarchical Directory Representation

The application needs to transform a flat list of files (from the FS) into a tree structure for the sidebar.

### Tree Node (Client-side)
```typescript
interface TreeNode {
  name: string;
  path: string; // Relative path from root
  isDirectory: boolean;
  children?: TreeNode[];
  lastModified?: Date;
}
```

## Internal Link Resolution Logic

### Absolute Path
`[[Folder/Note]]` -> Resolved relative to the notes root.

### Relative Path
`[[./Note]]` or `[[../Note]]` -> Resolved relative to the current file's directory.

### Filename Only
`[[Note]]` -> Resolved only if `Note` exists in:
1. The current directory.
2. The root directory.
Otherwise, treated as ambiguous/broken per strict path requirement.
