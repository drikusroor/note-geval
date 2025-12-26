# Tasks: Nested Directory Support

**Input**: Design documents from `specs/002-nested-directory-support/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/api.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 [P] Install Radix UI Collapsible component (`bun add @radix-ui/react-collapsible`)
- [x] T002 Verify existing build capability (`bun run build`)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

- [x] T003 Implement `buildTree` utility to convert flat file list to hierarchical structure in `lib/utils/tree.ts`
- [x] T004 Update `listFiles` in `lib/fs.ts` to support optional recursive traversal
- [x] T005 Update `GET /api/notes` route in `app/api/notes/route.ts` to support `recursive` query parameter

**Checkpoint**: Foundation ready - recursive file listing and tree conversion functional.

---

## Phase 3: User Story 1 - Recursive Sidebar Navigation (Priority: P1)

**Goal**: Navigate through a multi-level directory structure in the sidebar.

**Independent Test**: Create a 3-level deep directory structure and verify the sidebar renders it as an expandable tree.

### Implementation for User Story 1

- [x] T006 [P] [US1] Create `SidebarTreeItem` recursive component in `components/SidebarTreeItem.tsx`
- [x] T007 [US1] Create `SidebarTree` component in `components/SidebarTree.tsx` (uses `SidebarTreeItem`)
- [x] T008 [US1] Replace simple file list with `SidebarTree` in `components/FileExplorer.tsx`
- [x] T009 [US1] Implement expansion state persistence (client-side) in `components/SidebarTree.tsx`

**Checkpoint**: Sidebar navigation supports nested folders.

---

## Phase 4: User Story 2 - Deep Search (Priority: P1)

**Goal**: Search content regardless of its location in the hierarchy.

**Independent Test**: Search for a keyword in a deeply nested file and verify it appears with its relative path.

### Implementation for User Story 2

- [x] T010 [US2] Update `getSearchIndex` in `lib/search.ts` to use recursive file listing
- [x] T011 [US2] Update `SearchDialog` results UI to display relative paths in `components/SearchDialog.tsx`
- [x] T012 [US2] Update `FileSearch` results UI to display relative paths in `components/FileSearch.tsx`

**Checkpoint**: Global search works across all subdirectories.

---

## Phase 5: User Story 3 - Cross-Directory Internal Links (Priority: P1)

**Goal**: Use Obsidian-style links that correctly resolve to notes in different subdirectories.

**Independent Test**: Click a relative link `[[../note]]` and verify it navigates to the correct subdirectory.

### Implementation for User Story 3

- [x] T013 [US3] Implement `resolveInternalLink` utility supporting absolute and relative paths in `lib/utils/links.ts`
- [x] T014 [US3] Update `markdownToHtml` in `lib/markdown.ts` to use `resolveInternalLink`
- [x] T015 [US3] Update `Preview` component to pass current file path context to `markdownToHtml` in `components/Preview.tsx`
- [x] T016 [US3] Add unit tests for `resolveInternalLink` in `tests/lib/links.test.ts`

**Checkpoint**: Internal links resolve correctly across directories.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Performance and edge case refinements.

- [x] T017 [P] Optimize `buildTree` for large file collections (>1000 files)
- [x] T018 Handle empty folders and non-markdown files filtering in `lib/utils/tree.ts`
- [x] T019 Final project-wide build and lint check (`bun run lint && bun run build`)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Independent.
- **Foundational (Phase 2)**: Depends on Setup. BLOCKS all user stories.
- **User Stories (Phase 3-5)**: All depend on Foundational completion.
- **Polish (Phase 6)**: Depends on all user stories.

### Execution Plan

1. Complete Foundational (T003-T005) to enable data flow.
2. Implement Sidebar Navigation (US1) to allow manual verification.
3. Implement Deep Search (US2) to allow content discovery.
4. Implement Internal Links (US3) to complete the knowledge graph.
5. Final polish and build check.

---

## Parallel Opportunities

- T001 (Radix install) and T002 (Build check)
- T006 (Recursive item component) can start as soon as `TreeNode` interface is defined in `lib/utils/tree.ts` (T003)
- T011 and T012 (Search UI updates) can run in parallel after T010.

---

## Implementation Strategy

### MVP First (User Story 1 & 2)

1. Complete Foundation.
2. Complete US1 & US2 to provide full visibility and searchability of the nested vault.
3. Verify via `quickstart.md` steps.

### Incremental Delivery

1. Foundation ready.
2. Sidebar works (US1) -> Hierarchical navigation possible.
3. Search works (US2) -> Global discovery possible.
4. Links work (US3) -> Inter-note navigation possible.
5. Polish and verify.
