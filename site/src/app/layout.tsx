import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BagProvider } from "@/components/bag/BagProvider";
import { BagDrawer } from "@/components/bag/BagDrawer";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://americanjewelers.com"),
  title: {
    default: "American Jewelry · Brentwood and Mt. Juliet, Tennessee",
    template: "%s · American Jewelry",
  },
  description:
    "American Jewelry designs, sets and finishes its own jewelry in Tennessee: one-of-one pieces, signature designs in natural diamond and solid gold, and man-made diamond pieces held to one published standard.",
  robots: process.env.NEXT_PUBLIC_SITE_LIVE === "true" ? undefined : { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        <BagProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <BagDrawer />
        </BagProvider>
      </body>
    </html>
  );
}
