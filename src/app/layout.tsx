import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClientLayout } from "./client-layout";
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
  title: "PharmLush — Türkiye Nöbetçi Eczane API",
  description:
    "Türkiye genelindeki tüm eczane ve nöbetçi eczane verilerine tek bir API üzerinden erişin. %99.9 uptime, gerçek zamanlı veri, kolay entegrasyon.",
  keywords: [
    "nöbetçi eczane",
    "eczane api",
    "pharmacy api",
    "türkiye eczane",
    "sağlık api",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
