import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header theme="dark" />
      {children}
      <Footer />
    </>
  );
}
