import { cache } from "react";
import fetcher from "@/lib/fetcher";
import { User } from "@/types";

export default cache(async (userId: string): Promise<{ user: User }> => {
  return fetcher<{ user: User }>(
    `${process.env.DOMAIN_URL}/api/get_user/${userId || ""}`
  );
});
