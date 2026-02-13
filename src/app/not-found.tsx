import Link from "next/link";
import { getCurrentUser } from "@/helpers/get-current-user";
import { Button } from "@/components/ui/button";

export default async function NotFound() {
  const session = await getCurrentUser();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-24">
      <h1 className="text-6xl font-bold tracking-tight">404</h1>
      <p className="text-muted-foreground">
        The page you are looking for does not exist.
      </p>
      <Button asChild>
        <Link href={session ? "/dashboard" : "/"}>
          {session ? "Go to Dashboard" : "Go to Home"}
        </Link>
      </Button>
    </main>
  );
}
