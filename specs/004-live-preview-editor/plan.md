# Implementation Plan: Extensible Live Preview Editor

**Branch**: `004-live-preview-editor` | **Date**: 2025-12-28 | **Spec**: [specs/004-live-preview-editor/spec.md](spec.md)
**Input**: Feature specification from `specs/004-live-preview-editor/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

The goal is to build an extensible Markdown editor for `note-geval` that supports "Live Preview" (hiding syntax unless editing), contextual styling, list management, and integrated search. The core architectural decision is to implement an "Extension-First" design where the base editor is minimal, and features (even core ones like Live Preview) are implemented as pluggable extensions. This ensures maintainability, separation of concerns, and future extensibility.

## Technical Context

**Language/Version**: TypeScript 5.x / React 19 (via Next.js 16)
**Primary Dependencies**: 
- **Core Editor**: CodeMirror 6 (Chosen for performance, virtualization support, and decoration API that matches "Live Preview" needs).
- **Markdown Parsing**: `@codemirror/lang-markdown` (Native integration).
- **Styling**: Tailwind CSS (via `EditorView.theme`).
**Storage**: N/A (Client-side component, persists via existing `api/notes` endpoints)
**Testing**: `bun test` for unit logic (extensions), `react-testing-library` for component integration.
**Target Platform**: Web (Responsive Mobile & Desktop)
**Project Type**: Web Application (Next.js)
**Performance Goals**: < 16ms response to typing (60fps), virtualization for large docs > 5k lines.
**Constraints**: Mobile-first UX (touch targets, virtual keyboard handling).

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Strict Typing**: Design will use strict TypeScript interfaces for Extensions and Editor State.
- [x] **Testability**: Extensions (pure functions/classes) will be unit-testable separate from React.
- [x] **UX Consistency**: Will reuse existing Tailwind tokens and Shadcn/ui patterns for search UI.
- [x] **Performance**: Editor will be a Client Component, but initial data load uses Server Components.
- [x] **Build Integrity**: Standard Next.js build process.

## Project Structure

### Documentation (this feature)

```text
specs/004-live-preview-editor/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
components/
└── editor/
    ├── NoteEditor.tsx       # Main container (Client Component)
    ├── core/                # Core editor logic wrapper
    │   ├── index.tsx
    │   └── types.ts
    └── extensions/          # Feature implementations
        ├── live-preview.ts  # Syntax hiding logic
        ├── search.ts        # Search & highlight logic
        └── list-handling.ts # Smart list bullets
```

**Structure Decision**: A dedicated `components/editor` directory is necessary to contain the complexity of the extension system and separate the core wrapper from the specific feature extensions.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| New Dependency (Editor Framework) | To support complex "Live Preview" decorations (hiding syntax) efficiently. | Writing a raw `contenteditable` or `textarea` implementation is prone to browser inconsistencies and performance issues with large docs. |