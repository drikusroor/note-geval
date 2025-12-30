# Research: Display current file path in the top bar

## Decision: Breadcrumb in EditorHeader

The primary "top bar" in the application is currently the `EditorHeader` component within the `NoteEditor`. Since the requirement is to see the path of the "currently opened file", placing it here is the most logical choice.

## Decision: Global Explorer Store for Navigation

To satisfy the requirement of "navigating via path components" (Priority: P2), clicking a directory in the breadcrumb needs to interact with the sidebar. Currently, sidebar expansion state is local to each `SidebarTreeItem` and persisted in `localStorage`. 

I will implement a global `useExplorerStore` using TanStack Store to track expanded paths. This will allow the Breadcrumb component to trigger sidebar expansions.

### Rationale
- **Consistency**: Centralizing sidebar state makes it easier to programmatically control it from other parts of the app (like the Breadcrumb).
- **UX**: When a user clicks a parent directory in the breadcrumb, they expect to see that directory in the context of the file tree.

## Decision: Custom Breadcrumb Component

I will create a lightweight Breadcrumb component using Tailwind CSS rather than importing a large library, keeping the bundle size small while ensuring full control over the "middle-truncation" behavior (Edge Case: Long Paths).

### Alternatives considered
- **Shadcn Breadcrumb**: Not currently installed. Installing it would add multiple files/dependencies for a relatively simple UI element.
- **Teleport/Portal**: Moving the entire Header to the Root Layout.
    - *Rejected because*: The current editor actions (Save, Revert) are tightly coupled with the `NoteEditor` state and mutations. Moving them would require significant refactoring of the editor state management.

## Technical Details

- **Path Parsing**: `path.split('/')`
- **Navigation Action**: `explorerStore.expand(directoryPath)`
- **Styling**: `flex flex-wrap`, `text-overflow: ellipsis` for long segments.
- **Mobile Target**: Ensure separators and segments have adequate spacing for touch.
