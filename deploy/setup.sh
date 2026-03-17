#!/bin/bash
# ═══════════════════════════════════════════════
# NeedleKVLT — VPS Deployment Script
# ═══════════════════════════════════════════════
# Usage: ./deploy/setup.sh
#
# Prerequisites:
#   - Ubuntu 22.04+ or Debian 12+
#   - Root or sudo access
#   - Domain pointed to this server's IP

set -euo pipefail

DOMAIN="${DOMAIN:-needlekvlt.com}"
APP_DIR="/opt/needlekvlt"
REPO_URL="${REPO_URL:-git@github.com:YOUR_USER/needlekvlt-website.git}"

echo "═══════════════════════════════════════════"
echo "  NeedleKVLT — VPS Setup"
echo "  Domain: $DOMAIN"
echo "═══════════════════════════════════════════"

# ── 1. System Updates ────────────────────────
echo "[1/7] Updating system..."
apt-get update -y && apt-get upgrade -y

# ── 2. Install Docker ────────────────────────
echo "[2/7] Installing Docker..."
if ! command -v docker &> /dev/null; then
  curl -fsSL https://get.docker.com | sh
  systemctl enable docker
  systemctl start docker
fi

# Install Docker Compose plugin
if ! docker compose version &> /dev/null; then
  apt-get install -y docker-compose-plugin
fi

echo "Docker: $(docker --version)"
echo "Compose: $(docker compose version)"

# ── 3. Install Certbot ──────────────────────
echo "[3/7] Installing Certbot..."
apt-get install -y certbot

# ── 4. Clone Repository ─────────────────────
echo "[4/7] Setting up application..."
if [ -d "$APP_DIR" ]; then
  cd "$APP_DIR"
  git pull origin main
else
  git clone "$REPO_URL" "$APP_DIR"
  cd "$APP_DIR"
fi

# ── 5. Configure Environment ────────────────
echo "[5/7] Checking environment..."
if [ ! -f .env.local ]; then
  cp .env.example .env.local
  echo ""
  echo "⚠️  IMPORTANT: Edit .env.local with your actual values!"
  echo "    nano $APP_DIR/.env.local"
  echo ""
  echo "  Required keys:"
  echo "    - STRIPE_SECRET_KEY"
  echo "    - STRIPE_WEBHOOK_SECRET"
  echo "    - PRINTFUL_API_KEY"
  echo "    - DISCORD_CLIENT_ID"
  echo "    - DISCORD_CLIENT_SECRET"
  echo "    - DISCORD_BOT_TOKEN"
  echo "    - NEXTAUTH_SECRET (run: openssl rand -base64 32)"
  echo ""
  read -p "Press Enter after editing .env.local..."
fi

# ── 6. SSL Certificate ──────────────────────
echo "[6/7] Setting up SSL..."
CERT_PATH="/opt/needlekvlt/deploy/ssl/live/$DOMAIN"
if [ ! -d "$CERT_PATH" ]; then
  echo "Obtaining Let's Encrypt certificate for $DOMAIN..."
  certbot certonly --standalone \
    -d "$DOMAIN" -d "www.$DOMAIN" \
    --non-interactive --agree-tos \
    --email "admin@$DOMAIN" \
    --cert-path "$APP_DIR/deploy/ssl/"
  
  # Copy certs to deploy directory
  mkdir -p "$APP_DIR/deploy/ssl/live/$DOMAIN"
  cp "/etc/letsencrypt/live/$DOMAIN/fullchain.pem" "$APP_DIR/deploy/ssl/live/$DOMAIN/"
  cp "/etc/letsencrypt/live/$DOMAIN/privkey.pem" "$APP_DIR/deploy/ssl/live/$DOMAIN/"
else
  echo "SSL certificate already exists."
fi

# ── 7. Build & Launch ───────────────────────
echo "[7/7] Building and launching..."
docker compose down 2>/dev/null || true
docker compose up -d --build

echo ""
echo "═══════════════════════════════════════════"
echo "  ✅ NeedleKVLT is live!"
echo "  https://$DOMAIN"
echo "═══════════════════════════════════════════"
echo ""
echo "Useful commands:"
echo "  docker compose logs -f app     # View app logs"
echo "  docker compose restart app     # Restart app"
echo "  docker compose down            # Stop everything"
echo "  docker compose up -d --build   # Rebuild & restart"
echo ""
echo "Next steps:"
echo "  1. Set up Stripe webhook → https://$DOMAIN/api/stripe/webhook"
echo "  2. Set up Printful webhook → https://$DOMAIN/api/printful/sync"
echo "  3. Configure Discord app redirect → https://$DOMAIN/api/auth/callback/discord"
echo ""
