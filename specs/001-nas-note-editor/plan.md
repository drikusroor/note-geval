# Implementation Plan: NAS Markdown Note Editor

**Branch**: `001-nas-note-editor` | **Date**: 2025-12-26 | **Spec**: [specs/001-nas-note-editor/spec.md](spec.md)
**Input**: Feature specification from `specs/001-nas-note-editor/spec.md`


## Summary

This feature transforms the empty shell application into a robust, secure, and sleek Markdown editor for notes stored on a Synology NAS. It features fuzzy search (Levenshtein), Obsidian-style link resolution, and real-time preview, all running within a Dockerized Next.js environment.

## Technical Context

**Language/Version**: TypeScript 5.x  
**Primary Dependencies**: Next.js 16+, Bun, Tailwind CSS, shadcn/ui, TanStack Query, fuse.js (Fuzzy Search), unified/remark (Markdown)  
**Storage**: File-system based (bound volume)  
**Testing**: bun test  
**Target Platform**: Docker (Synology NAS)
**Project Type**: Web application (Next.js)  
**Performance Goals**: <100ms preview latency, <2s fuzzy search response  
**Constraints**: Must handle Obsidian-style links and local images; Authentication via ENV password.
**Scale/Scope**: Personal note collection (1k-10k notes).

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Strict Typing**: Does the design avoid `any` and ensure full type safety? (Uses Zod for API validation and strict TS)
- [x] **Testability**: Are core logic and complex UI components designed for `bun test`? (Fuzzy search and link resolution logic are independently testable)
- [x] **UX Consistency**: Does the UI plan follow Tailwind/Radix patterns? (Uses shadcn/ui)
- [x] **Performance**: Are Server Components prioritized to minimize client-side JS? (File listing and metadata fetching on server; editor/preview on client)
- [x] **Build Integrity**: Is there a plan to verify the build (`bun run build`)? (Standard part of QA workflow)

## Project Structure

### Documentation (this feature)

```text
specs/001-nas-note-editor/
├── plan.md              # This file
├── research.md          # Research on fuzzy search, markdown parsing, and NAS FS
├── data-model.md        # File-system and JWT session models
├── quickstart.md        # Setup and development guide
├── contracts/           # API endpoints (auth, notes, search)
└── tasks.md             # Implementation tasks (Phase 2 output)
```

### Source Code (repository root)

```text
app/
├── (auth)/              # Login and session handling
├── (dashboard)/         # File explorer and editor layout
├── api/                 # API routes for notes and search
└── components/          # Editor, Preview, FileExplorer, SearchDialog
lib/
├── markdown.ts          # Unified/Remark logic and link resolution
├── search.ts            # Fuse.js configuration
└── auth.ts              # JWT and password verification
```

**Structure Decision**: Single Next.js project using App Router.

