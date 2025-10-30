// app/layout.js
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Banner from '@/components/Banner';
import InterstitialAd from '@/components/InterstitialAd';
import Script from 'next/script';
import ToastProvider from '@/components/ToastProvider';
import { Analytics } from "@vercel/analytics/next";

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
        {/* Google Tag Manager (noscript) - Must be immediately after <body> */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-52K4X583"
            height="0" 
            width="0" 
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

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

        {/* Google Tag Manager Script - Load with high priority */}
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-52K4X583');
            `,
          }}
        />
        <ToastProvider /> {/* ← Toasts work everywhere */}
          <Analytics />
      </body>
    </html>
  );
}