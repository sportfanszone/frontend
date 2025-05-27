import Header from "@/app/components/layout/Header";

export default function PagesLayout({
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
