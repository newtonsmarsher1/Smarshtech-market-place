import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: '--font-montserrat',
  weight: ['400', '700', '900'],
});

export const metadata: Metadata = {
  title: "Clouds Mall | Africa's Online Shopping Mall | Kilimall Style Experience",
  description: "Shop for the best phones, electronics, fashion and more on Clouds Mall Kenya. Fast delivery and secure payments.",
  icons: {
    icon: '/icon.png',
  }
};

import AuthProvider from "@/components/AuthProvider";
import FloatingPreferenceBall from "@/components/FloatingPreferenceBall";
import ThemeHandler from "@/components/ThemeHandler";
import Minifooter from "@/components/Minifooter";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${montserrat.variable} font-inter antialiased transition-colors duration-300`}>
        <ThemeHandler />
        <AuthProvider>
          {children}
          <FloatingPreferenceBall />
          <Minifooter />
        </AuthProvider>
      </body>
    </html>
  );
}
