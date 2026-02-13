import { redirect } from "next/navigation";
import { getCurrentUser } from "./get-current-user";

export async function requireAuth() {
  const session = await getCurrentUser();
  if (!session) {
    redirect("/login");
  }
  return session;
}
