import type { Metadata, Viewport } from "next";
import { Marcellus, DM_Sans, Playfair_Display, Caveat } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";
import SiteFooter from "./components/SiteFooter";

const marcellus = Marcellus({ 
  weight: "400",
  subsets: ["latin"],
  variable: "--font-marcellus",
  display: 'swap',
});

const dmSans = DM_Sans({ 
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: 'swap',
});

// Elegant editorial serif used only for the homepage hero headline
const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: 'swap',
});

// Handwritten script used for the homepage hero accent line
const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#a08216',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://shannonmuruli.com'),
  title: 'Shannon Muruli | Courage Coach to Women Who Sell',
  description: 'Untether from your comfort zone. Serve more. Sell more. Join the Untethered Weekly for sales courage.',
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    siteName: 'Shannon Muruli',
    title: 'Shannon Muruli | Courage Coach to Women Who Sell',
    description: 'Untether from your comfort zone. Serve more. Sell more.',
    url: 'https://shannonmuruli.com',
    images: [
      {
        url: '/assets/images/og/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'Shannon Muruli | Courage Coach to Women Who Sell',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shannon Muruli | Courage Coach to Women Who Sell',
    description: 'Untether from your comfort zone. Serve more. Sell more.',
    images: ['/assets/images/og/og-default.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${marcellus.variable} ${dmSans.variable} ${playfair.variable} ${caveat.variable}`}>
      <body className="font-sans antialiased text-[#161317]">
        {/* Skip link — invisible to mouse users; appears only on first keyboard Tab press */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-[#a08216] focus:text-white focus:px-4 focus:py-2 focus:rounded focus:text-sm focus:font-bold"
        >
          Skip to main content
        </a>

        <Navigation />

        <main id="main-content" className="min-h-screen">
          {children}
        </main>

        <SiteFooter />
      </body>
    </html>
  );
}