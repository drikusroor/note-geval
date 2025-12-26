# Note Geval

Note Geval is a Next.js web application whose goal is to create and manage notes stored on my Synology NAS through a Docker volume.

To install dependencies:

```bash
bun install
```

### Setup

1. **Configure Environment Variables**:
   Copy `.env.example` to `.env` and fill in your values:
   ```bash
   cp .env.example .env
   ```
2. **Prepare Notes**:
   Ensure the directory specified in `NOTES_DIR` exists and contains some `.md` files.

To run:

```bash
bun run dev
```

### Deployment on Synology NAS (Docker)

To deploy this application on your Synology NAS using Docker:

#### 1. Prepare your NAS
- Ensure the **Container Manager** (formerly Docker) package is installed.
- Create a folder on your NAS where your notes are stored (e.g., `/volume1/docker/notes`).

#### 2. Strategy Choice
You have two main options:

**A. Pull from GitHub Container Registry (Recommended)**
GitHub automatically builds and hosts the image for you.
1. On your NAS, open **Container Manager** > **Registry**.
2. Click **Settings** > **Add** and add `ghcr.io`.
3. Search for your image (e.g., `ghcr.io/your-username/note-geval`).
4. Download the `latest` tag.
5. Create a container using the image, mapping the port (default 3000) and the volumes as described below.

**B. Build on NAS**
1. Clone this repository directly onto your NAS (via SSH or Git Server).
2. Create a `.env` file in the root with your credentials, including `PORT` if you want to change it.
3. Open **Container Manager**, go to **Project**, click **Create**, and point it to the repository folder.
4. It will use the `docker-compose.yml` to build and start the app.

**C. Build Locally and Export**
1. Build the image on your local machine: `docker build -t note-geval:latest .`
2. Save the image: `docker save note-geval:latest > note-geval.tar`
3. Upload the `.tar` file to your NAS and import it in **Container Manager** > **Image** > **Add** > **From File**.
4. Create a container from the image, mapping port 3000 and volumes manually.

#### 3. Configuration (docker-compose.yml)
Update the `volumes` section in `docker-compose.yml` to point to your actual NAS folder:
```yaml
volumes:
  - /volume1/docker/notes:/notes
```

### Verification & Quality Gates

This project follows a strict [Constitution](.specify/memory/constitution.md). Before completing any feature, ensure the following pass:

```bash
bun run lint         # Linting and formatting (Biome)
bun run check-types  # TypeScript type checking
bun run build        # Production build verification
bun test             # Unit and integration tests
```

This project was created using `bun init` in bun v1.3.5. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.