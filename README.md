# NeedleKVLT Website

**Premium tattoo & piercing supplies, brutal merch, and a community built by artists, for artists.**

A full-stack e-commerce platform built with Next.js 14, Stripe Checkout, Printful fulfillment, and Discord OAuth role-gating.

---

## Architecture

```
Customer browses → Adds to cart → Stripe Checkout → Payment succeeds
                                                          │
                                    ┌─────────────────────┴──────────────────────┐
                                    │                                            │
                              Printful items                              Manual items
                                    │                                            │
                         Printful API creates order                 Discord webhook alert
                                    │                                to fulfill manually
                         Printful prints & ships
                                    │
                         Tracking email to customer
```

### Fulfillment Types

| Type | Products | How it works |
|------|----------|-------------|
| **Printful** | Apparel, merch, accessories | Stripe webhook → Printful API → auto-print & ship |
| **Manual** | Tools, needles, ink, jewelry, aftercare | Stripe webhook → Discord alert → you ship from inventory |

---

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + custom theme
- **Icons**: Lucide React
- **State**: Zustand (cart)
- **Auth**: NextAuth.js (Discord OAuth2)
- **Payments**: Stripe Checkout
- **Fulfillment**: Printful API
- **Deployment**: Docker + Nginx on VPS

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage — hero, featured products, features, community CTAs |
| `/merch` | Shop — all products with category filtering |
| `/product/[id]` | Product detail — description, qty selector, related products |
| `/courses` | Members-only training — gated behind Discord role verification |
| `/support` | FAQ accordion, shipping info, contact |
| `/checkout` | Cart summary → Stripe Checkout redirect |

---

## Setup

### Prerequisites

- Node.js 20+
- A [Stripe](https://stripe.com) account
- A [Printful](https://printful.com) account with a connected store
- A [Discord](https://discord.com/developers) application with a bot

### 1. Clone & Install

```bash
git clone https://github.com/YOUR_USER/needlekvlt-website.git
cd needlekvlt-website
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env.local
```

Edit `.env.local` with your values. See the file for descriptions of each key.

### 3. Stripe Setup

1. Get your API keys from [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
2. Set `STRIPE_SECRET_KEY` and `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
3. Install the Stripe CLI for local webhook testing:
   ```bash
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   ```
4. Copy the webhook signing secret to `STRIPE_WEBHOOK_SECRET`

### 4. Printful Setup

1. Create a store at [printful.com](https://www.printful.com)
2. Design your products in the Printful dashboard (tees, hoodies, snapbacks, bags, etc.)
3. Get your API key from [Developer settings](https://www.printful.com/dashboard/developer/api)
4. Set `PRINTFUL_API_KEY` and `PRINTFUL_STORE_ID`
5. Copy each product's `sync_variant_id` from Printful into `src/lib/products.js`

### 5. Discord Setup

1. Create an app at [Discord Developer Portal](https://discord.com/developers/applications)
2. Enable the **bot** and add it to your server with `guilds.members.read` scope
3. Set these in `.env.local`:
   - `DISCORD_CLIENT_ID` — from your Discord app
   - `DISCORD_CLIENT_SECRET` — from your Discord app
   - `DISCORD_BOT_TOKEN` — from the Bot section
   - `DISCORD_GUILD_ID` — right-click your server → Copy Server ID
   - `DISCORD_REQUIRED_ROLE_ID` — right-click the role → Copy Role ID
4. Add the OAuth2 redirect URL in Discord:
   ```
   http://localhost:3000/api/auth/callback/discord
   ```

### 6. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Stripe ↔ Printful Integration

This is how the two services connect:

### Payment Flow

1. Customer clicks "Checkout" → `POST /api/stripe/checkout` creates a Stripe Checkout Session
2. Customer pays on Stripe's hosted page
3. Stripe sends `checkout.session.completed` webhook to `POST /api/stripe/webhook`
4. Webhook handler separates items by `fulfillment_type`:
   - **Printful items** → `createOrder()` + `confirmOrder()` via Printful API
   - **Manual items** → Discord webhook alert for you to ship
5. Printful prints, packages, and ships directly to the customer
6. Printful sends `package_shipped` webhook with tracking number

### Connecting Product IDs

Each product in `src/lib/products.js` can have:

```js
{
  fulfillment_type: 'printful',           // or 'manual'
  printful_sync_variant_id: 123456789,    // From Printful dashboard
  printful_variant_id: 4012,              // Printful catalog variant ID
}
```

To find these IDs:
1. Go to your Printful dashboard → Products
2. Click a product → look at the URL or use the sync API:
   ```bash
   curl -H "Authorization: Bearer YOUR_API_KEY" \
     https://api.printful.com/store/products
   ```

### Webhook Endpoints

| Endpoint | Source | Purpose |
|----------|--------|---------|
| `/api/stripe/webhook` | Stripe | Payment events → trigger fulfillment |
| `/api/printful/sync` | Printful | Shipping updates, order status changes |

---

## GitHub Repository Setup

```powershell
# 1. Create a new repo on GitHub (github.com/new)
#    Name: needlekvlt-website
#    Private: Yes
#    Don't initialize with README

# 2. In your local project folder:
cd C:\needlekvlt-website
git init
git add .
git commit -m "Initial commit — NeedleKVLT e-commerce platform"
git branch -M main
git remote add origin https://github.com/YOUR_USER/needlekvlt-website.git
git push -u origin main
```

---

## Deployment (Windows VPS / Dedicated)

> Full step-by-step guide: **[deploy/WINDOWS-DEPLOY.md](deploy/WINDOWS-DEPLOY.md)**

### Requirements

- Windows Server 2019+ or Windows 10/11 Pro
- Docker Desktop for Windows
- Git for Windows

### Quick Deploy

```powershell
# Clone the repo
git clone https://github.com/YOUR_USER/needlekvlt-website.git C:\needlekvlt-website
cd C:\needlekvlt-website

# Copy environment template and fill in your keys
Copy-Item .env.example .env.local
notepad .env.local

# Run the setup script (as Administrator)
.\deploy\setup.ps1
```

The PowerShell script handles: Docker verification, environment validation, SSL setup options (Cloudflare / win-acme / self-signed), Windows Firewall rules, and building + launching the containers.

### Cloudflare Tunnel (Recommended)

If you're using Cloudflare Tunnel, you can **skip Nginx, SSL certs, and firewall rules entirely**. The tunnel connects outbound from your machine — no open ports needed.

```powershell
# 1. Start only the app container (no nginx needed)
docker compose up -d --build app

# 2. Install cloudflared
winget install --id Cloudflare.cloudflared

# 3. Authenticate with Cloudflare
cloudflared tunnel login

# 4. Create the tunnel
cloudflared tunnel create needlekvlt

# 5. Configure the tunnel — create config file
#    Location: C:\Users\YOUR_USER\.cloudflared\config.yml
```

Create `config.yml`:

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
# 6. Add DNS records in Cloudflare
cloudflared tunnel route dns needlekvlt needlekvlt.com
cloudflared tunnel route dns needlekvlt www.needlekvlt.com

# 7. Run the tunnel
cloudflared tunnel run needlekvlt

# 8. (Optional) Install as Windows service so it starts on boot
cloudflared service install
```

That's it — Cloudflare handles SSL, DDoS protection, and routing. Your app only needs to listen on `localhost:3000`.

### Manual Deploy (Without Cloudflare Tunnel)

```powershell
# 1. Edit .env.local with your API keys
Copy-Item .env.example .env.local
notepad .env.local

# 2. Build and start
docker compose up -d --build

# 3. Open firewall ports
New-NetFirewallRule -DisplayName "NeedleKVLT HTTP" -Direction Inbound -Port 80 -Protocol TCP -Action Allow
New-NetFirewallRule -DisplayName "NeedleKVLT HTTPS" -Direction Inbound -Port 443 -Protocol TCP -Action Allow
```

### Post-Deploy Checklist

- [ ] Configure Stripe webhook URL: `https://needlekvlt.com/api/stripe/webhook`
- [ ] Configure Printful webhook URL: `https://needlekvlt.com/api/printful/sync`
- [ ] Update Discord OAuth2 redirect: `https://needlekvlt.com/api/auth/callback/discord`
- [ ] Update `NEXT_PUBLIC_APP_URL` in `.env.local` to `https://needlekvlt.com`
- [ ] Update `NEXTAUTH_URL` in `.env.local` to `https://needlekvlt.com`
- [ ] Test a real purchase with Stripe test mode
- [ ] Switch Stripe to live mode when ready
- [ ] Set up DNS (Cloudflare Tunnel handles this automatically, otherwise A record → server IP)

### Useful Commands

```powershell
docker compose logs -f app        # View live logs
docker compose restart app        # Restart the app
docker compose down               # Stop everything
docker compose up -d --build      # Rebuild and restart
docker compose exec app sh        # Shell into container
```

---

## Project Structure

```
needlekvlt-website/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/[...nextauth]/route.js    # NextAuth Discord OAuth
│   │   │   ├── stripe/
│   │   │   │   ├── checkout/route.js           # Create Stripe Checkout session
│   │   │   │   └── webhook/route.js            # Handle payment → Printful
│   │   │   └── printful/
│   │   │       └── sync/route.js               # Product sync + Printful webhooks
│   │   ├── checkout/page.js                    # Checkout → Stripe redirect
│   │   ├── courses/                            # Discord role-gated courses
│   │   ├── merch/                              # Product catalog with filters
│   │   ├── product/[id]/                       # Product detail pages
│   │   ├── support/                            # FAQ + shipping + contact
│   │   ├── layout.js                           # Root layout
│   │   ├── page.js                             # Homepage
│   │   └── providers.js                        # NextAuth session provider
│   ├── components/
│   │   ├── CartDrawer.js                       # Slide-out cart
│   │   ├── Footer.js
│   │   ├── Navbar.js
│   │   ├── ProductCard.js
│   │   └── ProductIcon.js                      # Lucide icon mapper
│   ├── hooks/
│   │   └── useCart.js                          # Zustand cart store
│   ├── lib/
│   │   ├── discord.js                          # Discord OAuth + role checking
│   │   ├── printful.js                         # Printful API client
│   │   ├── products.js                         # Product catalog
│   │   └── stripe.js                           # Stripe Checkout + webhooks
│   └── styles/
│       └── globals.css                         # Tailwind + custom styles
├── deploy/
│   ├── nginx.conf                              # Reverse proxy config
│   ├── setup.ps1                               # Windows PowerShell deploy script
│   ├── setup.sh                                # Linux deploy script (alternative)
│   ├── WINDOWS-DEPLOY.md                       # Full Windows deployment guide
│   └── ssl/                                    # SSL certs (gitignored)
├── public/                                     # Static assets
├── .env.example                                # Environment template
├── .gitignore
├── docker-compose.yml                          # Production Docker setup
├── Dockerfile                                  # Multi-stage build
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── README.md
```

---

## License

Private — All rights reserved. NeedleKVLT © 2026.
