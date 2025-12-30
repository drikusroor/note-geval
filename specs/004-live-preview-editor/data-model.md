# Data Model: Extensible Live Preview Editor

## Core Entities

### EditorState
Represents the immutable state of the editor at a specific point in time. (Mapped from CodeMirror `EditorState`)

| Field | Type | Description |
|-------|------|-------------|
| `doc` | `Text` | The full document content as a sequence of lines/characters. |
| `selection` | `EditorSelection` | Current cursor position(s) and selected ranges. |
| `plugins` | `Extension[]` | List of active extensions modifying behavior/view. |
| `config` | `FacetMap` | Configuration values (e.g., "live preview enabled"). |

### Extension (Concept)
A module that adds functionality. Not a data record, but a functional unit.

| Component | Purpose |
|-----------|---------|
| `StateField` | Stores reactive state (e.g., "current search query"). |
| `ViewPlugin` | interact with the DOM (e.g., "scroll to match"). |
| `Decoration` | Modifies the visual rendering of text. |

### Decoration
A visual transformation applied to a range of text.

| Type | Description | Use Case |
|------|-------------|----------|
| `Mark` | Adds CSS class/style to text. | Bold, Italic, Search Highlight. |
| `Widget` | Inserts a DOM element. | Checkboxes, Images (future). |
| `Replace` | Hides text or replaces it with a widget. | Hiding `#`, `*`, `[link]`. |

## Extension-Specific Models

### LivePreviewState
Logic for determining visibility.

- **Input**: `doc`, `selection`, `syntaxTree`
- **Output**: `DecorationSet`
- **Logic**:
  1. Iterate syntax tree.
  2. For each syntax node (header token, emphasis token):
     - If cursor overlaps node range -> Show (No decoration).
     - If cursor outside node range -> Hide (Apply `Replace` decoration).

### SearchState
Logic for search highlighting.

| Field | Type | Description |
|-------|------|-------------|
| `query` | `string` | The current search term. |
| `matches` | `Range[]` | List of positions matching the query. |
| `currentIdx` | `number` | Index of the currently focused match. |

- **Logic**:
  1. On `query` change -> scan `doc`.
  2. Generate `Decoration.mark({ class: "search-result" })` for all matches.
  3. Generate `Decoration.mark({ class: "search-result-active" })` for `matches[currentIdx]`.
