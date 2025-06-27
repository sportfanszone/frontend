import { cookies } from "next/headers";

type FetchAction = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export default async function fetcher<T>(
  url: string,
  action: FetchAction = "GET",
  data?: any
): Promise<T> {
  const myCookies = await cookies();
  const cookieHeader = myCookies.toString();
  const res = await fetch(url, {
    method: action,
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader,
    },
    body: action !== "GET" && data ? JSON.stringify(data) : undefined,
  });

  if (!res.ok) {
    throw new Error(`Failed to ${action} data from ${url}: ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}
