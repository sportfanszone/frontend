import Header from "@/app/components/layout/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header theme="transparent" />
      {children}
    </>
  );
}
