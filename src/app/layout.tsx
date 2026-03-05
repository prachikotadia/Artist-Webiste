import type { Metadata } from "next";
import { Inter, Playfair_Display, Caveat, IBM_Plex_Serif, Shadows_Into_Light_Two } from "next/font/google";
import "./globals.css";
import { SplashProvider } from "@/components/layout/splash-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

const ibmPlexSerif = IBM_Plex_Serif({
  variable: "--font-ibm-plex-serif",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

const shadowsIntoLight = Shadows_Into_Light_Two({
  variable: "--font-shadows-into-light",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ARVISHWA | Vishwa Dadhaniya",
  description: "Curate Timeless Art. Original paintings by Vishwa Dadhaniya.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} ${caveat.variable} ${ibmPlexSerif.variable} ${shadowsIntoLight.variable} font-sans bg-cream text-ink antialiased`}
      >
        <SplashProvider />
        {children}
      </body>
    </html>
  );
}
