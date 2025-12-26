# Tasks: NAS Markdown Note Editor

**Input**: Design documents from `specs/001-nas-note-editor/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/api.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create project structure per implementation plan (app/(auth), app/(dashboard), api/, lib/)
- [x] T002 [P] Configure environment variables support and types in lib/env.ts
- [x] T003 [P] Configure Biome for linting and formatting in biome.json
- [x] T004 [P] Setup basic Tailwind CSS configuration in tailwind.config.js
- [x] T005 [P] Setup TanStack Query provider in app/providers.tsx
- [x] T006 Verify initial build capability (`bun run build`)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

- [x] T007 Implement JWT session management utilities in lib/auth.ts (using jose/jsonwebtoken)
- [x] T008 Implement basic file system utilities for reading/listing files in lib/fs.ts
- [x] T009 [P] Create Zod schemas for API request validation in lib/schemas.ts
- [x] T010 Implement authentication middleware to protect (dashboard) and api/ routes in middleware.ts

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Secure Access and Note Listing (Priority: P1) 🎯 MVP

**Goal**: Securely log into the application and see a list of markdown notes.

**Independent Test**: Provide `NOTES_AUTH_PASSWORD` in ENV, login successfully, and see the list of notes from the mapped volume.

### Implementation for User Story 1

- [x] T011 [P] [US1] Create login page UI in app/(auth)/login/page.tsx
- [x] T012 [US1] Implement login API route in app/api/auth/login/route.ts
- [x] T013 [P] [US1] Implement logout API route in app/api/auth/logout/route.ts
- [x] T014 [US1] Implement note listing API route in app/api/notes/route.ts
- [x] T015 [P] [US1] Create FileExplorer component in components/FileExplorer.tsx
- [x] T016 [US1] Create Dashboard layout in app/(dashboard)/layout.tsx with FileExplorer
- [x] T017 [US1] Implement NoteList component with TanStack Query in components/NoteList.tsx
- [x] T018 [US1] Verify US1: Login works and notes are listed correctly.

**Checkpoint**: MVP scope complete - core access and listing functional.

---

## Phase 4: User Story 2 - Markdown Editing and Preview (Priority: P1)

**Goal**: Edit markdown files with live preview and Obsidian-style link support.

**Independent Test**: Open a note, edit content, see preview update, and navigate via `[[link]]`.

### Implementation for User Story 2

- [x] T019 [US1] Implement single note GET and PUT API routes in app/api/notes/[...path]/route.ts
- [x] T020 [P] [US2] Setup unified/remark parser with wiki-links support in lib/markdown.ts
- [x] T021 [P] [US2] Create Editor component with syntax highlighting in components/Editor.tsx
- [x] T022 [P] [US2] Create Preview component in components/Preview.tsx
- [x] T023 [US2] Implement NoteEditor container component in components/NoteEditor.tsx (TanStack Query + Form)
- [x] T024 [US2] Create note detail page in app/(dashboard)/notes/[...path]/page.tsx
- [x] T025 [US2] Implement Obsidian link resolution logic in lib/markdown.ts
- [x] T026 [P] [US2] Implement image serving API route in app/api/images/[...path]/route.ts
- [x] T027 [US2] Verify US2: Editing, live preview, and internal links function correctly.

**Checkpoint**: Core editor functionality complete.

---

## Phase 5: User Story 3 - Powerful Search (Priority: P2)

**Goal**: Search through notes using fuzzy matching (Levenshtein).

**Independent Test**: Use `Cmd+Shift+F` and `Cmd+P` to find files with typos.

### Implementation for User Story 3

- [x] T028 [US3] Implement search indexing utility using fuse.js in lib/search.ts
- [x] T029 [US3] Implement global search API route in app/api/search/route.ts
- [x] T030 [P] [US3] Create SearchDialog component (Cmd+Shift+F) in components/SearchDialog.tsx
- [x] T031 [P] [US3] Create FileSearch component (Cmd+P) in components/FileSearch.tsx
- [x] T032 [US3] Implement internal note search (Hybrid exact/fuzzy) in components/InternalSearch.tsx
- [x] T033 [US3] Integrate search components into Dashboard layout
- [x] T034 [US3] Verify US3: Fuzzy search returns correct results for global and file search.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final refinements and verification.

- [x] T035 [P] Add loading states and skeletons to UI components
- [x] T036 [P] Improve error handling for file system failures
- [x] T037 [P] Implement responsive design for mobile viewing
- [x] T038 [P] Add "Stale-While-Revalidate" polling for concurrent edit detection
- [x] T039 Execute final project-wide build and lint check (`bun run lint && bun run build`)
- [x] T040 Run quickstart.md validation in a clean environment

---

## Dependencies & Execution Order

### Phase Dependencies

1. **Setup (Phase 1)**: Independent.
2. **Foundational (Phase 2)**: Depends on Phase 1. Blocks all stories.
3. **User Story 1 (Phase 3)**: Depends on Phase 2. MVP Goal.
4. **User Story 2 (Phase 4)**: Depends on Phase 3 (needs basic API structure).
5. **User Story 3 (Phase 5)**: Depends on Phase 3 (needs listing/search infra).
6. **Polish (Phase 6)**: Depends on all stories.

### Parallel Opportunities

- Setup tasks (T002-T005) can run in parallel.
- US1 UI (T011) and Auth API (T012/T013) can run in parallel.
- Markdown processing (T020) and Editor/Preview components (T021/T022) can run in parallel.
- Search components (T030/T031) can run in parallel once search API (T029) is ready.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Setup + Foundational.
2. Complete US1: Authentication and Listing.
3. **VALIDATE**: Ensure user can login and see files on NAS.

### Incremental Delivery

1. Foundation ready.
2. Add US1 → Access established.
3. Add US2 → Editing capability (Essential!).
4. Add US3 → Productivity enhancement.
5. Polish.
