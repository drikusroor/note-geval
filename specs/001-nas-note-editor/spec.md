# Feature Specification: NAS Markdown Note Editor

**Feature Branch**: `001-nas-note-editor`  
**Created**: 2025-12-26  
**Status**: Draft  
**Input**: User description: "Specify the needs for turning this empty shell web application into a web application that allows me to edit my markdown files/notes that are stored on my Synology NAS..."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Secure Access and Note Listing (Priority: P1)

As a user, I want to securely log into the application and see a list of my markdown notes stored on the NAS so that I can manage them.

**Why this priority**: Fundamental requirement for any interaction with the notes.

**Independent Test**: Can be tested by providing environment credentials, logging in, and verifying the file list matches the mapped volume content.

**Acceptance Scenarios**:

1. **Given** valid credentials in ENV, **When** I enter them in the login form, **Then** I am granted access and redirected to the note list.
2. **Given** invalid credentials, **When** I attempt to login, **Then** I see an error message and remain on the login page.
3. **Given** a logged-in state, **When** I view the dashboard, **Then** I see a list of all `.md` files in the notes directory.

---

### User Story 2 - Markdown Editing and Preview (Priority: P1)

As a user, I want to edit markdown files with a live preview and support for Obsidian-style links so that I can maintain my knowledge base.

**Why this priority**: Core functionality of the application.

**Independent Test**: Open a note, type markdown content, verify preview updates, and click an internal link to ensure it navigates correctly.

**Acceptance Scenarios**:

1. **Given** an open note, **When** I type markdown, **Then** the preview pane updates in real-time.
2. **Given** a note with `[[link-to-another-note]]`, **When** I click the link, **Then** the application navigates to the linked note.
3. **Given** a note with an embedded image `![alt](image.png)`, **When** viewing the preview, **Then** the image is rendered correctly.

---

### User Story 3 - Powerful Search (Priority: P2)

As a user, I want to search through my notes using fuzzy matching so that I can find information quickly even with typos.

**Why this priority**: Critical for productivity as the note collection grows.

**Independent Test**: Press `Cmd+Shift+F`, type a search term with a minor typo, and verify relevant notes are returned.

**Acceptance Scenarios**:

1. **Given** the search dialog is open, **When** I type "taks" (instead of "task"), **Then** files containing "task" are shown in the results.
2. **Given** the global search (`Cmd+Shift+F`), **When** searching for content within files, **Then** snippets of the matching content are displayed.

---

### Edge Cases

- **Broken Links**: If an internal link `[[missing-file]]` is clicked, the app should show a clear indicator or offer to create the file.
- **Concurrent Edits**: Since notes are also edited via Synology Drive/Obsidian, the app should handle external file changes gracefully (e.g., notify user or reload).
- **Large Files**: Search and preview performance for very large markdown files (e.g., >1MB).
- **Deep Nesting**: Handling file structures with many levels of subdirectories.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST authenticate users using a password provided via environment variable.
- **FR-002**: System MUST store sessions securely using JWT in a secure cookie.
- **FR-003**: System MUST provide a file explorer for navigating the notes directory.
- **FR-004**: System MUST support editing markdown files with syntax highlighting.
- **FR-005**: System MUST provide a real-time markdown preview.
- **FR-006**: System MUST resolve Obsidian-style internal links `[[path/to/file]]`.
- **FR-007**: System MUST support full-text search across all notes using Levenshtein distance (Fuzzy search).
- **FR-008**: System MUST support file name search (`Cmd+P`) using fuzzy matching.
- **FR-009**: System MUST render images stored within the notes directory correctly in the preview.
- **FR-010**: System MUST support searching within the currently opened note. The search MUST default to exact matching but provide a toggle to enable fuzzy matching (Levenshtein) for discovery.

### Key Entities

- **Note**: Represents a markdown file on disk. Attributes: path, name, content, last modified date.
- **User**: Represents the authenticated session. Attributes: session token.
- **Search Result**: Represents a match found during search. Attributes: file path, match score, content snippet.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can find any note by name within 2 seconds using fuzzy search.
- **SC-002**: Markdown preview renders within 100ms of typing a character.
- **SC-003**: Authentication session persists across browser restarts if "remember me" (implied by cookie) is active.
- **SC-004**: Users can navigate between two linked notes in a single click.
- **SC-005**: 100% of local image links in markdown files render successfully in the preview pane.