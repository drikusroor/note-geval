# Feature Specification: Extensible Live Preview Editor

**Feature Branch**: `004-live-preview-editor`  
**Created**: 2025-12-28  
**Status**: Draft  
**Input**: User description: "to enhance the ux on smaller devices we need an integrated combined preview-editor, similar to what obsidian does... you proposed user story 5 as a separate story, but i think it should be at the core of the earlier 4 stories. the extension/hook/plugin system should help us with user stories 1-4, or not? what do you think?"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Extensible Editor Foundation (Priority: P1)

As a developer, I want the editor to be built on an extension-first architecture where every feature (rendering, syntax hiding, search) is a pluggable module, so that the system remains maintainable and core logic is decoupled from specific markdown behaviors.

**Why this priority**: This architecture is the foundation. By making the "Live Preview" logic an extension itself, we ensure that user stories 2-4 can be implemented as additional, independent modules that interact with the same core state.

**Independent Test**: Can be tested by loading the editor with no extensions (shows raw text) and then adding a "Capitalization" extension that transforms text. If it works, the foundation is valid.

**Acceptance Scenarios**:

1. **Given** the editor component, **When** no extensions are loaded, **Then** it behaves as a standard raw text editor.
2. **Given** a "decorator" extension is registered, **When** text matches its criteria, **Then** the editor applies the specified visual transformations without changing the underlying markdown file.

---

### User Story 2 - Live Preview Extension (Priority: P1)

As a user, I want the editor to automatically render markdown and hide syntax characters for all lines except the one I am currently editing, powered by the core extension system.

**Why this priority**: This provides the primary user value of an "integrated combined preview-editor" (like Obsidian).

**Independent Test**: Load the "Live Preview" extension. Open a markdown file. All lines should be rendered. Place cursor on a header; it should reveal the `#`.

**Acceptance Scenarios**:

1. **Given** a note with markdown headers, **When** the Live Preview extension is active, **Then** headers show as rendered HTML elements by default.
2. **Given** the cursor is on a line, **Then** the extension "unfolds" that specific line to show raw markdown characters.

---

### User Story 3 - Contextual Style Unfolding (Priority: P2)

As a writer, I want to see rendered styles (bold, italic) even on the active line, and only see the markdown symbols (`*`, `_`) when my cursor is specifically **inside or at the edge of** that styled word.

**Why this priority**: Refines the UX to be less jarring. This is implemented as a "Style Unfolder" extension.

**Independent Test**: Place cursor on a line with *italics*. Edit the start of the line. The word should stay italic. Move cursor into the word (middle or edge); it should reveal `*italics*`.

**Acceptance Scenarios**:

1. **Given** the cursor is on a line with styled text, **When** the cursor is NOT inside a styled range, **Then** the text remains rendered.
2. **Given** the cursor enters a styled range (start, middle, or end), **Then** the extension reveals the markdown syntax for that specific range only.

---

### User Story 4 - Intelligent List Management (Priority: P2)

As a user creating lists, I want to see bullets/numbers by default, but see raw markers (`-`, `1.`) when my cursor is at the start of the list item.

**Why this priority**: Standardizes list editing behavior via a specialized list extension.

**Acceptance Scenarios**:

1. **Given** a list item, **When** the cursor is in the text body, **Then** the marker shows as a bullet point.
2. **Given** the cursor is moved to the marker position, **Then** the bullet becomes a `-` or `*`.

---

### User Story 5 - Integrated Search Highlighting (Priority: P3)

As a user, I want search terms to be highlighted across the document, regardless of whether lines are currently in "preview" or "edit" mode.

**Why this priority**: Demonstrates the power of the extension system by overlaying search results on top of rendered markdown.

**Acceptance Scenarios**:

1. **Given** a search query, **When** the Search extension is active, **Then** all matches are highlighted with a distinct background color.
2. **Given** a highlighted match on a non-active line, **Then** the match remains visible through the rendered markdown.

### Edge Cases

- **Plugin Conflicts**: What happens if two plugins try to decorate the same range differently? (Assume a priority system or "last-one-wins").
- **Performance**: Many extensions running on a large document (100k+ chars). Extensions must be optimized to only process visible or recently changed ranges.
- **Overlapping Styles**: A bold word inside an italic sentence. Both extension states must resolve correctly relative to cursor position.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The Editor MUST provide a standard API for registering "Extension" modules.
- **FR-002**: The Extension API MUST allow modules to define "Decorations" that modify the visual display of text ranges without altering the document source.
- **FR-003**: The Editor MUST support "State Field" extensions that can track custom data (like search queries or cursor proximity).
- **FR-004**: The "Live Preview" feature MUST be implemented as an Extension that maps markdown nodes to visual styles.
- **FR-005**: The Editor MUST automatically re-evaluate decorations when the cursor position or text content changes.
- **FR-006**: The Search extension MUST be able to overlay visual highlights across the entire document, co-existing with the Live Preview extension.
- **FR-007**: The Editor MUST support "Block-level" unfolding (whole lines) and "Inline-level" unfolding (specific words).
- **FR-008**: The system MUST implement a Plugin/Extension API that allows external code to:
    1.  Access current editor content.
    2.  Decorate text ranges (add visual styles).
    3.  Handle key events.
- **FR-009**: The editor MUST render content correctly on mobile viewports (responsive design).
- **FR-010**: Headings MUST be rendered with distinct font sizes/weights corresponding to their level (H1-H6).

### Key Entities

- **Extension**: A pluggable unit of logic that can provide decorations or handle events.
- **Decoration**: A visual attribute (CSS class, widget, or replacement) applied to a text range.
- **Editor State**: The source of truth containing document text and current extension data.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: The core editor component (without extensions) remains under 500 lines of code.
- **SC-002**: "Live Preview" behavior (syntax hiding) can be toggled on/off by simply adding or removing the extension from the editor config.
- **SC-003**: Search highlighting remains accurate and performant (no visible lag) while the user is actively typing in a 2000-word document.
- **SC-004**: Total memory overhead for 5 active extensions remains under 50MB for average notes.
