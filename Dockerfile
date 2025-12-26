# Use the official Bun image
FROM oven/bun:latest AS base
WORKDIR /app

# Step 1: Install dependencies
FROM base AS deps
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Step 2: Build the application
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set environment variables for build
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
# Dummy values to satisfy Zod validation during build
ENV NOTES_AUTH_PASSWORD=placeholder
ENV NOTES_DIR=/notes
ENV JWT_SECRET=placeholder_secret_long_enough
ENV PORT=3000

RUN bun run build

# Ensure public directory exists (might be empty)
RUN mkdir -p public

# Step 3: Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV NOTES_DIR=/notes

# Create notes directory
RUN mkdir -p /notes

# Copy standalone build and static files
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000

# Next.js standalone creates a server.js file
CMD ["bun", "server.js"]