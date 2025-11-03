// app/layout.js
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SocialBarAd from '@/components/SocialBarAd';
import NativeAd from '@/components/NativeAd';
import BannerAd from '@/components/Banner';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'DownlyVideo – Download TikTok, Instagram, Facebook & Twitter Videos Without Watermark',
  description:
    'Free online video downloader for TikTok, Instagram (IG), Facebook, and X (Twitter). Paste your link and download any video in HD MP4 quality — fast, secure, and no watermark needed.',
  keywords: [
    'download TikTok video',
    'TikTok video downloader',
    'download Instagram video',
    'Instagram Reels downloader',
    'download Facebook video',
    'Facebook video saver',
    'download Twitter video',
    'X video downloader',
    'HD video download',
    'no watermark video downloader',
    'free video downloader online',
  ],
  icons: { icon: '/favicon.png' },
  openGraph: {
    title: 'DownlyVideo – Download Videos Without Watermarks',
    description:
      'Fast, free, and secure downloader for TikTok, Instagram, Facebook, and X videos in HD. Paste your link and download instantly — no watermark.',
    url: 'https://downlyvideo.com',
    siteName: 'DownlyVideo',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'DownlyVideo – Download Videos Without Watermarks',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DownlyVideo – Download TikTok, Instagram, Facebook & X Videos',
    description:
      'Download TikTok, Instagram, Facebook, and X (Twitter) videos for free in HD. No watermark, no app needed.',
    images: ['/og-image.png'],
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
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-52K4X583"
            height="0" width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        <div className="min-h-screen flex flex-col">
          <Navbar />

          {/* NATIVE AD AT TOP - Shows on ALL pages */}
          <div className="w-full bg-gray-50 border-b border-gray-200">
            <div className="container mx-auto px-4">
              <NativeAd position="header" />
            </div>
          </div>

          {/* Main Content */}
          <main className="flex-1 w-full">
            {children}
          </main>

          {/* BANNER AD IN MIDDLE - MOVED HERE (before footer) */}
        {/* BANNER AD IN MIDDLE - with proper styling */}
<div className="w-full bg-gray-50 border-t border-gray-200">
  <div className="banner-ad-container">
    <div className="banner-ad-wrapper">
      <BannerAd position="middle" />
    </div>
  </div>
</div>

          <Footer />
        </div>

        {/* Social Bar Ad (Small bottom banner - 320x50) */}
        <SocialBarAd />

        {/* Toast Notifications */}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />

        {/* Google Tag Manager */}
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
      </body>
    </html>
  );
}
