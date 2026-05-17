import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  title: {
    default: 'NexCore IT Solutions — Engineering Digital Futures',
    template: '%s — NexCore IT Solutions',
  },
  description:
    'NexCore delivers enterprise-grade software development, cloud infrastructure, cybersecurity, and AI solutions that power the next generation of businesses.',
  openGraph: {
    title: 'NexCore IT Solutions — Engineering Digital Futures',
    description: 'NexCore delivers enterprise-grade software development, cloud infrastructure, cybersecurity, and AI solutions that power the next generation of businesses.',
    url: 'https://nexcore.io',
    siteName: 'NexCore IT Solutions',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NexCore IT Solutions — Engineering Digital Futures',
    description: 'NexCore delivers enterprise-grade software development, cloud infrastructure, cybersecurity, and AI solutions that power the next generation of businesses.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Manrope:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
