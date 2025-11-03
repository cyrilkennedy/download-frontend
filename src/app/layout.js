// app/layout.js
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import InterstitialAd from '@/components/InterstitialAd';
import Script from 'next/script';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NativeAd from '@/components/NativeAd';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Downlyvieo - Download Videos Without Watermarks',
  description: 'Fast, free, and easy. Download from TikTok, Instagram, Facebook, and Twitter in HD quality.',
  icons: { icon: "/favicon.png" },
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

          {/* HEADER AD - Shows on ALL pages */}
          <div className="w-full bg-gray-50 border-y border-gray-200">
            <div className="container mx-auto px-4">
              <NativeAd position="header" />
            </div>
          </div>

          {/* MAIN CONTENT - Pages control their own content */}
          <main className="flex-1 w-full">
            {children}
          </main>

          {/* FOOTER AD - Shows on ALL pages */}
          <div className="w-full bg-gray-50 border-t border-gray-200">
            <div className="container mx-auto px-4">
              <NativeAd position="footer" />
            </div>
          </div>

          <InterstitialAd />
          <Footer />
        </div>

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

        {/* Interstitial Ad Script */}
        <Script
          src="//pl27954555.effectivegatecpm.com/21/81/05/218105b20068189f3aecadb4a665ae0b.js"
          strategy="afterInteractive"
          async
        />

        {/* Native Ad Script */}
        <Script
          src="//pl27954563.effectivegatecpm.com/0e1640332d1c1c66fd5db9d9651057fa/invoke.js"
          strategy="afterInteractive"
          data-cfasync="false"
          async
        />
      </body>
    </html>
  );
}