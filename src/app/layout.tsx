import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "Plants in Pot | Premium Indoor Plants",
  description: "Discover our hand-picked collection of premium, rare, and resilient indoor plants designed to transform your living space into a sanctuary.",
  keywords: ["indoor plants", "rare plants", "botanical collection", "plant shop", "monstera", "care guides"],
  openGraph: {
    title: "Plants in Pot | Curated Botanical Collection",
    description: "Bring Nature Indoors. Shop our hand-picked collection of premium, rare, and resilient indoor plants.",
    siteName: "Plants in Pot",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Plants in Pot | Premium Indoor Plants",
    description: "Bring Nature Indoors. Shop our hand-picked collection of premium, rare, and resilient indoor plants.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} antialiased font-display`}>
        {children}
      </body>
    </html>
  );
}
