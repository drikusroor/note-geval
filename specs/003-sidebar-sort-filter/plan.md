# Implementation Plan: Sidebar Sorting and Filtering

**Branch**: `003-sidebar-sort-filter` | **Date**: 2025-12-26 | **Spec**: [specs/003-sidebar-sort-filter/spec.md](spec.md)
**Input**: Feature specification from `specs/003-sidebar-sort-filter/spec.md`

## Summary

This feature adds user-controlled sorting and real-time filtering to the files sidebar. It includes a search input for filtering filenames while preserving folder hierarchy and a dropdown menu for sorting by name, creation date, modification date, and size. All state is persisted in the browser's local storage.

## Technical Context

**Language/Version**: TypeScript 5.x  
**Primary Dependencies**: Next.js 16+, Bun, Tailwind CSS, shadcn/ui (DropdownMenu, Input), TanStack Query  
**Storage**: File metadata (modified `fs.stat`), Client-side `localStorage`  
**Testing**: `bun test` for recursive sort/filter logic  
**Target Platform**: Web application (Next.js)  
**Performance Goals**: Sort <100ms, Filter <50ms for 1000 items.  
**Constraints**: Must maintain "Folders First" hierarchy; Parents of filtered matches must remain visible.
**Scale/Scope**: Up to 10,000 files managed efficiently in client memory.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Strict Typing**: Does the design avoid `any` and ensure full type safety? (Uses strongly typed sort/filter states)
- [x] **Testability**: Are core logic and complex UI components designed for `bun test`? (Recursive sort and filter functions are pure and testable)
- [x] **UX Consistency**: Does the UI plan follow Tailwind/Radix patterns? (Uses shadcn/ui components)
- [x] **Performance**: Are Server Components prioritized to minimize client-side JS? (Server provides metadata; Client handles interactive sorting/filtering)
- [x] **Build Integrity**: Is there a plan to verify the build (`bun run build`)? (Standard part of QA workflow)

## Project Structure

### Documentation (this feature)

```text
specs/003-sidebar-sort-filter/
├── plan.md              # This file
├── research.md          # Recursive sort/filter and UI patterns
├── data-model.md        # Sort criteria and processing logic
├── quickstart.md        # User verification steps
├── contracts/           # API metadata updates
└── tasks.md             # Implementation tasks (Phase 2 output)
```

### Source Code (repository root)

```text
lib/
├── fs.ts                # Update FileInfo to include birthtime (createdAt)
└── utils/tree.ts        # Update buildTree or add sortTree/filterTree
components/
├── SidebarFilter.tsx    # Search input for sidebar
├── SidebarSort.tsx      # Dropdown for sort options
└── SidebarTree.tsx      # Integrate sort/filter logic
```

**Structure Decision**: Single Next.js project using App Router.

