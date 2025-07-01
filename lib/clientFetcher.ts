type FetchAction = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export default async function clientFetcher<T>(
  url: string,
  action: FetchAction = "GET",
  data?: any
): Promise<T> {
  const res = await fetch(url, {
    method: action,
    headers: {
      "Content-Type": "application/json",
    },
    body: action !== "GET" && data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(`Failed to ${action} data from ${url}: ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}
