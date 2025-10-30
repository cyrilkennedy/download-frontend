import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  
 


  title: 'Downlyvieo - Download Videos Without Watermarks',
  description: 'Fast, free, and easy. Download from TikTok, Instagram, Facebook, and Twitter in HD quality.',

   icons: {
    icon: "/favicon.png",
  },
};
<head>
  <link rel="icon" type="image/png" href="/favicon.png" sizes="32x32" />
</head>




export default function RootLayout({ children }) {
  return (
    <html lang="en">
     <head>
<meta name="monetag" content="7d794aa7ba57d4b93636821533951f14"></meta>

     </head>
      <body className={inter.className}>
        <Navbar />
        <main className="main-content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}