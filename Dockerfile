# ═══════════════════════════════════════════════
# NeedleKVLT — Production Dockerfile
# Multi-stage build for minimal image size
# ═══════════════════════════════════════════════

# ── Stage 1: Dependencies ────────────────────
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* yarn.lock* ./
RUN npm ci --only=production && \
    cp -R node_modules /prod_modules && \
    npm ci

# ── Stage 2: Build ───────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build args for environment variables needed at build time
ARG NEXT_PUBLIC_APP_URL
ARG NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
ARG NEXT_PUBLIC_DISCORD_INVITE

ENV NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL
ENV NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=$NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
ENV NEXT_PUBLIC_DISCORD_INVITE=$NEXT_PUBLIC_DISCORD_INVITE
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# ── Stage 3: Production ─────────────────────
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Security: run as non-root
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy standalone output
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
