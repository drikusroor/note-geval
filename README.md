# Note Geval

Note Geval is a Next.js web application whose goal is to create and manage notes stored on my Synology NAS through a Docker volume.

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run dev
```

### Verification & Quality Gates

This project follows a strict [Constitution](.specify/memory/constitution.md). Before completing any feature, ensure the following pass:

```bash
bun run lint         # Linting and formatting (Biome)
bun run check-types  # TypeScript type checking
bun run build        # Production build verification
bun test             # Unit and integration tests
```

This project was created using `bun init` in bun v1.3.5. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
