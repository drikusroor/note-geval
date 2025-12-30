# Tasks: Extensible Live Preview Editor

**Feature Branch**: `004-live-preview-editor`
**Status**: Pending

## Implementation Strategy

We will build the editor incrementally, starting with the **Extensible Foundation** (User Story 1), which involves setting up the CodeMirror 6 engine and the extension loading mechanism. Once the core is stable, we will implement the specific features (Live Preview, Contextual Styles, Lists, Search) as independent, pluggable extensions (User Stories 2-5). This ensures a clean separation of concerns and allows for independent testing of each feature.

---

## Phase 1: Setup

**Goal**: Initialize the project structure and install necessary dependencies for CodeMirror 6.

- [x] T001 Install CodeMirror 6 dependencies (`@codemirror/view`, `@codemirror/state`, `@codemirror/lang-markdown`, `@codemirror/language`, `@lezer/highlight`)
- [x] T002 Create directory structure `components/editor/core` and `components/editor/extensions`
- [x] T003 Create `components/editor/core/types.ts` to define extension interfaces

---

## Phase 2: Foundational (Blocking)

**Goal**: Build the core React wrapper for the editor and the extension registration system. (User Story 1)

**Independent Test**: The editor renders a basic text area with markdown highlighting, and a dummy extension can be loaded to modify text.

- [x] T004 [US1] Create `components/editor/core/index.tsx` (or `Editor.tsx`) initializing `EditorView` and `EditorState`
- [x] T005 [US1] Implement `useCodeMirror` hook in `components/editor/core/useCodeMirror.ts` to manage editor lifecycle
- [x] T006 [US1] Implement extension loader logic in `components/editor/core/extension-loader.ts` to accept an array of extensions
- [x] T007 [US1] Create unit tests for extension loader in `components/editor/core/extension-loader.test.ts`
- [x] T008 [US1] Create `components/editor/NoteEditor.tsx` as the main client component wrapping the core editor
- [x] T009 [US1] Add basic Markdown language support (`markdown()`) to the default extension set in `components/editor/core/defaults.ts`
- [x] T010 [US1] Verify editor renders and accepts input by running the app

---

## Phase 3: Live Preview Extension (User Story 2)

**Goal**: Implement the "Live Preview" mode where markdown syntax is hidden for non-active lines.

**Independent Test**: Headers (`#`) are hidden until the cursor is placed on that line.

- [x] T011 [US2] Create `components/editor/extensions/live-preview.ts`
- [x] T012 [US2] Implement `Decoration` logic to identify markdown headers and blockquotes in the syntax tree
- [x] T013 [US2] Implement `StateField` to track cursor position and determine the "active line"
- [x] T014 [US2] Create `replace` decorations to hide syntax characters for non-active lines
- [x] T015 [US2] Implement `ViewPlugin` to trigger re-decoration on cursor movement/selection change
- [x] T016 [US2] Create unit tests for Live Preview logic in `components/editor/extensions/live-preview.test.ts`
- [x] T017 [US2] Integrate `livePreview` extension into `NoteEditor.tsx` config

---

## Phase 4: Contextual Style Unfolding (User Story 3)

**Goal**: Implement inline style rendering (bold/italic) that only reveals syntax when the cursor touches the word.

**Independent Test**: `*italic*` text appears as rendered italic, revealing asterisks only when cursor enters the word.

- [x] T018 [US3] Create `components/editor/extensions/inline-styles.ts`
- [x] T019 [US3] Implement logic to identify inline style ranges (bold, italic) from the syntax tree
- [x] T020 [US3] Create `mark` decorations to apply CSS classes (e.g., `.cm-italic`) to the content
- [x] T021 [US3] Refine cursor detection logic to check for overlap with specific inline ranges (not just the whole line)
- [x] T022 [US3] Update decorations to "unfold" (reveal syntax) only when cursor overlaps the range
- [x] T023 [US3] Create unit tests for Inline Style logic in `components/editor/extensions/inline-styles.test.ts`
- [x] T024 [US3] Add necessary CSS styles for rendered markdown in `app/globals.css` (or a dedicated editor CSS module)

---

## Phase 5: Intelligent List Management (User Story 4)

**Goal**: Show bullets/numbers by default, revealing raw markers (`-`, `1.`) only when editing the marker itself.

**Independent Test**: List items show bullets. Moving cursor to the start of the line reveals `-`.

- [x] T025 [US4] Create `components/editor/extensions/list-handling.ts`
- [x] T026 [US4] Implement logic to identify list markers from the syntax tree
- [x] T027 [US4] Create `replace` decorations to swap markers with bullet/number widgets
- [x] T028 [US4] Implement "marker zone" detection (cursor at start of line) to disable the decoration
- [x] T029 [US4] Create unit tests for List Management logic in `components/editor/extensions/list-handling.test.ts`
- [x] T030 [US4] Integrate list extension into `NoteEditor.tsx`

---

## Phase 6: Integrated Search Highlighting (User Story 5)

**Goal**: Highlight search terms across the document, co-existing with other view modes.

**Independent Test**: `Cmd+F` opens search, typing highlights matches even in "previewed" lines.

- [x] T031 [US5] Create `components/editor/extensions/search.ts`
- [x] T032 [US5] Implement `SearchState` field to store the current query
- [x] T033 [US5] Implement logic to scan the document for matches and generate `mark` decorations
- [x] T034 [US5] Create unit tests for Search highlighting in `components/editor/extensions/search.test.ts`
- [x] T035 [US5] Create the Search UI component (search bar) in `components/editor/SearchPanel.tsx` (or reuse existing)
- [x] T036 [US5] Connect Search UI to the editor's `SearchState` via a dispatch transaction
- [x] T037 [US5] Ensure search highlights persist alongside Live Preview decorations (layering)

---

## Phase 7: Polish & Cross-Cutting

**Goal**: comprehensive testing, mobile responsiveness, and performance tuning.

- [x] T038 Verify mobile responsiveness (touch targets, virtual keyboard behavior)
- [x] T039 [P] Optimize extension performance (ensure decorations are only re-calculated for changed ranges)
- [x] T040 [P] Cleanup unused code/old editor components if applicable
- [x] T041 Final manual test of all user stories combined
- [ ] T042 [US3] Refine inline styles to reveal syntax when cursor is anywhere in the styled word
- [ ] T043 [US6] Implement heading sizing and styling (H1-H6) in `live-preview.ts` and `globals.css`

## Dependencies

- **Phase 2 (Foundation)** blocks **all subsequent phases**.
- **Phase 3, 4, 5, 6** can technically be developed in parallel, but sequential is recommended to isolate complexity.
- **Phase 3 (Live Preview)** logic for "hiding syntax" is the most complex and sets the pattern for Phases 4 & 5.
