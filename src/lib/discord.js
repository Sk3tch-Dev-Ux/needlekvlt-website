// ═══════════════════════════════════════════════
// Discord OAuth2 + Role Verification
// ═══════════════════════════════════════════════
// Handles Discord login flow and guild role checking.
// Used to gate the Courses page behind Discord membership.

const DISCORD_API = 'https://discord.com/api/v10';

// ── Get OAuth2 Authorization URL ────────────
export function getDiscordAuthUrl() {
  const params = new URLSearchParams({
    client_id: process.env.DISCORD_CLIENT_ID,
    redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/discord/callback`,
    response_type: 'code',
    scope: 'identify guilds guilds.members.read',
  });
  return `https://discord.com/oauth2/authorize?${params}`;
}

// ── Exchange Code for Token ─────────────────
export async function exchangeCode(code) {
  const res = await fetch(`${DISCORD_API}/oauth2/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env.DISCORD_CLIENT_ID,
      client_secret: process.env.DISCORD_CLIENT_SECRET,
      grant_type: 'authorization_code',
      code,
      redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/discord/callback`,
    }),
  });

  if (!res.ok) throw new Error('Failed to exchange Discord code');
  return res.json();
}

// ── Get Discord User ────────────────────────
export async function getDiscordUser(accessToken) {
  const res = await fetch(`${DISCORD_API}/users/@me`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) throw new Error('Failed to fetch Discord user');
  return res.json();
}

// ── Check Guild Membership via Bot ──────────
// Uses your bot token to check if user is in your server
// and what roles they have.
export async function getGuildMember(userId) {
  const guildId = process.env.DISCORD_GUILD_ID;
  const res = await fetch(`${DISCORD_API}/guilds/${guildId}/members/${userId}`, {
    headers: { Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}` },
  });

  if (res.status === 404) return null; // Not in guild
  if (!res.ok) throw new Error('Failed to check guild membership');
  return res.json();
}

// ── Verify Required Role ────────────────────
export async function hasRequiredRole(userId) {
  const member = await getGuildMember(userId);
  if (!member) return { isMember: false, hasRole: false };

  const requiredRoleId = process.env.DISCORD_REQUIRED_ROLE_ID;
  const hasRole = member.roles.includes(requiredRoleId);

  return {
    isMember: true,
    hasRole,
    roles: member.roles,
    nick: member.nick,
  };
}
