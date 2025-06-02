import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header theme="transparent" />
      {children}
      <Footer />
    </>
  );
}
