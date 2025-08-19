import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "@/app/globals.css";

const sora = Sora({
  variable: "--font-sora",
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
      <body className={`${sora.variable} antialiased font-sora`}>
        {children}
      </body>
    </html>
  );
}
