# Quickstart: Nested Directory Support

## Testing Nested Structure

To verify the feature, create a nested directory structure in your `NOTES_DIR`:

```bash
mkdir -p example-notes/projects/work/meeting-notes
echo "# Work Project" > example-notes/projects/work/index.md
echo "# Meeting Dec 26" > example-notes/projects/work/meeting-notes/2025-12-26.md
echo "[[../index]]" >> example-notes/projects/work/meeting-notes/2025-12-26.md
```

## Verification Steps

1. **Sidebar Navigation**:
   - Open the app.
   - Expand `projects` -> `work` -> `meeting-notes`.
   - Click `2025-12-26.md` to open it.

2. **Internal Link Resolution**:
   - In `2025-12-26.md`, click the link `[[../index]]`.
   - It should navigate to `projects/work/index.md`.

3. **Global Search**:
   - Press `Cmd+Shift+F`.
   - Search for "Meeting".
   - It should show `projects/work/meeting-notes/2025-12-26.md`.
