# Quickstart: NAS Markdown Note Editor

## Environment Setup

1. **Clone the repository** (if not already done).
2. **Install dependencies**:
   ```bash
   bun install
   ```
3. **Configure Environment Variables**:
   Create a `.env` file in the root:
   ```env
   NOTES_AUTH_PASSWORD=your-secure-password
   NOTES_DIR=./example-notes
   JWT_SECRET=your-random-secret
   ```
4. **Prepare Example Notes**:
   ```bash
   mkdir -p example-notes/tasks
   echo "# Welcome to Note Geval" > example-notes/index.md
   echo "[[tasks/todo]]" >> example-notes/index.md
   echo "# My Tasks" > example-notes/tasks/todo.md
   ```

## Development

Run the development server:
```bash
bun run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

## Production (Docker)

To run as a container (similar to how it will run on the NAS):
```bash
docker build -t note-geval .
docker run -p 3000:3000 \
  -v /path/to/your/nas/notes:/app/notes \
  -e NOTES_AUTH_PASSWORD=your-password \
  -e NOTES_DIR=/app/notes \
  note-geval
```

## Quality Gates

Before pushing changes, run:
```bash
bun run lint
bun run check-types
bun test
bun run build
```
