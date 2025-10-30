// app/layout.js
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Banner from '@/components/Banner';
import InterstitialAd from '@/components/InterstitialAd';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Downlyvieo - Download Videos Without Watermarks',
  description: 'Fast, free, and easy. Download from TikTok, Instagram, Facebook, and Twitter in HD quality.',
  icons: { icon: "/favicon.png" },
};

// GLOBAL ADS: Social Bar + Preload Native Script
const GlobalAds = () => (
  <>
    {/* SOCIAL BAR */}
    <script
      type="text/javascript"
      src="//pl27954555.effectivegatecpm.com/21/81/05/218105b20068189f3aecadb4a665ae0b.js"
      async
    />
    {/* Preload Native invoke.js */}
    <link
      rel="preload"
      href="//pl27954563.effectivegatecpm.com/0e1640332d1c1c66fd5db9d9651057fa/invoke.js"
      as="script"
    />
  </>
);

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" sizes="32x32" />
        <meta name="monetag" content="7d794aa7ba57d4b93636821533951f14" />
        <GlobalAds />
      </head>
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Navbar />

          {/* HEADER NATIVE AD */}
          <Banner position="header" />

          <main className="flex-1 w-full">
            <div className="container mx-auto px-4 py-6">{children}</div>
          </main>

          {/* MIDDLE NATIVE AD */}
          <Banner position="middle" />

          {/* FOOTER NATIVE AD */}
          <Banner position="footer" />

          {/* INTERSTITIAL (once per session) */}
          <InterstitialAd />

          <Footer />
        </div>
      </body>
    </html>
  );
}