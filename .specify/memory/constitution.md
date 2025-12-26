<!--
Sync Impact Report:
- Version Change: [Initial Template] -> 0.1.0
- Modified Principles:
  - Added "Code Quality & Consistency"
  - Added "Testing Standards"
  - Added "UX & UI Consistency"
  - Added "Performance First"
- Added Sections: N/A
- Removed Sections: N/A
- Templates Requiring Updates:
  - .specify/templates/plan-template.md (✅ Check alignment with new principles)
  - .specify/templates/spec-template.md (✅ Check alignment with new principles)
  - .specify/templates/tasks-template.md (✅ Check alignment with new principles)
- Follow-up TODOs: None
-->

# note-geval Constitution

## Core Principles

### I. Code Quality & Consistency
Code must be clean, readable, and maintainable. We strictly adhere to **Biome** for linting and formatting. Variable and function names should be explicit and descriptive. We follow the established architectural patterns of the **TanStack** ecosystem (Router, Query, Store) to ensure consistency across the codebase. Refactoring for clarity is encouraged over premature optimization.

### II. Testing Standards
Reliability is paramount. We use **Vitest** for our testing framework. Logic-heavy utilities and critical business logic components **MUST** have unit tests. Integration tests are required for primary user flows to ensure system cohesion. All tests **MUST** pass before any code is merged. TDD (Test-Driven Development) is encouraged for complex logic.

### III. UX & UI Consistency
We prioritize a consistent and accessible user experience. **Tailwind CSS** is the exclusive styling engine. Interactive components **MUST** utilize **Shadcn UI** (built on Radix Primitives) or standard HTML elements styled to match the design system. All interfaces **MUST** be responsive (mobile-first) and accessible (WCAG guidelines). Visual changes should not introduce jarring inconsistencies with the existing aesthetic.

### IV. Performance First
Performance is a feature. We optimize for fast load times and smooth interactions. Route-based code splitting (lazy loading) is preferred to minimize initial bundle size. Data fetching **MUST** be efficient, utilizing **TanStack Query** caching and **TanStack Router** loaders to prevent waterfalls. Heavy computations should be memoized or moved off the main thread where possible.

## Governance

This constitution serves as the primary source of truth for engineering standards within the `note-geval` project.

### Amendments
Amendments to this constitution require a Pull Request with explicit justification. Changes to "Core Principles" require a MAJOR version bump if they fundamentally alter the development philosophy, or a MINOR version bump for additions/clarifications.

### Compliance
All Pull Requests and architectural decisions **MUST** be evaluated against these principles. Code reviews should explicitly reference these principles when requesting changes.

**Version**: 0.1.0 | **Ratified**: 2025-12-26 | **Last Amended**: 2025-12-26