# Quickstart: Using the Extensible Editor

## Overview

The `NoteEditor` has been refactored to use a CodeMirror 6 engine. It supports a "Live Preview" mode where markdown syntax is hidden until the user edits that specific line/range.

## Usage

### Basic Implementation

```tsx
import { NoteEditor } from "@/components/editor/NoteEditor";

export default function Page() {
  return (
    <NoteEditor 
      path="folder/my-note.md"
      initialContent="# Hello World"
    />
  );
}
```

### Key Features

1.  **Live Preview**: Enabled by default. Click on a header to reveal the `#`. Click away to render it.
2.  **Search**: Press `Cmd+F` (Mac) or `Ctrl+F` (Windows) to open the integrated search bar.
3.  **Lists**: Automatic bullet formatting. Type `- ` to start a list.

## For Developers: Adding Extensions

The editor core is located at `components/editor/core`.

To add a new behavior (e.g., a "Word Count" tracker):

1.  Create a standard CodeMirror extension.
2.  Register it in `components/editor/core/extensions.ts`.

```typescript
// components/editor/extensions/word-count.ts
import { ViewPlugin, Decoration } from "@codemirror/view";

export const wordCountPlugin = ViewPlugin.fromClass(class {
  // ... implementation
});
```

## Troubleshooting

-   **Styles not loading**: Ensure `@codemirror/theme-one-dark` or the custom theme is imported.
-   **Search not working**: The search extension requires the document to be indexed; for huge files (>1MB), this might take a moment.
