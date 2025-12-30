# Data Model: File Explorer State

## Explorer Store

The explorer store manages the UI state of the file navigation system.

### State: `ExplorerState`

| Field | Type | Description |
|-------|------|-------------|
| `expandedPaths` | `Record<string, boolean>` | Map of directory paths to their expansion state in the sidebar. |

### Actions

| Action | Description |
|--------|-------------|
| `toggleExpanded(path: string)` | Toggles the expansion state of a specific directory. |
| `setExpanded(path: string, expanded: boolean)` | Sets the expansion state of a specific directory. |
| `expandRecursively(path: string)` | Ensures all parent directories of the given path are expanded. |

## Relationships

- **Breadcrumb** → Calls `expandRecursively` when a directory segment is clicked.
- **SidebarTreeItem** → Subscribes to `expandedPaths` for its path to determine rendering.
