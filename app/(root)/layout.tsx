import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";
import { getUserFromCookie } from "@/lib/auth";
import { User } from "@/types";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUserFromCookie();
  return (
    <>
      <Header theme="transparent" user={user as User} />
      {children}
      <Footer />
    </>
  );
}
