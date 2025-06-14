import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import OtpVerification from "@/app/(auth)/components/OtpVerification";

export default async function Page() {
  const cookieStore = await cookies();
  const allowOtp = cookieStore.get("allowOtp");

  if (!allowOtp || allowOtp.value !== "true") {
    redirect("/auth/signup");
  }

  return <OtpVerification />;
}
