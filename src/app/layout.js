import '@/styles/globals.css';
import { SessionProvider } from './providers';

export const metadata = {
  title: 'NeedleKVLT — Tattoo & Piercing Supplies',
  description: 'Premium supplies, brutal merch, and a community built by artists, for artists. No compromises.',
  keywords: ['tattoo', 'piercing', 'supplies', 'needles', 'ink', 'merch', 'community'],
  openGraph: {
    title: 'NeedleKVLT — Tattoo & Piercing Supplies',
    description: 'Premium supplies, brutal merch, and a community built by artists, for artists.',
    url: 'https://needlekvlt.com',
    siteName: 'NeedleKVLT',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
