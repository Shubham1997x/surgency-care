import type { Metadata } from "next";
import { GoogleTagManager } from "@next/third-parties/google";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Surgency Care — Verified Surgeons, Hospitals & Treatments",
    template: "%s | Surgency Care",
  },
  description:
    "Surgency Care connects patients with verified surgeons, NABH-accredited hospitals, and affordable, compassionate surgical treatments across Delhi-NCR and India.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MZC8ZVJG"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
      </body>
      <GoogleTagManager gtmId="GTM-MZC8ZVJG" />
    </html>
  );
}
