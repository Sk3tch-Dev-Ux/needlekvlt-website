# ═══════════════════════════════════════════════
# NeedleKVLT — Windows Deployment Script
# ═══════════════════════════════════════════════
# Run in PowerShell as Administrator:
#   .\deploy\setup.ps1
# ═══════════════════════════════════════════════

param(
    [string]$Domain = "needlekvlt.com"
)

$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "═══════════════════════════════════════════" -ForegroundColor Green
Write-Host "  NeedleKVLT — Windows VPS Setup" -ForegroundColor Green
Write-Host "  Domain: $Domain" -ForegroundColor Yellow
Write-Host "═══════════════════════════════════════════" -ForegroundColor Green
Write-Host ""

# ── 1. Check Docker ──────────────────────────
Write-Host "[1/5] Checking Docker..." -ForegroundColor Cyan
try {
    $dockerVersion = docker --version
    Write-Host "  ✓ $dockerVersion" -ForegroundColor Green
} catch {
    Write-Host "  ✗ Docker not found!" -ForegroundColor Red
    Write-Host "  Install Docker Desktop: https://www.docker.com/products/docker-desktop/" -ForegroundColor Yellow
    Write-Host "  After installing, restart this script." -ForegroundColor Yellow
    exit 1
}

try {
    $composeVersion = docker compose version
    Write-Host "  ✓ $composeVersion" -ForegroundColor Green
} catch {
    Write-Host "  ✗ Docker Compose not found!" -ForegroundColor Red
    exit 1
}

# ── 2. Check Environment File ────────────────
Write-Host "[2/5] Checking environment..." -ForegroundColor Cyan
if (-not (Test-Path ".env.local")) {
    Write-Host "  Creating .env.local from template..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env.local"
    
    Write-Host ""
    Write-Host "  ╔══════════════════════════════════════════╗" -ForegroundColor Red
    Write-Host "  ║  IMPORTANT: Edit .env.local with your    ║" -ForegroundColor Red
    Write-Host "  ║  actual API keys and secrets!             ║" -ForegroundColor Red
    Write-Host "  ╚══════════════════════════════════════════╝" -ForegroundColor Red
    Write-Host ""
    Write-Host "  Required keys:" -ForegroundColor Yellow
    Write-Host "    - STRIPE_SECRET_KEY" -ForegroundColor Gray
    Write-Host "    - STRIPE_WEBHOOK_SECRET" -ForegroundColor Gray
    Write-Host "    - PRINTFUL_API_KEY" -ForegroundColor Gray
    Write-Host "    - DISCORD_CLIENT_ID / SECRET / BOT_TOKEN" -ForegroundColor Gray
    Write-Host "    - NEXTAUTH_SECRET" -ForegroundColor Gray
    Write-Host ""
    
    # Open in notepad for editing
    Start-Process notepad ".env.local"
    
    Read-Host "  Press Enter after saving .env.local"
} else {
    Write-Host "  ✓ .env.local exists" -ForegroundColor Green
}

# Validate critical vars
$envContent = Get-Content ".env.local" -Raw
$missing = @()
@("STRIPE_SECRET_KEY", "PRINTFUL_API_KEY", "DISCORD_CLIENT_ID", "NEXTAUTH_SECRET") | ForEach-Object {
    if ($envContent -notmatch "$_=.+") {
        $missing += $_
    }
}
if ($missing.Count -gt 0) {
    Write-Host "  ⚠ Missing or empty values: $($missing -join ', ')" -ForegroundColor Yellow
    $continue = Read-Host "  Continue anyway? (y/n)"
    if ($continue -ne "y") { exit 1 }
}

# ── 3. SSL Certificates ─────────────────────
Write-Host "[3/5] Checking SSL certificates..." -ForegroundColor Cyan
$certPath = "deploy\ssl\live\$Domain"
if (-not (Test-Path "$certPath\fullchain.pem")) {
    Write-Host "  No SSL certificate found." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "  Options:" -ForegroundColor White
    Write-Host "  [1] Use Cloudflare (easiest — handles SSL for you)" -ForegroundColor Gray
    Write-Host "  [2] Use win-acme (Let's Encrypt for Windows)" -ForegroundColor Gray
    Write-Host "  [3] Generate self-signed (testing only)" -ForegroundColor Gray
    Write-Host "  [4] Skip (I'll set up SSL later)" -ForegroundColor Gray
    Write-Host ""
    $sslChoice = Read-Host "  Choose (1-4)"
    
    switch ($sslChoice) {
        "3" {
            Write-Host "  Generating self-signed certificate..." -ForegroundColor Yellow
            New-Item -ItemType Directory -Path $certPath -Force | Out-Null
            
            # Check if openssl is available
            try {
                openssl req -x509 -nodes -days 365 -newkey rsa:2048 `
                    -keyout "$certPath\privkey.pem" `
                    -out "$certPath\fullchain.pem" `
                    -subj "/CN=$Domain" 2>$null
                Write-Host "  ✓ Self-signed cert created (browsers will show warnings)" -ForegroundColor Green
            } catch {
                Write-Host "  openssl not found. Install Git for Windows (includes openssl)" -ForegroundColor Red
                Write-Host "  Or use Cloudflare for SSL instead." -ForegroundColor Yellow
            }
        }
        "1" {
            Write-Host "  Great choice! Set up Cloudflare:" -ForegroundColor Green
            Write-Host "    1. Add your domain to Cloudflare (free plan)" -ForegroundColor Gray
            Write-Host "    2. Update nameservers at your registrar" -ForegroundColor Gray
            Write-Host "    3. Set SSL/TLS mode to 'Flexible' or 'Full'" -ForegroundColor Gray
            Write-Host "    4. Cloudflare handles HTTPS for you" -ForegroundColor Gray
            Write-Host ""
            Write-Host "  Note: Edit deploy\nginx.conf to remove the SSL server block" -ForegroundColor Yellow
            Write-Host "  and keep only the port 80 block." -ForegroundColor Yellow
        }
        "2" {
            Write-Host "  Download win-acme from: https://www.win-acme.com/" -ForegroundColor Yellow
            Write-Host "  Run it and point certificate output to: $certPath" -ForegroundColor Yellow
        }
        default {
            Write-Host "  Skipping SSL setup." -ForegroundColor Yellow
        }
    }
} else {
    Write-Host "  ✓ SSL certificate found" -ForegroundColor Green
}

# ── 4. Windows Firewall ─────────────────────
Write-Host "[4/5] Configuring Windows Firewall..." -ForegroundColor Cyan
try {
    $existingHttp = Get-NetFirewallRule -DisplayName "NeedleKVLT HTTP" -ErrorAction SilentlyContinue
    if (-not $existingHttp) {
        New-NetFirewallRule -DisplayName "NeedleKVLT HTTP" -Direction Inbound -Port 80 -Protocol TCP -Action Allow | Out-Null
        Write-Host "  ✓ Port 80 opened" -ForegroundColor Green
    } else {
        Write-Host "  ✓ Port 80 already open" -ForegroundColor Green
    }
    
    $existingHttps = Get-NetFirewallRule -DisplayName "NeedleKVLT HTTPS" -ErrorAction SilentlyContinue
    if (-not $existingHttps) {
        New-NetFirewallRule -DisplayName "NeedleKVLT HTTPS" -Direction Inbound -Port 443 -Protocol TCP -Action Allow | Out-Null
        Write-Host "  ✓ Port 443 opened" -ForegroundColor Green
    } else {
        Write-Host "  ✓ Port 443 already open" -ForegroundColor Green
    }
} catch {
    Write-Host "  ⚠ Could not configure firewall. Run as Administrator." -ForegroundColor Yellow
}

# ── 5. Build & Launch ───────────────────────
Write-Host "[5/5] Building and launching..." -ForegroundColor Cyan
Write-Host "  This may take a few minutes on first build..." -ForegroundColor Gray

docker compose down 2>$null
docker compose up -d --build

Start-Sleep -Seconds 5

# Check status
$appStatus = docker compose ps --format json | ConvertFrom-Json | Where-Object { $_.Name -eq "needlekvlt-app" }

Write-Host ""
Write-Host "═══════════════════════════════════════════" -ForegroundColor Green
if ($appStatus.State -eq "running") {
    Write-Host "  ✅ NeedleKVLT is LIVE!" -ForegroundColor Green
} else {
    Write-Host "  ⚠ App may still be starting..." -ForegroundColor Yellow
    Write-Host "  Check logs: docker compose logs -f app" -ForegroundColor Yellow
}
Write-Host "═══════════════════════════════════════════" -ForegroundColor Green
Write-Host ""
Write-Host "  Local:   http://localhost" -ForegroundColor White
Write-Host "  Public:  https://$Domain" -ForegroundColor White
Write-Host ""
Write-Host "  ── Next Steps ──" -ForegroundColor Cyan
Write-Host "  1. Stripe webhook  → https://$Domain/api/stripe/webhook" -ForegroundColor Gray
Write-Host "  2. Printful webhook → https://$Domain/api/printful/sync" -ForegroundColor Gray
Write-Host "  3. Discord redirect → https://$Domain/api/auth/callback/discord" -ForegroundColor Gray
Write-Host ""
Write-Host "  ── Commands ──" -ForegroundColor Cyan
Write-Host "  docker compose logs -f app      # Live logs" -ForegroundColor Gray
Write-Host "  docker compose restart app      # Restart" -ForegroundColor Gray
Write-Host "  docker compose up -d --build    # Rebuild" -ForegroundColor Gray
Write-Host "  docker compose down             # Stop all" -ForegroundColor Gray
Write-Host ""
