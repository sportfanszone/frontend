import { NextResponse } from "next/server";

export async function POST() {
  try {
    const res = NextResponse.json({ status: "success" });
    const isProd = process.env.NODE_ENV === "production";

    // Common cookie attributes
    const cookieAttributes = {
      value: "",
      path: "/",
      expires: new Date(0),
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
    };

    // Manually craft Set-Cookie headers for both domains
    const cookieHeader1 = `userToken=${cookieAttributes.value}; Path=${
      cookieAttributes.path
    }; Expires=${cookieAttributes.expires.toUTCString()}; Domain=${
      isProd ? ".sportfanszone.com" : "localhost"
    }; ${cookieAttributes.secure ? "Secure; " : ""}SameSite=${
      cookieAttributes.sameSite
    }`;
    const cookieHeader2 = `userToken=${cookieAttributes.value}; Path=${
      cookieAttributes.path
    }; Expires=${cookieAttributes.expires.toUTCString()}; Domain=${
      isProd ? "api.sportfanszone.com" : "localhost"
    }; ${cookieAttributes.secure ? "Secure; " : ""}SameSite=${
      cookieAttributes.sameSite
    }`;

    // Append both Set-Cookie headers
    res.headers.append("Set-Cookie", cookieHeader1);
    res.headers.append("Set-Cookie", cookieHeader2);

    return res;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { status: "error", message: "Logout failed" },
      { status: 500 }
    );
  }
}
