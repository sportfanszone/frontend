import { NextResponse } from "next/server";

export async function POST() {
  try {
    const res = NextResponse.json({ status: "success" });
    const isProd = process.env.NODE_ENV === "production";

    const cookieOptions = {
      name: "userToken",
      value: "",
      secure: isProd,
      sameSite: isProd ? ("none" as const) : ("lax" as const),
      path: "/",
      expires: new Date(0),
    };

    res.cookies.set({
      ...cookieOptions,
      domain: isProd ? ".sportfanszone.com" : "localhost",
    });

    res.cookies.set({
      ...cookieOptions,
      domain: isProd ? "api.sportfanszone.com" : "localhost",
    });

    return res;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { status: "error", message: "Logout failed" },
      { status: 500 }
    );
  }
}
