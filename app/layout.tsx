import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

import Header from "@/app/components/layout/Header";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sportfanszone",
  description: "This is a sports forum website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} antialiased font-montserrat`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
