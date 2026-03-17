import NextAuth from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';
import { hasRequiredRole } from '@/lib/discord';

// ═══════════════════════════════════════════════
// NextAuth Configuration
// ═══════════════════════════════════════════════
// Discord OAuth2 with automatic role verification.
// After login, we check the user's guild roles to determine
// if they can access gated content (courses).

export const authOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      authorization: {
        params: {
          scope: 'identify guilds guilds.members.read',
        },
      },
    }),
  ],

  callbacks: {
    async jwt({ token, account, profile }) {
      // On initial sign in, check guild membership + roles
      if (account && profile) {
        token.discordId = profile.id;
        token.username = profile.username;
        token.avatar = profile.avatar
          ? `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`
          : null;

        // Check roles via bot
        try {
          const roleCheck = await hasRequiredRole(profile.id);
          token.isMember = roleCheck.isMember;
          token.hasRequiredRole = roleCheck.hasRole;
          token.discordNick = roleCheck.nick;
        } catch (error) {
          console.error('Role check failed:', error);
          token.isMember = false;
          token.hasRequiredRole = false;
        }
      }

      return token;
    },

    async session({ session, token }) {
      session.user.discordId = token.discordId;
      session.user.username = token.username;
      session.user.avatar = token.avatar;
      session.user.isMember = token.isMember;
      session.user.hasRequiredRole = token.hasRequiredRole;
      session.user.discordNick = token.discordNick;
      return session;
    },
  },

  pages: {
    signIn: '/courses', // Redirect to courses page for login
  },

  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
