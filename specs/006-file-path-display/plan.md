# Implementation Plan: Display current file path in the top bar

**Branch**: `006-file-path-display` | **Date**: 2025-12-30 | **Spec**: [specs/006-file-path-display/spec.md](spec.md)
**Input**: Feature specification from `/specs/006-file-path-display/spec.md`

## Summary

This feature implements a breadcrumb navigation system in the `EditorHeader`. It allows users to see the relative path of the currently open note and interactively navigate back to parent directories by expanding them in the sidebar.

## Technical Context

**Language/Version**: TypeScript / Next.js 15+ (App Router)
**Primary Dependencies**: TanStack Store, Lucide React, Tailwind CSS
**Storage**: N/A (UI State only)
**Testing**: `bun test` for store logic and utility functions
**Target Platform**: Web (Mobile-first)
**Project Type**: Web application
**Performance Goals**: <100ms update on file switch
**Constraints**: Mobile touch targets >= 44px
**Scale/Scope**: Local UI state management

## Constitution Check

- [x] **Strict Typing**: Full TypeScript interfaces for ExplorerStore.
- [x] **Testability**: Unit tests for `useExplorerStore` logic.
- [x] **UX Consistency**: Uses Tailwind CSS and Lucide icons following project patterns.
- [x] **Performance**: Client-side state for snappy navigation.
- [x] **Build Integrity**: Verified with `bun run build` post-implementation.

## Project Structure

### Documentation (this feature)

```text
specs/006-file-path-display/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
└── tasks.md             # Phase 2 output (to be created)
```

### Source Code (repository root)

```text
lib/
└── store/
    └── useExplorerStore.ts     # NEW: Global expansion state

components/
├── editor/
│   └── EditorHeader.tsx      # UPDATED: Add breadcrumbs
└── SidebarTreeItem.tsx       # UPDATED: Connect to useExplorerStore
```

**Structure Decision**: Single project layout, following existing `lib/store` and `components` patterns.

## Complexity Tracking

*No violations.*