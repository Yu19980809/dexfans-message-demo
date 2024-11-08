import type { Metadata } from "next";
import localFont from "next/font/local";

import Providers from "@/components/providers";

import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "DexFans",
  description: "Social media and online fans community.",
  icons: { icon: './logo.png' }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} relative antialiased`}>
        <Providers>
          {children}
        </Providers>

        <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-b from-[#000] to-light-purple/30 -z-10" />
      </body>
    </html>
  );
}
