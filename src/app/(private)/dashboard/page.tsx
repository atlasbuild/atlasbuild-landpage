import Link from "next/link";
import { requireAuth } from "@/helpers/require-auth";
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
  const session = await requireAuth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-24">
      <h1 className="text-4xl font-bold">Dashboard</h1>
      <p className="text-muted-foreground">
        Welcome, {session.user.name ?? session.user.email}!
      </p>
      <Button asChild variant="outline">
        <Link href="/logout">Sign Out</Link>
      </Button>
    </main>
  );
}
