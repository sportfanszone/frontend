// app/api/logout/route.ts
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const res = NextResponse.json({ status: "success" });
    const isProd = process.env.NODE_ENV === "production";

    res.cookies.set({
      name: "userToken",
      value: "",
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      path: "/",
      maxAge: 2 * 60 * 60,
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
