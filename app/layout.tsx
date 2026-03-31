'use client';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { usePathname } from 'next/navigation';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin');

  return (
    <html lang="en">
      <head>
        <title>Best School in Moradabad | Children's Future Academy</title>
        <meta name="description" content="Children's Future Academy Moradabad offers quality education from Nursery to Class 8 with modern facilities." />
        <meta name="keywords" content="school, education, Moradabad, Children Future Academy, academics, admissions, co-educational" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        
        {/* Favicon */}
        <link rel="icon" href="/images/logo.png" type="image/png" />
        <link rel="shortcut icon" href="/images/logo.png" type="image/png" />
        
        {/* Open Graph Meta Tags for Google Search & Social Media */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Best School in Moradabad | Children's Future Academy" />
        <meta property="og:description" content="Children's Future Academy is a Co-educational school in Moradabad providing quality education from Pre-Primary to Class VIII since 2000." />
        <meta property="og:image" content="/images/logo.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://childrenfutureacademy.vercel.app" />
        <meta property="og:site_name" content="Children's Future Academy" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Best School in Moradabad | Children's Future Academy" />
        <meta name="twitter:description" content="Children's Future Academy is a Co-educational school in Moradabad providing quality education from Pre-Primary to Class VIII since 2000." />
        <meta name="twitter:image" content="/images/logo.png" />
      </head>
      <body className={inter.className}>
        {!isAdminPage && <Navbar />}
        <main className="min-h-screen">{children}</main>
        {!isAdminPage && <Footer />}
        {!isAdminPage && <WhatsAppButton />}
      </body>
    </html>
  );
}
