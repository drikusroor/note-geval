# API Contracts: Nested Directory Support

## Notes Management

### GET /api/notes?recursive=true
Returns a flat list of ALL markdown files and directories in the notes root for tree construction.

**Response:**
```json
[
  {
    "path": "folder",
    "name": "folder",
    "isDirectory": true,
    "lastModified": "2025-12-26T10:00:00Z"
  },
  {
    "path": "folder/note.md",
    "name": "note",
    "isDirectory": false,
    "lastModified": "2025-12-26T10:00:00Z"
  }
]
```

### GET /api/search?q=query
(Updated) Searches across all subdirectories.

**Response:**
Includes the full relative path for context.
```json
[
  {
    "item": {
      "path": "folder/subfolder/target.md",
      "name": "target",
      "content": "..."
    },
    "score": 0.1
  }
]
```
