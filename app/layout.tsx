import type { Metadata } from "next";
import { Marcellus, DM_Sans } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Shannon Muruli | Courage Coach to Women Who Sell",
  description: "Untether from your comfort zone. Serve more. Sell more. Join the Untethered Weekly for sales courage.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${marcellus.variable} ${dmSans.variable}`}>
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