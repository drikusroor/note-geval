# Feature Specification: Display current file path in the top bar

**Feature Branch**: `006-file-path-display`  
**Created**: 2025-12-30  
**Status**: Draft  
**Input**: User description: "I would like to see the path of the currently opened file in the top bar"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View current file location (Priority: P1)

As a user working with nested directories, I want to see the full path of the currently open file in the header so I always know where I am in the project structure.

**Why this priority**: Essential for orientation when working with multiple files or deeply nested structures. It is the core requirement of the feature.

**Independent Test**: Open any file and verify that its relative path from the root is visible in the top bar.

**Acceptance Scenarios**:

1. **Given** a file `notes/work/project-a/todo.md` is open, **When** I look at the top bar, **Then** I see the path displayed as `notes > work > project-a > todo.md`.
2. **Given** no file is open (e.g., initial state), **When** I look at the top bar, **Then** I see the application name or a neutral state instead of a file path.
3. **Given** a file at the root level `readme.md` is open, **When** I look at the top bar, **Then** I see only the filename `readme.md` or `root > readme.md`.

---

### User Story 2 - Navigate via path components (Priority: P2)

As a user, I want to be able to click on parent directory names in the path to quickly navigate to those folders.

**Why this priority**: Significant UX improvement that turns a passive information element into an active navigation tool, reducing the need to use the sidebar for parent directory access.

**Independent Test**: Click on a folder name within the displayed path and verify the system navigates to or highlights that folder.

**Acceptance Scenarios**:

1. **Given** a path `notes > work > project-a > todo.md` is displayed in the top bar, **When** I click on the `work` segment, **Then** the file explorer should navigate to or focus on the `work` directory.

---

### Edge Cases

- **Long Paths**: When the file path is longer than the available horizontal space in the top bar, the system should truncate the path (e.g., using ellipses in the middle: `notes > ... > project-a > todo.md`) while ensuring the filename remains visible.
- **Special Characters**: Paths containing spaces or special characters should be rendered correctly and remain functional.
- **Rapid Switching**: Quickly switching between files should update the top bar path without lag or showing the previous file's path.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display the relative path of the currently active note in the header area.
- **FR-002**: The path MUST be updated immediately whenever a different note is selected or opened.
- **FR-003**: The path MUST be formatted as a breadcrumb with clear separators between directory segments.
- **FR-004**: System MUST handle overflows by truncating the middle segments of the path to keep the filename and root visible where possible.
- **FR-005**: Each directory segment in the path MUST be interactive (clickable) to trigger navigation to that specific directory.
- **FR-006**: The currently open file (the last segment) SHOULD be visually distinct from the parent directory segments (e.g., bold or different color).

### Key Entities *(include if feature involves data)*

- **File Path**: A sequence of directory names and a filename representing the location of a note relative to the storage root.
- **Breadcrumb Segment**: A single clickable element representing a directory or the current file within the path.

## Assumptions

- **Root Directory**: The "root" of the path refers to the base directory where notes are stored, not the system root.
- **Navigation Behavior**: Clicking a directory segment in the breadcrumb will update the application's internal state to show that directory in the file explorer/sidebar.
- **Top Bar Availability**: The top bar has sufficient height to accommodate the breadcrumb text.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can identify the full path of the current file within 1 second of it being opened.
- **SC-002**: The path display updates in less than 100ms after a file selection change.
- **SC-003**: 100% of files, regardless of depth, correctly display their path when active.
- **SC-004**: Navigation via breadcrumb segments correctly resolves to the intended directory in 100% of attempts.