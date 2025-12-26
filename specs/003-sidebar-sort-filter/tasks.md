# Tasks: Sidebar Sorting and Filtering

**Input**: Design documents from `specs/003-sidebar-sort-filter/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/api.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 [P] Update `FileInfo` interface and implementation in `lib/fs.ts` to include `createdAt` (birthtime)
- [x] T002 [P] Update `TreeNode` interface in `lib/utils/tree.ts` to include `createdAt` and `size`
- [x] T003 Verify build capability (`bun run build`)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

- [x] T004 Implement `filterTree` recursive logic in `lib/utils/tree.ts`
- [x] T005 Implement `sortTree` recursive logic in `lib/utils/tree.ts` (Folders first)
- [x] T006 [P] Add unit tests for `sortTree` and `filterTree` in `lib/utils/tree.test.ts`

**Checkpoint**: Foundation ready - recursive sort and filter logic functional.

---

## Phase 3: User Story 1 - Sort Files in Sidebar (Priority: P1) 🎯 MVP

**Goal**: Sort files in the sidebar by name, created date, modified date, and size.

**Independent Test**: Select a sort option in the sidebar and verify the file order matches the expected sequence for that attribute.

### Implementation for User Story 1

- [x] T007 [P] [US1] Create `SidebarSort` component using `shadcn/ui` DropdownMenu in `components/SidebarSort.tsx`
- [x] T008 [US1] Integrate `SidebarSort` into `components/FileExplorer.tsx`
- [x] T009 [US1] Implement sort state management and `localStorage` persistence in `components/SidebarTree.tsx`
- [x] T010 [US1] Apply `sortTree` logic to the fetched file list in `components/SidebarTree.tsx`
- [x] T011 [US1] Verify US1: Sorting by name, date, and size works correctly with folders first.

**Checkpoint**: Sidebar sorting is functional and persistent.

---

## Phase 4: User Story 2 - Filter Files in Sidebar (Priority: P1)

**Goal**: Filter files in the sidebar by name using a search input.

**Independent Test**: Type a keyword in the sidebar filter and verify that only matching files and their parent folders are displayed.

### Implementation for User Story 2

- [x] T012 [P] [US2] Create `SidebarFilter` component using `shadcn/ui` Input in `components/SidebarFilter.tsx`
- [x] T013 [US2] Integrate `SidebarFilter` into `components/FileExplorer.tsx`
- [x] T014 [US2] Implement filter state management in `components/SidebarTree.tsx`
- [x] T015 [US2] Apply `filterTree` logic before sorting in `components/SidebarTree.tsx`
- [x] T016 [US2] Verify US2: Real-time filtering preserves hierarchy and correctly hides/shows notes.

**Checkpoint**: Sidebar filtering is functional and real-time.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Final refinements and project-wide checks.

- [x] T017 [P] Add transition animations for filtering results in `components/SidebarTreeItem.tsx`
- [x] T018 [P] Add "No results found" state to the sidebar tree in `components/SidebarTree.tsx`
- [x] T019 Execute final project-wide build and lint check (`bun run lint && bun run build`)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Independent.
- **Foundational (Phase 2)**: Depends on Phase 1 completion. BLOCKS all user stories.
- **User Story 1 (Phase 3)**: Depends on Phase 2 completion.
- **User Story 2 (Phase 4)**: Depends on Phase 2 completion. (Can run in parallel with US1)
- **Polish (Phase 5)**: Depends on all user stories being complete.

### Parallel Opportunities

- Setup tasks (T001, T002) can run in parallel.
- Foundational tests (T006) can run in parallel with implementation (T004, T005).
- US1 UI (T007) and US2 UI (T012) can run in parallel.
- US1 and US2 implementation in `SidebarTree.tsx` (T009, T014) can be done together or sequentially.

---

## Implementation Strategy

### MVP First (User Story 1 & 2)

1. Complete Setup + Foundational.
2. Complete US1 (Sorting).
3. Complete US2 (Filtering).
4. **VALIDATE**: Ensure sidebar is organized and searchable.

### Incremental Delivery

1. Foundation ready.
2. Add Sorting (US1) -> Improved navigation.
3. Add Filtering (US2) -> Rapid discovery.
4. Polish.
