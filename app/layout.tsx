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
        <title>Children's Future Academy - Quality Education Since 2000</title>
        <meta name="description" content="Children's Future Academy is a Co-educational school in Moradabad providing quality education from Pre-Primary to Class VIII since 2000." />
        <meta name="keywords" content="school, education, Moradabad, Children Future Academy, academics, admissions, co-educational" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
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
