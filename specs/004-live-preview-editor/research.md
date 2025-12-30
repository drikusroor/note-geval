# Research: Editor Engine Choice

**Feature**: Live Preview Markdown Editor
**Date**: 2025-12-28

## Decision: CodeMirror 6

We will use **CodeMirror 6** as the core engine for the extensible live preview editor.

### Rationale

1.  **Obsidian Compatibility**: The user explicitly requested an experience "similar to what Obsidian does". Obsidian migrated to CodeMirror 6 (from CM5) specifically to enable their Live Preview mode. Replicating this behavior is most naturally done with the same underlying engine.
2.  **Performance & Virtualization**: CodeMirror 6 is designed for code. It handles large documents (10k+ lines) with virtualization out of the box. Slate.js and ProseMirror often struggle with performance on very large, flat text documents without significant custom optimization.
3.  **Decoration System**: CodeMirror 6's architecture is built around "State Fields" and "Decorations" (Replace, Widget, Mark). This maps 1:1 with the requirements:
    - *Hide syntax*: `Decoration.replace({})`
    - *Show syntax on cursor*: Filter decorations based on selection range.
    - *Inline styles*: `Decoration.mark({ class: "font-bold" })`
4.  **Markdown-First**: Unlike ProseMirror/Slate which convert Markdown to a nested DOM tree (effectively changing the data model), CodeMirror keeps the "Truth" as a flat text string. This ensures 100% fidelity when saving back to disk—no weird serialization bugs where syntax changes.

### Alternatives Considered

#### ProseMirror
- **Pros**: Stronger "Rich Text" capabilities, widely used for WYSIWYG (e.g., Tiptap).
- **Cons**: Converts Markdown to a custom JSON tree. "Live Preview" requires complex schema mapping to ensure the hidden syntax is preserved exactly as typed. Overkill for "just hiding syntax".

#### Slate.js
- **Pros**: React-native, easy to understand for React devs.
- **Cons**: History of breaking changes. Performance issues with large documents. The "contenteditable" abstraction leaks more often than CodeMirror's robust controller.

## Technical Strategy

- **@codemirror/lang-markdown**: For parsing and syntax tree generation.
- **@codemirror/view**: For the `EditorView` and `Decoration` API.
- **@codemirror/state**: For `EditorState`, `StateField` (extensions), and `Transaction`.
- **@lezer/highlight**: For syntax highlighting.

We will build a React wrapper (`NoteEditor.tsx`) that initializes the `EditorView` and manages the lifecycle, but the core logic (Live Preview) will be a pure CodeMirror Extension.
