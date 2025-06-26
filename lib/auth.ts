export const dynamic = "force-dynamic";
import fetcher from "@/lib/fetcher";
import { User } from "@/types";

type GetUser = { status: string; user: User | null };

export async function getUserFromCookie() {
  try {
    const data: GetUser = await fetcher(
      `${process.env.DOMAIN_URL}/api/user/get_user`,
      "GET"
    );
    const user = data?.user;

    console.log(user);
    return user;
  } catch {
    return null;
  }
}
