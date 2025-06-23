"use server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";

export async function getUserFromCookie() {
  const cookieStore = await cookies();
  const token = cookieStore.get("userToken")?.value;

  if (!token) return null;

  try {
    const tokenPayload: any = jwt.verify(token, process.env.USER_TOKEN_SECRET!);
    return tokenPayload.user;
  } catch {
    return null;
  }
}
