<!--
Sync Impact Report:
- Version change: 0.0.0 → 1.0.0
- Modified principles: Initial creation based on project context.
- Added sections: Core Principles, Technology Stack & Constraints, Development Workflow, Governance.
- Removed sections: None.
- Templates updated: 
  - ✅ .specify/templates/plan-template.md (Added principle-specific gates)
  - ✅ .specify/templates/tasks-template.md (Added build/type-check verification tasks)
- Follow-up TODOs: None.
-->

# Note Geval Constitution

## Core Principles

### I. Strict Typing & Linting (Code Quality)
All code must pass Biome linting/formatting and TypeScript type checks (`bun run lint`, `bun run check-types`). No `any` types allowed unless explicitly justified and documented. Rationale: Maintain long-term maintainability and catch errors early.

### II. Comprehensive Testing (Testing Standards)
Core business logic and complex UI components must have unit or integration tests using `bun test`. Tests should be written alongside features to ensure reliability. Rationale: Prevent regressions and document expected behavior.

### III. UX & Design Consistency
The UI must adhere to the established design system using Tailwind CSS and Radix-based components (following shadcn/ui patterns). Ensure responsiveness and accessibility (A11y) for all users. **Mobile-first responsive design is mandatory** - the application must be fully functional and intuitive on smartphones (especially iPhone), with touch-friendly controls (minimum 44px touch targets), appropriate text sizing, and optimized layouts for small screens. Rationale: Provide a cohesive and professional user experience across all devices, ensuring easy note creation and modification on mobile devices.

### IV. High Performance & Next.js Best Practices
Minimize client-side JavaScript by prioritizing Next.js Server Components. Optimize data access to the Synology NAS storage with efficient caching and minimal round-trips. Rationale: Ensure fast load times and efficient resource usage on NAS hardware.

### V. Continuous Integrity & Build Verification (QA Process)
The application MUST always remain in a buildable state. Every feature implementation or refactor must conclude with a successful `bun run build` verification. Rationale: Ensure the project is always ready for deployment and free of build-time errors.

## Technology Stack & Constraints

- **Runtime**: Bun (Primary runtime for execution, testing, and bundling)
- **Framework**: Next.js 16+ (App Router)
- **Styling**: Tailwind CSS, PostCSS, Lucide icons
- **Tools**: Biome (Linting & Formatting), TypeScript (Strict mode)
- **State/Data**: TanStack Query (Data fetching), TanStack Form (Forms), TanStack Store (Global state)
- **Storage**: Synology NAS via Docker volume (File-based storage)

## Development Workflow

1. **Specification**: Create a detailed feature specification in `specs/`.
2. **Implementation**: Code the feature following the principles above.
3. **Verification**: Execute `bun run lint`, `bun run check-types`, and `bun test`.
4. **Final Gate**: Verify the production build with `bun run build`.

## Governance

- **Compliance**: All contributions must comply with these principles.
- **Verification**: Tools (Biome, tsc, bun test) are the source of truth for compliance.
- **Amendments**: Changes to this constitution require a version bump (SemVer) and updated ratification dates.
- **Exceptions**: Any intentional violation of these principles must be documented in the Implementation Plan.

**Version**: 1.0.0 | **Ratified**: 2025-12-26 | **Last Amended**: 2025-12-26