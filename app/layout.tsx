import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import Preloader from "@/components/ui/Preloader";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Agency 7 | Strategic Business Consultancy in the UAE",
  description:
    "The Agency 7 helps entrepreneurs and international companies understand the UAE market, develop projects, create market strategies and build strategic commercial connections.",
  keywords: [
    "UAE business consultancy",
    "strategic consulting UAE",
    "market entry UAE",
    "international business UAE",
    "Dubai consultancy",
    "Agency 7",
  ],
  openGraph: {
    title: "The Agency 7 | Strategic Business Consultancy in the UAE",
    description:
      "Turning opportunities into businesses, projects and lasting connections.",
    type: "website",
    locale: "en_US",
    siteName: "The Agency 7",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Agency 7 | Strategic Business Consultancy in the UAE",
    description:
      "Turning opportunities into businesses, projects and lasting connections.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable}`}
    >
      <body>
        <SmoothScroll>
          <Preloader />
          <CustomCursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
