# Implementation Plan: Auto-save and session persistence for notes

**Branch**: `005-auto-save-notes` | **Date**: 2025-12-30 | **Spec**: `/specs/005-auto-save-notes/spec.md`
**Input**: Feature specification from `/specs/005-auto-save-notes/spec.md`

## Summary

Implement an asynchronous auto-save mechanism for notes with a 2-second debounce, accompanied by session-based persistence for unsaved changes during navigation. The feature includes visual indicators for saving status and unsaved changes, a toggle setting for auto-save, and a revert button to discard session changes.

## Technical Context

**Language/Version**: TypeScript 5.x / Next.js 16.x (App Router)
**Primary Dependencies**: @tanstack/react-store (Session state), @tanstack/react-query (Asynchronous saving), lucide-react (Icons)
**Storage**: In-memory store (TanStack Store) with optional `sessionStorage` sync for persistence; NAS file system for permanent storage via existing API.
**Testing**: `bun test` (Unit/Integration), React Testing Library
**Target Platform**: Web (Responsive/Mobile-first)
**Project Type**: Next.js App (Single repo)
**Performance Goals**: < 100ms UI response to typing, < 200ms for Revert action, 2s debounce for auto-save.
**Constraints**: Must handle network failures gracefully; mobile-friendly touch targets (min 44px).
**Scale/Scope**: Session persistence per-browser-tab; handles multiple "dirty" notes.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Strict Typing**: Full TypeScript coverage using Zod for validation and TanStack Store for typed state.
- [x] **Testability**: Logic for debouncing and session management will be unit-tested; UI indicators tested via RTL.
- [x] **UX Consistency**: Using existing Tailwind patterns and Lucide icons for consistency with the dashboard.
- [x] **Performance**: Auto-save is async and debounced to minimize NAS I/O and main-thread blocking.
- [x] **Build Integrity**: Final verification via `bun run build`.

## Project Structure

### Documentation (this feature)

```text
specs/005-auto-save-notes/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
app/
├── api/
│   └── notes/           # Existing save endpoints
├── (dashboard)/
│   └── notes/           # Note editing views

components/
├── editor/
│   ├── NoteEditor.tsx   # Main editor integration
│   ├── SavingStatus.tsx # NEW: saving/saved indicator
│   └── EditorHeader.tsx # NEW: Revert button and status
├── ui/                  # Shared UI components

lib/
├── store/
│   ├── useNoteStore.ts  # NEW: TanStack Store for session state
│   └── useSettings.ts   # NEW: Settings management
└── hooks/
    └── useAutoSave.ts   # NEW: Debounce and save logic
```

**Structure Decision**: Single project structure using Next.js App Router conventions. State management is centralized in `lib/store` using TanStack Store to handle cross-component communication (Editor <-> Header).

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

(No violations identified)
