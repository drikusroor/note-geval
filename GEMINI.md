# note-geval Development Guidelines

Auto-generated from all feature plans. Last updated: 2025-12-26

## Active Technologies
- TypeScript 5.x / React 19 (via Next.js 16) (004-live-preview-editor)
- N/A (Client-side component, persists via existing `api/notes` endpoints) (004-live-preview-editor)
- TypeScript 5.x (via Bun) + Next.js 16+, TanStack Query (for async saves), TanStack Store (for session state), CodeMirror (existing editor) (005-auto-save-notes)
- Memory-based session cache (TanStack Store) + Synology NAS file storage (backend API) (005-auto-save-notes)
- TypeScript 5.x / Next.js 16.x (App Router) + @tanstack/react-store (Session state), @tanstack/react-query (Asynchronous saving), lucide-react (Icons) (005-auto-save-notes)
- In-memory store (TanStack Store) with optional `sessionStorage` sync for persistence; NAS file system for permanent storage via existing API. (005-auto-save-notes)

- (001-nas-note-editor)

## Project Structure

```text
backend/
frontend/
tests/
```

## Commands

# Add commands for 

## Code Style

: Follow standard conventions

## Recent Changes
- 006-file-path-display: Added [if applicable, e.g., PostgreSQL, CoreData, files or N/A]
- 005-auto-save-notes: Added TypeScript 5.x / Next.js 16.x (App Router) + @tanstack/react-store (Session state), @tanstack/react-query (Asynchronous saving), lucide-react (Icons)
- 005-auto-save-notes: Added TypeScript 5.x (via Bun) + Next.js 16+, TanStack Query (for async saves), TanStack Store (for session state), CodeMirror (existing editor)


<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->
