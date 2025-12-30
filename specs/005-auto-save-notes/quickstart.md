# Quickstart: Auto-save and session persistence

## Development Setup

1. **Verify Environment**: Ensure `bun` is installed and dependencies are up to date.
   ```bash
   bun install
   ```
2. **Global State**: The feature relies on `lib/store/useNoteStore.ts`. If you need to debug the session state, you can log the store content in the console.

## Testing Scenarios

### Scenario 1: Auto-save Logic
1. Open a note.
2. Toggle "Auto-save" to **ON**.
3. Edit the note.
4. Observe the "Saving..." indicator in the header after 2 seconds.
5. Verify that a `PUT` request is sent to `/api/notes/[path]`.
6. Verify the indicator changes to "Saved".

### Scenario 2: Session Persistence
1. Toggle "Auto-save" to **OFF**.
2. Edit "Note A". An "Unsaved" dot should appear.
3. Navigate to "Note B" using the sidebar.
4. Navigate back to "Note A".
5. Verify your edits are still there and the "Unsaved" dot persists.

### Scenario 3: Revert Changes
1. Edit a note (with auto-save OFF).
2. Click the **Revert** button in the header.
3. Confirm the action.
4. Verify the content returns to the version loaded from the disk.

## Implementation Checklist

- [ ] Initialize `useNoteStore` using TanStack Store.
- [ ] Create `useAutoSave` hook.
- [ ] Refactor `NewNoteEditor` to use the global store instead of local `content` state.
- [ ] Implement `SavingStatus` and `EditorHeader` components.
- [ ] Add persistence to `useNoteStore` using `sessionStorage`.