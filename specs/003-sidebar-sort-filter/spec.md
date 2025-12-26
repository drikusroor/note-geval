# Feature Specification: Sidebar Sorting and Filtering

**Feature Branch**: `003-sidebar-sort-filter`  
**Created**: 2025-12-26  
**Status**: Draft  
**Input**: User description: "we need some sorting options in the files sidebar. let's start with name, created at, modified at, size. additionally, we need a search input in the top of the sidebar that allows us to filter the files there."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Sort Files in Sidebar (Priority: P1)

As a user, I want to sort my files in the sidebar by different criteria (name, created date, modified date, size) so that I can find the most relevant notes quickly.

**Why this priority**: Essential for organization as the number of notes grows.

**Independent Test**: Can be tested by selecting a sort option and verifying the file order matches the expected sequence for that attribute.

**Acceptance Scenarios**:

1. **Given** the sidebar is visible, **When** I select "Sort by Modified Date", **Then** the most recently edited files appear at the top.
2. **Given** the sidebar is visible, **When** I select "Sort by Size", **Then** files are ordered by their disk size (descending or ascending).

---

### User Story 2 - Filter Files in Sidebar (Priority: P1)

As a user, I want a search input at the top of the sidebar to filter the list of files by name so that I can quickly narrow down the list without using the global search.

**Why this priority**: High impact on usability for navigating specific sets of files.

**Independent Test**: Can be tested by typing in the sidebar search input and verifying that only matching files remain visible in the tree.

**Acceptance Scenarios**:

1. **Given** a large list of files, **When** I type a keyword into the sidebar filter, **Then** only files/folders matching the keyword (or containing children that match) are displayed.
2. **Given** a filter is active, **When** I clear the input, **Then** the full file tree is restored.

---

## Edge Cases

- **Empty Results**: What to display when the filter matches nothing.
- **Deep Nesting**: How filtering affects parent folder visibility (parents of matches must remain visible).
- **Sorting folders vs files**: Folders MUST always stay at the top of their respective level in the hierarchy, sorted among themselves by the chosen attribute, followed by files.
- **Persistence**: Sort and filter state SHOULD persist across sessions using local storage.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide a UI element (e.g., dropdown) to select the sort attribute (Name, Created, Modified, Size).
- **FR-002**: System MUST support both Ascending and Descending orders for each sort attribute.
- **FR-003**: System MUST provide a search input field at the top of the sidebar.
- **FR-004**: Sidebar filter MUST perform real-time (as-you-type) filtering of the file tree.
- **FR-005**: Sidebar filter MUST match filenames case-insensitively.
- **FR-006**: When a file is matched by the filter, all its parent folders MUST remain visible to preserve hierarchy.

### Key Entities

- **File Metadata**: name, path, creation date, modification date, size.
- **Sidebar State**: current sort attribute, current sort direction, current filter string.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Sorting updates the UI in under 100ms for up to 1000 files.
- **SC-002**: Filtering updates the UI in under 50ms for up to 1000 files.
- **SC-003**: 100% of files matching the filter are correctly displayed while non-matching files are hidden.