# Spec: Theme Support (Light/Dark/System)

## Overview
Implement comprehensive theme support in Note Geval using `next-themes`. This will provide a robust foundation for Light, Dark, and System modes, with the architectural flexibility to support custom user themes (e.g., Monokai, Dracula) in the future.

## Functional Requirements
- **Theme Selection:** Users can choose between "Light", "Dark", and "System" (follow OS preference) modes.
- **Persistence:** The user's theme choice must be persisted across sessions using local storage (handled by `next-themes`).
- **Sidebar Integration:** A theme toggle/switch will be added to the bottom of the sidebar for easy access.
- **Future-Proofing:** Implementation must allow for easy addition of named custom themes in the future.

## Visual Requirements
- **Light Mode Palette:** A clean, high-contrast light theme focusing on readability, following the "Modern & Clean" aesthetic defined in `product-guidelines.md`.
- **Smooth Transitions:** Subtle CSS transitions for background and text color changes when switching themes.
- **Consistent UI:** All components (sidebar, file explorer, search, editor, preview, code blocks) must have well-defined light mode variants.

## Technical Requirements
- **next-themes:** Install and configure `next-themes` as the primary theme manager.
- **Tailwind CSS:** Use the `class` strategy for theme switching.
- **Shadcn/UI & Radix UI:** Ensure all UI components utilize theme-aware CSS variables or Tailwind classes.

## Acceptance Criteria
- [ ] Theme toggle is visible and functional in the sidebar.
- [ ] Selecting "Light" mode correctly applies light theme colors.
- [ ] Selecting "Dark" mode correctly applies dark theme colors.
- [ ] Selecting "System" mode follows the operating system's theme preference.
- [ ] Theme choice persists after page refresh.
- [ ] Transitions between themes are smooth and visually pleasing.

## Out of Scope
- Implementation of specific custom themes (Monokai, etc.) beyond Light/Dark/System in this track.
- User-defined custom color palettes.