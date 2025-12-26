# Data Model: Sidebar Sorting and Filtering

This feature enhances the `TreeNode` processing logic with sorting and filtering capabilities.

## Entities

### Sort Criteria
Defines how the file tree should be ordered.

| Field | Type | Description |
|-------|------|-------------|
| `attribute` | `string` | One of: `name`, `createdAt`, `modifiedAt`, `size` |
| `direction` | `string` | `asc` or `desc` |

### Filter State
Defines the current filter applied to the tree.

| Field | Type | Description |
|-------|------|-------------|
| `query` | `string` | The case-insensitive substring to match against filenames |

## Processing Logic

### Recursive Sort
1. For each node in the current level:
   - If node is a folder, recursively sort its children.
2. Sort the current level:
   - Always keep Folders first.
   - Sort folders by chosen `SortCriteria`.
   - Sort files by chosen `SortCriteria`.

### Recursive Filter
1. For each node:
   - Check if node name matches `query`.
   - Recursively filter its children.
   - A node is "visible" if it matches OR any child is "visible".
2. Return the filtered tree.
