# Quickstart: File Path Breadcrumbs

## Overview
This feature adds a breadcrumb navigation to the top of the note editor, allowing users to see the full path of the current note and navigate to parent directories.

## Key Components

### 1. `EditorHeader` Enhancement
The `EditorHeader` component now receives the `path` and renders the breadcrumb on the left side, replacing the static "Live Preview Editor" text.

### 2. `useExplorerStore`
A new global store for managing sidebar expansion.
```typescript
const { toggleExpanded, expandRecursively } = useExplorerStore();
```

## How to use

### View Path
Simply open any note. The path will appear in the top bar:
`notes > work > project-a > todo.md`

### Navigate to Parent
Click on any directory segment (e.g., `work`) in the breadcrumb. 
1. The sidebar will automatically expand to show the `work` directory.
2. The user can then select other files in that directory from the sidebar.

## Truncation Behavior
If the path is too long for the screen, middle segments will be truncated with `...` to ensure the filename is always visible.
