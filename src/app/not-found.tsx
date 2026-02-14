import Link from "next/link";
import { routing } from "@/i18n/routing";
import { Button } from "@/components/ui/button";

export default function RootNotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-24">
      <h1 className="text-gradient-purple-cyan text-6xl font-bold tracking-tight">
        404
      </h1>
      <h2 className="text-2xl font-semibold">Page Not Found</h2>
      <p className="text-muted-foreground">
        The page you are looking for does not exist or has been moved.
      </p>
      <Button
        asChild
        className="glow-purple bg-violet-700 text-white hover:bg-violet-600"
      >
        <Link href={`/${routing.defaultLocale}`}>Back to Home</Link>
      </Button>
    </main>
  );
}
