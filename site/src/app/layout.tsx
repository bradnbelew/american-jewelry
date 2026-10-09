import type { Metadata } from "next";
import { EB_Garamond, Jost } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BagProvider } from "@/components/bag/BagProvider";
import { BagDrawer } from "@/components/bag/BagDrawer";
import { SavedProvider } from "@/components/saved/SavedProvider";
import { JsonLd, siteJsonLd } from "@/lib/seo";
import { SITE } from "@/lib/site";

const garamond = EB_Garamond({
  variable: "--font-garamond",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const live = process.env.NEXT_PUBLIC_SITE_LIVE === "true";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "American Jewelry · A house of fine jewelry in Tennessee",
    template: "%s · American Jewelry",
  },
  description:
    "American Jewelry designs, sets and finishes its own jewelry in Tennessee: one-of-one pieces, signature designs in solid gold and natural diamond, and man-made diamond pieces held to one published standard. Brentwood and Mt. Juliet.",
  robots: live ? { index: true, follow: true, "max-image-preview": "large" } : { index: false, follow: false },
  openGraph: {
    siteName: "American Jewelry",
    type: "website",
    locale: "en_US",
    images: [{ url: "/photos/hero-box.jpg", width: 2400, height: 1854, alt: "Gold signet rings and a chain in a navy velvet box" }],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${garamond.variable} ${jost.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        <a href="#main" className="skip">
          Skip to content
        </a>
        <JsonLd data={siteJsonLd()} />
        <BagProvider>
          <SavedProvider>
            <Header />
            <main id="main" className="flex-1">
              {children}
            </main>
            <Footer />
            <BagDrawer />
          </SavedProvider>
        </BagProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
