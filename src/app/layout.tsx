import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { BRAND_CONFIG } from "@/config/brand";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#070b12",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: `${BRAND_CONFIG.name} — ${BRAND_CONFIG.tagline} | Kashmir Phone Buyback & Recycling`,
    template: `%s | ${BRAND_CONFIG.name}`,
  },
  description:
    "Sell dead, damaged, cracked, or non-working smartphones in Kashmir with transparent condition-based valuations, doorstep collection in Srinagar, and responsible e-waste recycling.",
  keywords: [
    "dead phone recycling",
    "sell broken phone",
    "smartphone scrap Kashmir",
    "sell dead iPhone Srinagar",
    "phone buyback Srinagar",
    "broken display phone value",
    "e-waste recycling Jammu Kashmir",
    "Reboot Scrap",
  ],
  authors: [{ name: "Reboot Scrap Technologies" }],
  openGraph: {
    title: `${BRAND_CONFIG.name} — ${BRAND_CONFIG.tagline}`,
    description:
      "Turn your dead, water-damaged, or cracked smartphone into real value with transparent condition-based pricing and doorstep collection.",
    url: "https://rebootscrap.com",
    siteName: BRAND_CONFIG.name,
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND_CONFIG.name} — ${BRAND_CONFIG.tagline}`,
    description: "Dead Phone. Real Value. Responsible smartphone buyback in Kashmir.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#070b12] text-slate-100">
        {children}
      </body>
    </html>
  );
}
