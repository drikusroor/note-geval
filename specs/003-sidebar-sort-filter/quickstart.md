# Quickstart: Sidebar Sorting and Filtering

## Testing Sidebar Sorting

1. **Open the sidebar**.
2. **Locate the "Sort" button** (likely an icon next to the "Notes" header).
3. **Select different criteria**:
   - **Name**: Should sort alphabetically (A-Z or Z-A).
   - **Modified At**: Should show the most recently edited files at the top.
   - **Created At**: Should show the oldest or newest notes.
   - **Size**: Should sort by file size.
4. **Observe the "Folders First" logic**: No matter the sort criteria, folders should always cluster at the top of each level.

## Testing Sidebar Filtering

1. **Locate the search input** at the top of the sidebar.
2. **Type a keyword** (e.g., "work").
3. **Verify the results**:
   - Only files/folders matching "work" should be visible.
   - If a file `projects/work/report.md` matches, the folders `projects` and `work` must remain visible to show the path.
4. **Clear the input**: The full tree should return immediately.
