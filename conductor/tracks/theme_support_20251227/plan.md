# Plan: Theme Support (Light/Dark/System)

## Phase 1: Infrastructure & Core Setup [checkpoint: 84ecaae]
- [x] Task: Install and Configure `next-themes`
    - [x] Sub-task: Install the `next-themes` package.
    - [x] Sub-task: Update `tailwind.config.cjs` to use the 'class' strategy for dark mode.
    - [x] Sub-task: Create a `ThemeProvider` component and wrap the children in `app/providers.tsx`.
- [x] Task: Conductor - User Manual Verification 'Infrastructure & Core Setup' (Protocol in workflow.md) 84ecaae

## Phase 2: Global Styling & Transitions [checkpoint: acf1dcc]
- [x] Task: Define Light Mode Color Palette and Transitions
    - [x] Sub-task: Write Tests to verify Light/Dark CSS variable presence.
    - [x] Sub-task: Update `app/globals.css` with comprehensive light mode variables and smooth CSS transitions.
- [x] Task: Conductor - User Manual Verification 'Global Styling & Transitions' (Protocol in workflow.md) acf1dcc

## Phase 3: Theme Toggle UI ## Phase 3: Theme Toggle UI & Sidebar Integration Sidebar Integration [checkpoint: 9c68ee9]
- [x] Task: Implement Theme Toggle Component
    - [x] Sub-task: Write Tests for Theme Switching logic in a new `ThemeToggle` component.
    - [x] Sub-task: Create the `ThemeToggle` component using Radix UI/Shadcn components.
- [x] Task: Integrate Toggle into Sidebar
    - [x] Sub-task: Add the theme toggle to the bottom of the sidebar.
    - [x] Sub-task: Ensure the toggle is accessible on mobile via `MobileNav`.
- [x] Task: Conductor - User Manual Verification 'Theme Toggle UI - [ ] Task: Conductor - User Manual Verification 'Theme Toggle UI & Sidebar Integration' (Protocol in workflow.md) Sidebar Integration' (Protocol in workflow.md) 9c68ee9

## Phase 4: Component Audit & Final Polishing
- [ ] Task: Audit UI Components for Theme Consistency
    - [ ] Sub-task: Verify and adjust Editor, Preview, and File Explorer styles for light mode.
    - [ ] Sub-task: Ensure code blocks and syntax highlighting are readable in both themes.
- [ ] Task: Final UX Audit and Verification
    - [ ] Sub-task: Perform a full pass to ensure consistent styling and smooth transitions across all pages.
- [ ] Task: Conductor - User Manual Verification 'Component Audit & Final Polishing' (Protocol in workflow.md)