# Plan: Theme Support (Light/Dark/System)

## Phase 1: Infrastructure & Core Setup
- [ ] Task: Install and Configure `next-themes`
    - [ ] Sub-task: Install the `next-themes` package.
    - [ ] Sub-task: Update `tailwind.config.cjs` to use the 'class' strategy for dark mode.
    - [ ] Sub-task: Create a `ThemeProvider` component and wrap the children in `app/providers.tsx`.
- [ ] Task: Conductor - User Manual Verification 'Infrastructure & Core Setup' (Protocol in workflow.md)

## Phase 2: Global Styling & Transitions
- [ ] Task: Define Light Mode Color Palette and Transitions
    - [ ] Sub-task: Write Tests to verify Light/Dark CSS variable presence.
    - [ ] Sub-task: Update `app/globals.css` with comprehensive light mode variables and smooth CSS transitions.
- [ ] Task: Conductor - User Manual Verification 'Global Styling & Transitions' (Protocol in workflow.md)

## Phase 3: Theme Toggle UI & Sidebar Integration
- [ ] Task: Implement Theme Toggle Component
    - [ ] Sub-task: Write Tests for Theme Switching logic in a new `ThemeToggle` component.
    - [ ] Sub-task: Create the `ThemeToggle` component using Radix UI/Shadcn components.
- [ ] Task: Integrate Toggle into Sidebar
    - [ ] Sub-task: Update Sidebar layout to include the `ThemeToggle` at the bottom.
    - [ ] Sub-task: Ensure the toggle is accessible on mobile via `MobileNav`.
- [ ] Task: Conductor - User Manual Verification 'Theme Toggle UI & Sidebar Integration' (Protocol in workflow.md)

## Phase 4: Component Audit & Final Polishing
- [ ] Task: Audit UI Components for Theme Consistency
    - [ ] Sub-task: Verify and adjust Editor, Preview, and File Explorer styles for light mode.
    - [ ] Sub-task: Ensure code blocks and syntax highlighting are readable in both themes.
- [ ] Task: Final UX Audit and Verification
    - [ ] Sub-task: Perform a full pass to ensure consistent styling and smooth transitions across all pages.
- [ ] Task: Conductor - User Manual Verification 'Component Audit & Final Polishing' (Protocol in workflow.md)