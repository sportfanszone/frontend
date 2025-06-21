type FetchAction = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export default async function fetcher<T>(
  url: string,
  action: FetchAction = "GET"
): Promise<T> {
  const res = await fetch(url, {
    method: action,
    headers: {
      "Content-Type": "application/json",
    },
    body: action !== "GET" ? JSON.stringify({}) : undefined,
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(`Failed to ${action} data from ${url}: ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}
