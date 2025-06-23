import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("userToken")?.value;
  const isAuthPage = pathname.startsWith("/auth");
  const isProtectedPath = ["/user", "/post"].some((path) =>
    pathname.startsWith(path)
  );

  console.log("Middleware triggered for path:", pathname);

  if (!token && isProtectedPath) {
    const loginUrl = new URL("/auth/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (token && isAuthPage) {
    const homeUrl = new URL("/", request.url);
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
