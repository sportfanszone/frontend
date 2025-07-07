import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.USER_TOKEN_SECRET);

async function getUserFromToken(token: string) {
  try {
    const { payload }: any = await jwtVerify(token, secret);
    return payload.user;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("userToken")?.value;

  const isAuthPage = pathname.startsWith("/auth");
  const isProtectedPath = ["/user", "/post"].some((path) =>
    pathname.startsWith(path)
  );
  const isAdminPath = pathname.startsWith("/admin");

  console.log("Middleware triggered for path:", pathname);

  if (!token && isProtectedPath) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (!token && isAdminPath) {
    return NextResponse.redirect(new URL("/404", request.url));
  }

  if (token) {
    const user = await getUserFromToken(token);

    if (!user) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    if (isAdminPath && user.role !== "admin") {
      return NextResponse.redirect(new URL("/403", request.url));
    }

    if (isAuthPage) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
