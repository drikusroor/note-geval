# Tech Stack: Note Geval

## Core Framework & Runtime
- **Language:** TypeScript
- **Framework:** Next.js 16 (App Router)
- **Runtime:** Bun

## Frontend & UI
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI, Lucide React, Shadcn/UI
- **State Management:** TanStack Query (Server State), TanStack Store (Client State)
- **Forms:** TanStack Form
- **Validation:** Zod

## Markdown & Content
- **Processing:** Unified, Remark, Rehype
- **Plugins:** remark-wiki-link, rehype-react
- **Search:** Fuse.js

## Backend & Storage
- **Storage:** Local Filesystem (Synology NAS via Docker volume)
- **Authentication:** Jose (JWT)

## Development & Deployment
- **Linting & Formatting:** Biome
- **Containerization:** Docker & Docker Compose
- **Quality Gates:** TypeScript (tsc), Biome, Bun Test
