import Link from "next/link";
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export function Navbar() {
  return (
    <header className="border-border/40 bg-background/80 sticky top-0 z-50 w-full border-b backdrop-blur-lg">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="text-lg font-bold tracking-tight">
          Boilerplate
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <Link
            href="#features"
            className="text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            Features
          </Link>
          <Link
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            <span className="flex items-center gap-1.5">
              <Github className="size-4" />
              GitHub
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild variant="ghost" size="sm">
            <Link href="/login">Log In</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
}
