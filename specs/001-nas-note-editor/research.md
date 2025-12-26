# Research: NAS Markdown Note Editor

## Fuzzy Search Implementation

### Decision
Use `fuse.js` for fuzzy searching.

### Rationale
- `fuse.js` is a lightweight, zero-dependency fuzzy-search library that works perfectly in both browser and server environments (Node.js/Bun).
- It supports weighted searching, which is useful for prioritizing file names over content.
- It handles Levenshtein distance internally and provides a simple API for "bitap" based fuzzy matching.

### Alternatives Considered
- `fast-levenshtein`: Lower level, would require building the search logic manually.
- `FlexSearch`: Highly performant but might be overkill for a personal note collection; `fuse.js` is easier to integrate for this scale.

## Obsidian Link Resolution & Markdown Parsing

### Decision
Use `unified`, `remark-parse`, `remark-rehype`, and `rehype-react` for markdown processing. Use a custom `remark` plugin to handle `[[WikiLinks]]`.

### Rationale
- The `unified` ecosystem is the industry standard for robust markdown processing.
- It allows for easy extensibility via plugins.
- We can use or adapt `remark-wiki-link` to support Obsidian's `[[Link]]` syntax and resolve them to internal routes.

### Alternatives Considered
- `react-markdown`: Good for simple cases but `unified` provides more control for custom syntax like wiki links.

## File System Interaction & Watching

### Decision
Use standard Node.js/Bun `fs` modules for basic operations. For concurrent edits, implement a simple polling or "Stale-While-Revalidate" pattern in the UI using TanStack Query, as file system watching (chokidar) can be unreliable over network-attached storage (NAS) bound volumes.

### Rationale
- Bound volumes from NAS often don't propagate `inotify` events correctly to Docker containers.
- TanStack Query's `refetchOnWindowFocus` and periodic polling are more reliable for detecting changes made by Obsidian or Synology Drive.

### Alternatives Considered
- `chokidar`: Might work if the NAS supports it, but polling is a safer fallback for this specific infrastructure.

## Authentication & Session Management

### Decision
Implement a custom JWT-based authentication using `jose` or `jsonwebtoken`. Use `bcrypt` (or Bun's built-in password hashing) to verify the password from `ENV`. Store the JWT in a `httpOnly`, `secure` cookie.

### Rationale
- Lightweight and fits the "simple authentication" requirement.
- `httpOnly` cookies prevent XSS-based token theft.
- Bun has built-in high-performance password hashing (`Bun.password`).

### Alternatives Considered
- `NextAuth.js`: Too heavy for a single-password environment.

## UI Component Library

### Decision
`shadcn/ui` (Radix UI + Tailwind CSS) with `Lucide` icons.

### Rationale
- Already established in the project (from `package.json` and constitution).
- Provides the "sleek design" requested.
