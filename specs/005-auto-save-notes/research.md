# Research: Auto-save and session persistence

## Decision: State Management for Session Persistence

- **Choice**: TanStack Store with `sessionStorage` persistence.
- **Rationale**: TanStack Store is already listed in the project's constitution as the preferred global state management tool. Using `sessionStorage` ensures that unsaved changes persist across page refreshes and navigation within the same tab, fulfilling the "session persistence" requirement without complicating the backend with ephemeral data.
- **Alternatives Considered**: 
  - `localStorage`: Rejected because it persists across tabs and indefinitely, which might lead to confusion if multiple tabs edit the same note.
  - Backend-based draft storage: Rejected as too complex for the current requirement of "doesn't have to be super persistent".

## Decision: Auto-save Debouncing

- **Choice**: Custom `useAutoSave` hook using `useEffect` and `setTimeout`.
- **Rationale**: Minimal overhead and full control over the save lifecycle. The hook will watch the `dirtyNotes` state in the TanStack Store and trigger the `useMutation` from TanStack Query.
- **Implementation Detail**:
  ```typescript
  useEffect(() => {
    if (!isAutoSaveEnabled || !isDirty) return;
    const timer = setTimeout(() => {
      saveMutation.mutate(content);
    }, autoSaveDelay);
    return () => clearTimeout(timer);
  }, [content, isAutoSaveEnabled, isDirty]);
  ```

## Decision: User Settings Storage

- **Choice**: `localStorage` for `UserSettings`.
- **Rationale**: Settings like `isAutoSaveEnabled` should persist across sessions and tabs. Since there is currently no backend database for user profiles, `localStorage` is the most pragmatic choice.
- **Note**: A future `useSettings` hook will abstract this, allowing for easy migration to a backend API later.

## Decision: UI Integration

- **Location**: Editor Header.
- **Rationale**: Placing the status (Saving/Saved) and the "Revert" button in the editor header provides the most direct feedback. The "Auto-save" toggle can also be placed here or in a small settings dropdown to avoid adding a dedicated settings page yet.
- **Icons**: Use `Save`, `CloudUpload`, `CheckCircle`, `RefreshCcw` from `lucide-react`.

## Decision: Revert Mechanism

- **Choice**: Confirmation dialog followed by resetting the session state for the specific note.
- **Rationale**: Prevents accidental data loss. Resetting the session state will cause the `NewNoteEditor` to fall back to the `note.content` from the `useQuery` cache.