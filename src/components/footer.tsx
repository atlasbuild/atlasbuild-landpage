import Link from "next/link";
import { Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-border/40 border-t">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-3">
          <h3 className="text-lg font-bold">Boilerplate</h3>
          <p className="text-muted-foreground text-sm">
            A production-ready Next.js starter for modern web applications.
          </p>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-semibold">Resources</h4>
          <ul className="text-muted-foreground space-y-2 text-sm">
            <li>
              <Link
                href="#features"
                className="hover:text-foreground transition-colors"
              >
                Features
              </Link>
            </li>
            <li>
              <Link
                href="https://nextjs.org/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                Documentation
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-semibold">Stack</h4>
          <ul className="text-muted-foreground space-y-2 text-sm">
            <li>Next.js 16</li>
            <li>Better Auth</li>
            <li>shadcn/ui</li>
            <li>Tailwind CSS v4</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-semibold">Connect</h4>
          <div className="flex items-center gap-3">
            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github className="size-5" />
            </Link>
          </div>
        </div>
      </div>

      <div className="border-border/40 text-muted-foreground border-t py-6 text-center text-sm">
        Built with Next.js, Better Auth, and shadcn/ui.
      </div>
    </footer>
  );
}
