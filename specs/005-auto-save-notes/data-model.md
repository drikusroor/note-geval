# Data Model: Auto-save and session persistence

## Session State (Ephemeral)

### NoteDraft
The unsaved state of a single note.

| Field | Type | Description |
|-------|------|-------------|
| `path` | `string` | Unique identifier (relative path) |
| `content` | `string` | The current edited content in the session |
| `isDirty` | `boolean` | Whether the content differs from the last saved version |
| `lastSavedContent` | `string` | The content at the time of the last successful save |

### NoteSessionStore
Global state for all notes in the current session.

| Field | Type | Description |
|-------|------|-------------|
| `dirtyNotes` | `Record<string, NoteDraft>` | Map of note paths to their draft state |

---

## User Settings (Persisted)

### UserSettings
User preferences stored in `localStorage`.

| Field | Type | Description |
|-------|------|-------------|
| `isAutoSaveEnabled` | `boolean` | Global toggle for auto-save feature |
| `autoSaveDelay` | `number` | Time in ms to wait before auto-saving (default 2000) |

---

## State Transitions

1. **Initialization**: Note loaded -> Draft created in store with `isDirty: false`.
2. **Editing**: User types -> Update `content` in Draft, set `isDirty: true`.
3. **Auto-save Triggered**: Delay elapsed -> Trigger API call.
4. **Saving**: API call in progress -> UI shows "Saving...".
5. **Saved**: API success -> Set `lastSavedContent = content`, `isDirty: false`, UI shows "Saved".
6. **Revert**: User clicks Revert -> Prompt -> Set `content = lastSavedContent`, `isDirty: false`.
7. **Navigation**: User switches note -> Current Draft remains in store; new Note Draft initialized if not present.