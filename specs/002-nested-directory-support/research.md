# Research: Nested Directory Support

## Recursive Tree UI in Sidebar

### Decision
Use a recursive React component with Radix UI `Collapsible` or a custom tree implementation using Tailwind CSS for a lightweight, sleek experience.

### Rationale
- Radix UI primitives are already part of the project's design system (`shadcn/ui` pattern).
- Recursive components are the standard way to handle arbitrarily deep nested structures in React.
- To ensure performance with many files, we can use client-side state to track expanded/collapsed nodes.

### Alternatives Considered
- `react-accessible-treeview`: More feature-rich but might introduce unnecessary bundle size and styling complexity.

## Path Resolution for Internal Links

### Decision
Implement a strict path resolution utility that supports both relative (`../`, `./`) and absolute (from notes root) paths.

### Rationale
- The user explicitly requested "strict paths" to avoid ambiguity.
- Absolute-from-root (e.g., `[[Folder/Subfolder/Note]]`) is easy to resolve.
- Relative paths (e.g., `[[../Sibling]]`) require context of the current file's location.
- If a link is too vague (e.g., just `[[Note]]` when multiple exist in different subdirs), it will be treated as broken unless it exists in the current directory or root.

### Alternatives Considered
- Fuzzy matching for links: Rejected by user in favor of strictness.

## Recursive Search & Indexing

### Decision
Extend the existing `fuse.js` indexing logic to include the full relative path in the searchable keys.

### Rationale
- Including the path in the index allows users to find files by folder name as well as filename.
- The relative path provided in search results gives the user necessary context for duplicate filenames.

### Alternatives Considered
- Scoped search (searching only within a folder): Could be a future enhancement but not requested for the initial implementation.
