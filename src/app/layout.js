import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Banner from '@/components/Banner';
import PropellerPush from '@/components/PropellerPush';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Downlyvieo - Download Videos Without Watermarks',
  description: 'Fast, free, and easy. Download from TikTok, Instagram, Facebook, and Twitter in HD quality.',
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" sizes="32x32" />
        <meta name="monetag" content="7d794aa7ba57d4b93636821533951f14" />
      </head>
      <body className={inter.className}>
        <Navbar />
        
        {/* ---- HEADER BANNER (Adsterra) ---- */}
        <Banner position="header" />
        
        {/* ---- MAIN CONTENT ---- */}
        <main className="flex-1">{children}</main>
        
        {/* ---- MIDDLE BANNER (Adsterra) ---- */}
        <Banner position="middle" />
        
        {/* ---- FOOTER BANNER (Adsterra) ---- */}
        <Banner position="footer" />
        
        {/* ---- PROPELLERADS IN-PAGE PUSH (global) ---- */}
        <PropellerPush />
        
        <Footer />
      </body>
    </html>
  );
}