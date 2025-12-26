# API Contracts: Sidebar Sorting and Filtering

## Notes Management

### GET /api/notes
(Updated) Includes `createdAt` timestamp in the file information.

**Response:**
```json
[
  {
    "path": "folder/note.md",
    "name": "note",
    "isDirectory": false,
    "lastModified": "2025-12-26T10:00:00Z",
    "createdAt": "2025-12-25T08:00:00Z",
    "size": 1024
  }
]
```
