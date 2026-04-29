import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NeoCasa Boys Hostel — Premium Co-Living for Students",
  description:
    "Experience premium co-living at NeoCasa Boys Hostel. Comfortable rooms, world-class amenities, strong community, and 24/7 security — designed for ambitious students.",
  keywords: "boys hostel, student accommodation, premium hostel, co-living, student housing",
  openGraph: {
    title: "NeoCasa Boys Hostel — Premium Co-Living",
    description: "More than a hostel. A lifestyle.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  );
}
