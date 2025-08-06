// app/auth/otp/page.tsx
import { redirect } from "next/navigation";
import OtpVerification from "@/app/(auth)/components/OtpVerification";

export default async function Page({
  searchParams,
}: {
  searchParams: { session?: string; error?: string };
}) {
  await searchParams;
  const sessionId = searchParams.session;

  if (!sessionId) {
    redirect("/auth/signup?error=invalid-session");
  }

  // Validate session with backend
  try {
    console.log("`${process.env.DOMAIN_URL}/api/auth/validate_session`");
    console.log(`${process.env.DOMAIN_URL}/api/auth/validate_session`);
    const response = await fetch(
      `${process.env.DOMAIN_URL}/api/auth/validate_session`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ sessionId }),
      }
    );
    const data = await response.json();
    if (!response.ok || data.status !== "success") {
      redirect(
        `/auth/signup?error=${encodeURIComponent(
          data.message || "invalid-session"
        )}`
      );
    }
  } catch {
    redirect("/auth/signup?error=server-error");
  }

  return <OtpVerification sessionId={sessionId} error={searchParams.error} />;
}
