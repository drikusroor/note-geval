# Tasks: Display current file path in the top bar

**Input**: Design documents from `/specs/006-file-path-display/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, quickstart.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Ensure baseline build and linting integrity.

- [x] T001 Verify current build capability (`bun run build`)
- [x] T002 [P] Run linting and type checking (`bun run lint && bun run check-types`)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure for global sidebar state.

- [x] T003 Create `lib/store/useExplorerStore.ts` with basic toggle/expanded state
- [x] T004 Create unit tests for `useExplorerStore.ts` in `lib/store/useExplorerStore.test.ts`
- [x] T005 [P] Refactor `components/SidebarTreeItem.tsx` to subscribe to `useExplorerStore` instead of local state
- [x] T006 Verify that sidebar still functions (expands/collapses) as before

**Checkpoint**: Foundation ready - global explorer state is working.

---

## Phase 3: User Story 1 - View current file location (Priority: P1) 🎯 MVP

**Goal**: Display the note's relative path in the `EditorHeader`.

**Independent Test**: Open a note and see the breadcrumb path in the top bar.

### Tests for User Story 1

- [x] T007 [P] [US1] Create unit test for path splitting logic in `lib/utils/path.test.ts`
- [x] T008 [US1] Create component test for `EditorHeader` breadcrumb rendering in `components/editor/EditorHeader.test.tsx`

### Implementation for User Story 1

- [x] T009 [P] [US1] Implement path splitting utility in `lib/utils/path.ts`
- [x] T010 [US1] Update `components/editor/EditorHeader.tsx` to render path breadcrumbs instead of "Live Preview Editor" text
- [x] T011 [US1] Add responsive styling to breadcrumbs in `components/editor/EditorHeader.tsx` (ensure it fits on mobile)
- [x] T012 [US1] Verify path updates correctly when switching between different notes

**Checkpoint**: User Story 1 complete - path is visible.

---

## Phase 4: User Story 2 - Navigate via path components (Priority: P2)

**Goal**: Make breadcrumb segments clickable to expand directories in the sidebar.

**Independent Test**: Click a parent directory in the breadcrumb and see the sidebar expand to that directory.

### Implementation for User Story 2

- [x] T013 [US2] Add `expandRecursively(path)` action to `lib/store/useExplorerStore.ts`
- [x] T014 [US2] Update `lib/store/useExplorerStore.test.ts` to test recursive expansion
- [x] T015 [US2] Make breadcrumb directory segments in `components/editor/EditorHeader.tsx` interactive (button/link)
- [x] T016 [US2] Wire breadcrumb clicks to `expandRecursively` in `components/editor/EditorHeader.tsx`

**Checkpoint**: User Story 2 complete - breadcrumbs are interactive.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories and edge cases.

- [x] T017 Implement middle-truncation for long paths in `components/editor/EditorHeader.tsx`
- [x] T018 [P] Add a simple "Welcome / Application Name" header to `app/(dashboard)/page.tsx` for the neutral state
- [x] T019 Run final verification (`bun run lint`, `bun run check-types`, `bun test`, `bun run build`)
- [x] T020 [P] Validate all scenarios in `quickstart.md`