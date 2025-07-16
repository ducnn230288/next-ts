# Stage 1: Build the application with all dependencies
FROM node:22-slim AS builder
WORKDIR /app

# Install both dev and production dependencies based on lockfile
COPY package.json ./
RUN npm install
# Copy source files and build Next.js in standalone mode
COPY . .
# RUN apt-get update -y && apt-get install -y openssl
RUN npx prisma generate
RUN npm run build

# Stage 2: Prepare the minimal runtime image
FROM node:22-slim AS runner
WORKDIR /app

# Copy only the standalone server code and static assets
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma

# (Optional) Create and switch to a non-root user for security
RUN groupadd --system nextjs && useradd --system --gid nextjs nextjs
USER nextjs

# Expose the application port and start the server
EXPOSE 3000
CMD ["node", "server.js"]