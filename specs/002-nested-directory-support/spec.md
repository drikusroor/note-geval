# Feature Specification: Nested Directory Support

**Feature Branch**: `002-nested-directory-support`  
**Created**: 2025-12-26  
**Status**: Draft  
**Input**: User description: "The application should also take into account that some files might be in sub directories or even sub directories of sub directories. we shoudl be able to navigate through the directories in the sidebar and take it into account during search and also think about it with regards to internal links"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Recursive Sidebar Navigation (Priority: P1)

As a user, I want to navigate through a multi-level directory structure in the sidebar so that I can organize my notes hierarchically and easily find specific files.

**Why this priority**: Essential for organization as note collections grow. Without this, the app only supports a flat structure.

**Independent Test**: Can be tested by creating a directory structure 3+ levels deep and verifying the sidebar renders it as an expandable tree.

**Acceptance Scenarios**:

1. **Given** a directory structure with subfolders, **When** I view the sidebar, **Then** I see folders as expandable/collapsible items.
2. **Given** a collapsed folder, **When** I click it, **Then** its immediate children (files and subfolders) are revealed.
3. **Given** a file inside a deep subfolder, **When** I click it, **Then** the note is opened in the editor.

---

### User Story 2 - Deep Search (Priority: P1)

As a user, I want to perform a search that scans all subdirectories so that I can find content regardless of its location in the hierarchy.

**Why this priority**: Search is useless if it only looks at the root level in a nested system.

**Independent Test**: Create a note with a unique keyword 3 levels deep and verify it appears in global search results.

**Acceptance Scenarios**:

1. **Given** a search query, **When** I execute the search, **Then** results from all subdirectories are included.
2. **Given** a search result for a nested file, **When** I view the result list, **Then** the relative path is displayed to provide context.

---

### User Story 3 - Cross-Directory Internal Links (Priority: P1)

As a user, I want to use Obsidian-style links that correctly resolve to notes in different subdirectories so that my knowledge base remains interconnected.

**Why this priority**: Core knowledge management feature. Broken links destroy the value of the note system.

**Independent Test**: Create a link in `root/folder1/noteA.md` pointing to `root/folder2/subfolder/noteB.md` and verify clicking it navigates correctly.

**Acceptance Scenarios**:

1. **Given** an internal link `[[path/to/note]]`, **When** I click it, **Then** the application navigates to the note at that specific path.
2. **Given** an internal link, **When** I click it, **Then** the system MUST resolve it based on the provided path; ambiguous links without sufficient path context will be treated as broken to ensure reliability.

---

## Edge Cases

- **Circular Links**: Ensure navigation doesn't break if two notes link to each other.
- **Empty Folders**: How the sidebar handles folders with no markdown files.
- **Deep Nesting Performance**: Ensuring the tree and search remain fast with 10+ levels of nesting.
- **Ambiguous Link Prevention**: Ensuring users are notified if a link is too vague to resolve uniquely.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST render a recursive, expandable tree structure in the sidebar representing the NAS directory.
- **FR-002**: Folder expansion states MUST persist during the user session.
- **FR-003**: Global search MUST be recursive, indexing content from all subdirectories within the notes root.
- **FR-004**: Search results MUST display the file's path relative to the notes root.
- **FR-005**: Internal link resolution (`[[link]]`) MUST support absolute-from-root paths.
- **FR-006**: Internal link resolution MUST support relative paths (e.g., `[[../sibling/note]]`).
- **FR-007**: The system MUST enforce strict path-based resolution; links MUST provide sufficient path context to be unambiguous. Simple filenames without path context will only resolve if the file is in the same directory or the root.

### Key Entities

- **Directory**: A hierarchical container. Attributes: name, relative path, children (Notes or Directories).
- **Note**: (Enhanced) Includes `relative_path` to distinguish location.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Sidebar tree renders 100+ files across 5 levels of nesting in under 500ms.
- **SC-002**: 100% of internal links using relative paths resolve correctly in test suites.
- **SC-003**: Search results for deeply nested content return within 1 second for a 1000-note library.