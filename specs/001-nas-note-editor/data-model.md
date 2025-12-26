# Data Model: NAS Markdown Note Editor

This application primarily uses the file system as its database.

## Entities

### Note (File-based)
Represents a markdown file stored in the bound volume.

| Field | Type | Description |
|-------|------|-------------|
| `path` | `string` | Relative path from the notes root (e.g., `tasks/todo.md`) |
| `name` | `string` | File name without extension |
| `content` | `string` | Raw markdown content |
| `lastModified` | `Date` | Last modification time from file system |
| `size` | `number` | File size in bytes |

### User (Session-only)
Authentication is verified against an environment variable.

| Field | Type | Description |
|-------|------|-------------|
| `passwordHash` | `string` | Provided via `NOTES_AUTH_PASSWORD` (can be plain or hashed) |

### Session (JWT)
Stored in a secure cookie.

| Field | Type | Description |
|-------|------|-------------|
| `sub` | `string` | Static user identifier (e.g., "admin") |
| `iat` | `number` | Issued at timestamp |
| `exp` | `number` | Expiration timestamp |

## Relationships

- **File System**: The root directory contains a hierarchy of `Note` files and optional subdirectories.
- **Images**: Local images referenced in `Note` content are served relative to the note's location or from a global assets directory if mapped.
