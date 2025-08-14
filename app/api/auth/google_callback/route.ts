import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const isProd = process.env.NODE_ENV === "production";

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.redirect(`${process.env.FRONTEND_URL}/auth/login`);
    }

    const response = NextResponse.redirect(
      `${process.env.FRONTEND_URL}/user/dashboard`
    );

    cookieStore.set({
      name: "userToken",
      value: token!,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      path: "/",
      maxAge: 2 * 60 * 60,
      ...(isProd && { domain: ".sportfanszone.com" }),
    });

    return response;
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { status: "error", message: "Invalid request" },
      { status: 400 }
    );
  }
}
