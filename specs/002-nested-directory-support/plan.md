# Implementation Plan: Nested Directory Support

**Branch**: `002-nested-directory-support` | **Date**: 2025-12-26 | **Spec**: [specs/002-nested-directory-support/spec.md](spec.md)
**Input**: Feature specification from `specs/002-nested-directory-support/spec.md`

## Summary

This feature extends the file system integration to support multi-level nested directories. It updates the sidebar to show an expandable tree view, ensures search is recursive across all subfolders, and implements a strict path resolution strategy for Obsidian-style internal links to eliminate ambiguity.

## Technical Context

**Language/Version**: TypeScript 5.x  
**Primary Dependencies**: Next.js 16+, Bun, Tailwind CSS, Radix UI (Collapsible), TanStack Query, fuse.js, unified/remark  
**Storage**: File-system based (recursive FS traversal)  
**Testing**: bun test  
**Target Platform**: Docker (Synology NAS)
**Project Type**: Web application (Next.js)  
**Performance Goals**: Sidebar tree construction <100ms for 1000 files; Search <1s.  
**Constraints**: Strict path resolution; Persistent folder expansion state.
**Scale/Scope**: Support for arbitrarily deep nested folders.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Strict Typing**: Does the design avoid `any` and ensure full type safety? (Uses recursive `TreeNode` interface)
- [x] **Testability**: Are core logic and complex UI components designed for `bun test`? (Path resolution and tree construction logic are pure functions and testable)
- [x] **UX Consistency**: Does the UI plan follow Tailwind/Radix patterns? (Uses Radix Collapsible and shadcn/ui styles)
- [x] **Performance**: Are Server Components prioritized to minimize client-side JS? (Recursive FS listing on server; tree state on client)
- [x] **Build Integrity**: Is there a plan to verify the build (`bun run build`)? (Standard part of QA workflow)

## Project Structure

### Documentation (this feature)

```text
specs/002-nested-directory-support/
├── plan.md              # This file
├── research.md          # Recursive tree UI and strict path resolution
├── data-model.md        # TreeNode structure and link resolution logic
├── quickstart.md        # Verification steps with nested examples
├── contracts/           # Recursive API contracts
└── tasks.md             # Implementation tasks (Phase 2 output)
```

### Source Code (repository root)

```text
lib/
├── fs.ts                # Update listFiles to support recursion
├── markdown.ts          # Update link resolution with path context
└── utils/tree.ts        # Utility to transform flat list to tree
components/
├── SidebarTree.tsx      # Recursive directory tree component
└── SearchDialog.tsx     # Update to display relative paths
```

**Structure Decision**: Single Next.js project using App Router.

