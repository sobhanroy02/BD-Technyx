import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BD TECHNYX | Engineering Digital Dominance",
  description:
    "BD TECHNYX is a futuristic digital innovation powerhouse focused on marketing intelligence, design systems, and product engineering.",
  applicationName: "BD TECHNYX",
  manifest: "/manifest.webmanifest",
  themeColor: "#0b1224",
  colorScheme: "dark",
  icons: {
    icon: [
      { url: "/file.svg", type: "image/svg+xml", sizes: "512x512" },
      { url: "/globe.svg", type: "image/svg+xml", sizes: "192x192" },
    ],
    apple: [{ url: "/file.svg", sizes: "180x180", type: "image/svg+xml" }],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "BD TECHNYX",
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`} 
      >
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
