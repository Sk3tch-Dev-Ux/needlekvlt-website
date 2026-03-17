# ═══════════════════════════════════════════════
# NeedleKVLT — Windows Deployment Guide
# Docker Desktop on Windows VPS / Dedicated
# ═══════════════════════════════════════════════

## Prerequisites

1. **Windows Server 2019/2022** or **Windows 10/11 Pro** (needs Hyper-V)
2. **Docker Desktop for Windows** — https://www.docker.com/products/docker-desktop/
3. **Git for Windows** — https://git-scm.com/download/win
4. **Domain** pointed to your server's public IP (A record)

---

## Step 1 — Install Docker Desktop

1. Download Docker Desktop from https://www.docker.com/products/docker-desktop/
2. Run the installer — enable **WSL 2 backend** when prompted
3. Restart your machine
4. Open Docker Desktop and wait for it to start (green icon in system tray)
5. Open **PowerShell** and verify:
   ```powershell
   docker --version
   docker compose version
   ```

> **Windows Server note**: If Hyper-V isn't available, Docker Desktop will use WSL 2. 
> Run `wsl --install` in an elevated PowerShell first if needed.

---

## Step 2 — Clone the Repository

Open PowerShell:

```powershell
# Navigate to where you want the project
cd C:\

# Clone the repo
git clone https://github.com/YOUR_USER/needlekvlt-website.git
cd needlekvlt-website
```

---

## Step 3 — Configure Environment

```powershell
# Copy the example env file
Copy-Item .env.example .env.local

# Edit with Notepad (or your preferred editor)
notepad .env.local
```

Fill in **every** value in `.env.local`. The critical ones:

| Variable | Where to get it |
|----------|----------------|
| `NEXT_PUBLIC_APP_URL` | `https://needlekvlt.com` (your domain) |
| `STRIPE_SECRET_KEY` | Stripe Dashboard → API Keys |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe Dashboard → API Keys |
| `STRIPE_WEBHOOK_SECRET` | Stripe Dashboard → Webhooks (after Step 6) |
| `PRINTFUL_API_KEY` | Printful Dashboard → Developer → API |
| `PRINTFUL_STORE_ID` | Printful Dashboard → Stores |
| `DISCORD_CLIENT_ID` | Discord Developer Portal → Your App |
| `DISCORD_CLIENT_SECRET` | Discord Developer Portal → Your App |
| `DISCORD_BOT_TOKEN` | Discord Developer Portal → Your App → Bot |
| `DISCORD_GUILD_ID` | Right-click your server → Copy Server ID |
| `DISCORD_REQUIRED_ROLE_ID` | Server Settings → Roles → right-click → Copy Role ID |
| `NEXTAUTH_SECRET` | Generate: `openssl rand -base64 32` (or any random 32+ char string) |
| `NEXTAUTH_URL` | `https://needlekvlt.com` |

---

## Step 4 — SSL Certificates

### Option A: Cloudflare Tunnel (Recommended — Easiest)

Cloudflare Tunnel means **no open ports, no SSL certs, no Nginx**. The tunnel connects outbound from your machine to Cloudflare, and Cloudflare handles everything.

```powershell
# 1. Install cloudflared
winget install --id Cloudflare.cloudflared

# 2. Authenticate (opens browser)
cloudflared tunnel login

# 3. Create the tunnel
cloudflared tunnel create needlekvlt

# 4. Create config file at C:\Users\YOUR_USER\.cloudflared\config.yml
```

Paste this into `config.yml` (replace `<TUNNEL_ID>` with the ID from step 3):

```yaml
tunnel: needlekvlt
credentials-file: C:\Users\YOUR_USER\.cloudflared\<TUNNEL_ID>.json

ingress:
  - hostname: needlekvlt.com
    service: http://localhost:3000
  - hostname: www.needlekvlt.com
    service: http://localhost:3000
  - service: http_status:404
```

```powershell
# 5. Add DNS records (automatic via Cloudflare)
cloudflared tunnel route dns needlekvlt needlekvlt.com
cloudflared tunnel route dns needlekvlt www.needlekvlt.com

# 6. Test the tunnel
cloudflared tunnel run needlekvlt

# 7. Install as Windows service (auto-starts on boot)
cloudflared service install
```

**If using Cloudflare Tunnel, skip Steps 5-7 below** (no Nginx, firewall, or SSL needed).
In Step 8, just start the app container:
```powershell
docker compose up -d app
```

### Option B: win-acme (Let's Encrypt for Windows)

Download win-acme from https://www.win-acme.com/

```powershell
# Download and extract win-acme
Invoke-WebRequest -Uri "https://github.com/win-acme/win-acme/releases/latest/download/win-acme.v2.x.x.zip" -OutFile wacs.zip
Expand-Archive wacs.zip -DestinationPath C:\wacs

# Run it
C:\wacs\wacs.exe

# Follow the prompts:
#   - Create certificate (simple)
#   - Enter your domain: needlekvlt.com
#   - Choose validation: [http-01] Self-hosting
#   - Choose store: PEM files
#   - Set path: C:\needlekvlt-website\deploy\ssl
```

### Option C: Self-signed (for testing only)

```powershell
# Generate self-signed cert (testing only — browsers will warn)
mkdir deploy\ssl\live\needlekvlt.com -Force

openssl req -x509 -nodes -days 365 -newkey rsa:2048 `
  -keyout deploy\ssl\live\needlekvlt.com\privkey.pem `
  -out deploy\ssl\live\needlekvlt.com\fullchain.pem `
  -subj "/CN=needlekvlt.com"
```

---

## Step 5 — Build & Launch

```powershell
cd C:\needlekvlt-website

# If using Cloudflare Tunnel (recommended):
docker compose up -d --build app

# If using Nginx + SSL certs:
docker compose up -d --build

# Verify everything is running
docker compose ps

# Check logs
docker compose logs -f app
```

You should see:
```
needlekvlt-app    | ▲ Next.js 14.x
needlekvlt-app    | - Local: http://localhost:3000
needlekvlt-nginx  | nginx started
```

**Test locally**: Open http://localhost in your browser.

---

## Step 6 — Configure Webhooks

### Stripe Webhook
1. Go to https://dashboard.stripe.com/webhooks
2. Click **Add endpoint**
3. URL: `https://needlekvlt.com/api/stripe/webhook`
4. Events to listen for:
   - `checkout.session.completed`
   - `payment_intent.payment_failed`
5. Copy the **Signing secret** → paste into `.env.local` as `STRIPE_WEBHOOK_SECRET`
6. Restart: `docker compose restart app`

### Printful Webhook
1. Go to Printful Dashboard → Settings → Webhooks
2. URL: `https://needlekvlt.com/api/printful/sync`
3. Events: `package_shipped`, `order_failed`, `product_synced`

### Discord OAuth2 Redirect
1. Go to https://discord.com/developers/applications → Your App → OAuth2
2. Add redirect URL: `https://needlekvlt.com/api/auth/callback/discord`

---

## Step 7 — Windows Firewall

> **Skip this step if using Cloudflare Tunnel** — the tunnel connects outbound so no inbound ports are needed.

Open ports 80 and 443 in Windows Firewall:

```powershell
# Run as Administrator
New-NetFirewallRule -DisplayName "NeedleKVLT HTTP" -Direction Inbound -Port 80 -Protocol TCP -Action Allow
New-NetFirewallRule -DisplayName "NeedleKVLT HTTPS" -Direction Inbound -Port 443 -Protocol TCP -Action Allow
```

---

## Step 8 — Auto-Start on Boot

Docker Desktop starts automatically on login by default. To ensure the containers also start:

```powershell
# Containers already have restart: unless-stopped in docker-compose.yml
# They'll auto-restart when Docker Desktop starts

# To make Docker Desktop start on boot (if not already):
# Docker Desktop → Settings → General → Start Docker Desktop when you sign in
```

For a **headless Windows Server** (no desktop login), create a scheduled task:

```powershell
# Create scheduled task to start containers on boot
$action = New-ScheduledTaskAction -Execute "docker" -Argument "compose -f C:\needlekvlt-website\docker-compose.yml up -d"
$trigger = New-ScheduledTaskTrigger -AtStartup
$settings = New-ScheduledTaskSettingsSet -StartWhenAvailable
Register-ScheduledTask -TaskName "NeedleKVLT" -Action $action -Trigger $trigger -Settings $settings -User "SYSTEM"
```

---

## Useful Commands (PowerShell)

```powershell
# View live logs
docker compose logs -f app

# Restart the app (after .env changes)
docker compose restart app

# Full rebuild (after code changes)
docker compose up -d --build

# Stop everything
docker compose down

# Shell into the app container
docker compose exec app sh

# Check container status
docker compose ps

# View resource usage
docker stats
```

---

## Updating the Site

```powershell
cd C:\needlekvlt-website

# Pull latest code
git pull origin main

# Rebuild and restart
docker compose up -d --build
```

---

## Troubleshooting

### Docker Desktop won't start
- Ensure Hyper-V or WSL 2 is enabled
- Run `wsl --update` in elevated PowerShell
- Restart the machine

### Port 80/443 already in use
- IIS might be running: `iisreset /stop` or disable the World Wide Web Publishing Service
- Another app might be using the port: `netstat -ano | findstr :80`

### Container keeps restarting
```powershell
# Check what's wrong
docker compose logs app --tail 50
```

### Can't reach the site externally
- Check Windows Firewall rules (Step 7)
- Check your hosting provider's firewall/security group
- Verify DNS is pointing to the right IP: `nslookup needlekvlt.com`

### Stripe webhook returns 400
- Verify `STRIPE_WEBHOOK_SECRET` matches the Stripe dashboard
- Restart after changing: `docker compose restart app`
