# API Contracts: NAS Markdown Note Editor

## Authentication

### POST /api/auth/login
Authenticates the user and sets a secure JWT cookie.

**Request Body:**
```json
{
  "password": "..."
}
```

**Response:**
- `200 OK`: Success, cookie set.
- `401 Unauthorized`: Invalid password.

---

## Notes Management

### GET /api/notes
Returns a list of all notes (file names and paths).

**Query Parameters:**
- `q`: (Optional) Search query for file names (fuzzy).

**Response:**
```json
[
  {
    "path": "tasks/example.md",
    "name": "example",
    "lastModified": "2025-12-26T10:00:00Z"
  }
]
```

### GET /api/notes/[...path]
Returns the content and metadata of a specific note.

**Response:**
```json
{
  "path": "tasks/example.md",
  "content": "# Hello World",
  "lastModified": "2025-12-26T10:00:00Z"
}
```

### PUT /api/notes/[...path]
Updates the content of a note. Creates it if it doesn't exist.

**Request Body:**
```json
{
  "content": "Updated content..."
}
```

**Response:**
- `200 OK`: Updated successfully.

### DELETE /api/notes/[...path]
Deletes a note.

---

## Global Search

### GET /api/search
Performs a full-text fuzzy search across all notes.

**Query Parameters:**
- `q`: The search term.

**Response:**
```json
[
  {
    "path": "tasks/example.md",
    "score": 0.95,
    "snippets": ["...matched **term** in content..."]
  }
]
```
