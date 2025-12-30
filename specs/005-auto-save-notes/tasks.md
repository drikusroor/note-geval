# Tasks: Auto-save and session persistence for notes

**Input**: Design documents from `/specs/005-auto-save-notes/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/notes.yaml

**Tests**: Unit and integration tests using `bun test` and React Testing Library are included to ensure reliability of the state management and auto-save logic.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3, US4)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Create directory structure for new components and hooks in `components/editor/` and `lib/hooks/`
- [X] T002 Verify project build capability with existing code (`bun run build`)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

- [X] T003 Implement `lib/store/useSettings.ts` for managing `UserSettings` (localStorage)
- [X] T004 Implement `lib/store/useNoteStore.ts` for session state management using TanStack Store
- [X] T005 [P] Add `sessionStorage` persistence sync to `useNoteStore` in `lib/store/useNoteStore.ts`
- [X] T006 [P] Create `lib/hooks/useAutoSave.ts` hook with debounce logic (custom setTimeout)
- [X] T007 [P] Create unit tests for `useAutoSave` logic in `lib/hooks/useAutoSave.test.ts`

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 2 - Unsaved Changes & Session Persistence (Priority: P1) 🎯 MVP

**Goal**: Restore unsaved edits when navigating between notes during a session and show an "Unsaved" indicator.

**Independent Test**: Disable auto-save, edit a note, navigate to another note, navigate back, and verify the edits are restored from the store and an "Unsaved" dot is visible.

### Implementation for User Story 2

- [X] T008 [P] [US2] Create `components/editor/EditorHeader.tsx` to host indicators and buttons
- [X] T009 [US2] Refactor `components/editor/NoteEditor.tsx` to read and write content from `useNoteStore`
- [X] T010 [US2] Implement "Unsaved" dot indicator in `components/editor/EditorHeader.tsx` based on `isDirty` state
- [X] T011 [US2] Integrate `EditorHeader` into `components/editor/NoteEditor.tsx` layout
- [X] T012 [US2] Verify session persistence between note navigation in `app/(dashboard)/notes/[...path]/page.tsx`

**Checkpoint**: Session persistence is functional; users can navigate without losing work.

---

## Phase 4: User Story 1 - Auto-save Editing (Priority: P1)

**Goal**: Automatically save note content to the backend after a 2-second debounce.

**Independent Test**: Enable auto-save, edit a note, wait 2 seconds, and verify a successful `PUT` request to `/api/notes/[path]`.

### Implementation for User Story 1

- [X] T013 [US1] Add "Auto-save" toggle switch to `components/editor/EditorHeader.tsx` connected to `useSettings`
- [X] T014 [US1] Integrate `useAutoSave` hook into `components/editor/NoteEditor.tsx`
- [X] T015 [US1] Map `useAutoSave` to the existing save mutation in `components/editor/NoteEditor.tsx`
- [X] T016 [US1] Ensure `isDirty` is cleared and `lastSavedContent` updated upon successful auto-save in `useNoteStore.ts`

**Checkpoint**: Auto-save is fully functional and triggered asynchronously.

---

## Phase 5: User Story 3 - Revert Changes (Priority: P2)

**Goal**: Discard unsaved session changes and return to the version on disk.

**Independent Test**: Edit a note, click "Revert", confirm dialog, and verify content resets to last saved version.

### Implementation for User Story 3

- [X] T017 [US3] Add "Revert" button (Lucide `RefreshCcw` icon) to `components/editor/EditorHeader.tsx`
- [X] T018 [US3] Implement `revertNote` action in `lib/store/useNoteStore.ts` to reset `content` to `lastSavedContent`
- [X] T019 [US3] Add confirmation dialog for Revert action in `components/editor/EditorHeader.tsx` using `components/ui/alert-dialog.tsx` (if available) or `window.confirm`

**Checkpoint**: Revert functionality allows users to safely discard session experiments.

---

## Phase 6: User Story 4 - Visual Saving Status (Priority: P2)

**Goal**: Provide visual feedback during the asynchronous save process.

**Independent Test**: Edit note with auto-save ON, observe "Saving..." label during request, followed by "Saved" label.

### Implementation for User Story 4

- [X] T020 [P] [US4] Create `components/editor/SavingStatus.tsx` component for status transitions
- [X] T021 [US4] Add `savingState` (idle, saving, saved, error) to `NoteDraft` in `lib/store/useNoteStore.ts`
- [X] T022 [US4] Update `savingState` in `NoteEditor.tsx` based on mutation lifecycle (onMutate, onSuccess, onError)
- [X] T023 [US4] Integrate `SavingStatus` into `components/editor/EditorHeader.tsx`

**Checkpoint**: Users receive clear feedback on the status of their background saves.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final verification, code quality, and mobile optimization

- [X] T024 [P] Add unit tests for `useNoteStore` store state transitions in `lib/store/useNoteStore.test.ts`
- [X] T025 [P] Run `bun run lint` and `bun run check-types` across the whole project
- [X] T026 Ensure all new UI components have minimum 44px touch targets for mobile compatibility
- [X] T027 Run quickstart.md validation scenarios manually
- [X] T028 Final production build verification (`bun run build`)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies.
- **Phase 2 (Foundational)**: Depends on T001. BLOCKS all user stories.
- **Phase 3 (US2)**: Depends on Phase 2. First story to implement for MVP state.
- **Phase 4 (US1)**: Depends on Phase 2. Can be done in parallel with US2 if `NoteEditor.tsx` conflicts are managed.
- **Phase 5 (US3)**: Depends on US2 (requires store and header).
- **Phase 6 (US4)**: Depends on US1 (requires auto-save lifecycle).

### Parallel Opportunities

- T005, T006, T007 (Foundational hooks and logic)
- T008 (EditorHeader) can be built in parallel with store logic
- T020 (SavingStatus) can be built in parallel with other UI
- T024, T025 (Tests and Linting)

---

## Parallel Example: Foundational Phase

```bash
# Developer A:
Task: "Implement lib/store/useNoteStore.ts for session state management"

# Developer B:
Task: "Create lib/hooks/useAutoSave.ts hook with debounce logic"
Task: "Create unit tests for useAutoSave logic"
```

---

## Implementation Strategy

### MVP First (User Story 2 & 1)

1. Complete Setup and Foundational stores.
2. Implement **User Story 2** first: Session persistence ensures no data loss during navigation even without auto-save.
3. Implement **User Story 1**: Add the "magic" of auto-save.
4. **Checkpoint**: Basic auto-save is functional.

### Incremental Delivery

1. Add **User Story 3** (Revert) to provide a safety net.
2. Add **User Story 4** (Visual Status) to polish the user feedback.
3. Final Polish and verification.

---

## Notes

- [P] tasks = different files, no dependencies.
- Each user story is designed to be independently testable via the `Independent Test` criteria.
- Use `lucide-react` for all icons per project convention.
- Ensure all components are marked with `"use client"` where appropriate.
