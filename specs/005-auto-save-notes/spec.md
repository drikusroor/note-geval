# Feature Specification: Auto-save and session persistence for notes

**Feature Branch**: `005-auto-save-notes`  
**Created**: 2025-12-30  
**Status**: Draft  
**Input**: User description: "we need a setting to turn on auto save for notes (couple of seconds after you edit it, async). if auto save is not turned on, we need to have some sort of indicator when you have edited a file. it needs to remember the changes you made if you navigate to another note (in session, doesn't have to be super persistent). and then we also need a revert button to revert your changes. what other UX could make this kind of feature even greater? if you have more ideas, please pitch them to me and we'll add them to the specs as well"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Auto-save Editing (Priority: P1)

As a user, I want my changes to be saved automatically while I type so that I don't lose work and don't have to remember to click save.

**Why this priority**: Core requirement of the feature. Prevents data loss and improves productivity.

**Independent Test**: Can be tested by enabling auto-save, editing a note, waiting for the configured delay, and verifying the file is updated on disk/backend without manual save action.

**Acceptance Scenarios**:

1. **Given** Auto-save is toggled ON, **When** I edit a note and stop typing for 2 seconds, **Then** the system asynchronously saves the changes to the backend.
2. **Given** Auto-save is in progress, **When** I continue typing, **Then** the previous auto-save timer is cancelled and a new one starts after I stop typing.

---

### User Story 2 - Unsaved Changes & Session Persistence (Priority: P1)

As a user, I want to see an indicator when I have unsaved changes and have those changes remembered if I navigate between notes during my session.

**Why this priority**: Essential for the non-auto-save flow. Ensures users can multitask without losing unsaved progress within a single session.

**Independent Test**: Disable auto-save, edit a note, navigate to another note, navigate back, and verify the edits are still present in the editor but marked as "unsaved".

**Acceptance Scenarios**:

1. **Given** Auto-save is toggled OFF, **When** I edit a note, **Then** an "Unsaved" indicator (e.g., a dot or label) appears near the note title or in the editor header.
2. **Given** I have unsaved changes in Note A, **When** I navigate to Note B and then back to Note A, **Then** my unsaved changes in Note A are restored from the session memory.

---

### User Story 3 - Revert Changes (Priority: P2)

As a user, I want a way to discard my current unsaved session changes and return to the last version saved on disk.

**Why this priority**: Provides a safety net for experiments and allows recovering from unwanted edits when auto-save is off.

**Independent Test**: Edit a note with auto-save off, click the "Revert" button, and verify the editor content matches the last saved version on disk.

**Acceptance Scenarios**:

1. **Given** I have unsaved changes in the session, **When** I click the "Revert" button, **Then** the system prompts for confirmation (optional but recommended) and replaces the session content with the version from the backend.
2. **Given** I have no unsaved changes, **When** I view the editor, **Then** the "Revert" button should be disabled or hidden.

---

### User Story 4 - Visual Saving Status (Priority: P2)

As a user, I want to see the status of the saving process so that I know exactly when my work is safe.

**Why this priority**: Enhances UX by providing immediate feedback for the asynchronous auto-save process.

**Independent Test**: Observe the editor header during an auto-save cycle and verify the transition from "Saving..." to "Saved".

**Acceptance Scenarios**:

1. **Given** An auto-save is triggered, **When** the async request is sent, **Then** a "Saving..." indicator appears.
2. **Given** The save operation completes successfully, **When** the response is received, **Then** the indicator briefly shows "Saved" or a checkmark before disappearing or returning to an idle state.

---

### Edge Cases

- **Network Failure during Auto-save**: How does the system handle a failed save request? (Expected: Retain unsaved state, show error indicator, and retry or prompt user).
- **Concurrent Edits**: What happens if a note is edited in two tabs/sessions? (Expected: Basic last-write-wins for now, or a conflict warning if session persistence detects a mismatch).
- **Closing Tab/Browser**: Should session changes persist across browser restarts? (User said "doesn't have to be super persistent", so memory-based or sessionStorage is sufficient).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide a settings toggle to enable or disable "Auto-save".
- **FR-002**: System MUST implement a debounce mechanism (default 2 seconds) for auto-save triggers.
- **FR-003**: System MUST save notes asynchronously to prevent UI blocking.
- **FR-004**: System MUST maintain an in-memory or session-based cache of "dirty" (unsaved) notes.
- **FR-005**: System MUST display a clear visual indicator (e.g., a "dot" or "unsaved" label) when a note has session changes not yet committed to disk.
- **FR-006**: System MUST provide a "Revert" button in the editor toolbar, active only when unsaved session changes exist.
- **FR-007**: System MUST show a "Saving..." status indicator during the asynchronous save process.
- **FR-008**: System MUST clear the session cache for a note once it is successfully saved (manually or automatically).

### Key Entities *(include if feature involves data)*

- **NoteSessionState**: Represents the ephemeral state of a note in the current browser session.
    - Attributes: `notePath`, `content`, `isDirty`, `lastSavedTimestamp`.
- **UserSettings**: Persisted user preferences.
    - Attributes: `isAutoSaveEnabled` (Boolean), `autoSaveDelay` (Integer, default 2000ms).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Auto-save triggers within 500ms of the defined delay after the user stops typing.
- **SC-002**: 100% of unsaved changes are preserved when navigating between different notes within the same browser session.
- **SC-003**: The "Revert" action completes in under 200ms (UI update).
- **SC-004**: "Unsaved" indicator state is updated immediately (under 100ms) upon any change to the editor content.
- **SC-005**: User can toggle auto-save on/off with immediate effect on editor behavior.