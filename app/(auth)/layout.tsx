import Header from "@/app/components/layout/Header";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header theme="dark" />
      {children}
    </>
  );
}
