# Research: Sidebar Sorting and Filtering

## Sorting Recursive Trees in React

### Decision
Implement a recursive sort function that applies to each level of the `TreeNode` structure.

### Rationale
- Standard file explorers sort at each directory level (folders first, then files).
- This maintains the hierarchical structure while providing the expected ordering within each "folder".
- To ensure performance, sorting should be performed whenever the data changes or the sort criteria changes, but not on every render.

### Alternatives Considered
- Flattening the tree for sorting: This would break the directory hierarchy, which is essential for the user experience.

## Filtering Recursive Trees

### Decision
Implement a filter function that keeps a node if:
1. Its name matches the filter string (case-insensitive).
2. Any of its children satisfy the filter criteria.

### Rationale
- This "inclusive" filtering ensures that users can find files deep within subdirectories while still seeing the path (parent folders) to get there.
- If a folder matches, all its children should probably be shown (or just the folder itself?). Usually, showing children of a matching folder is preferred unless the filter is specifically for files. We will stick to: show node if match OR if child matches.

## UI Patterns

### Decision
- **Filter**: A small search input at the very top of the sidebar.
- **Sort**: A "Sort By" button (icon-only or small text) that opens a `DropdownMenu` (from `shadcn/ui`).
- **Layout**: Place them in a single row or stacked at the top of the `FileExplorer`.

### Rationale
- Consistent with VS Code and Obsidian layouts.
- Minimizes vertical space usage.

## State Persistence

### Decision
Use `localStorage` to store the user's preferred sort attribute and direction.

### Rationale
- Next.js Client Components can easily access `window.localStorage` in `useEffect`.
- This ensures a consistent experience when the user returns to the app.
