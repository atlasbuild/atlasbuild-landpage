import Link from "next/link";
import {
  ArrowRight,
  Blocks,
  FileCode,
  GitBranch,
  Github,
  Palette,
  Shield,
  TestTube,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    icon: Shield,
    title: "Authentication Ready",
    description:
      "Email and password auth powered by Better Auth with PostgreSQL session storage.",
  },
  {
    icon: Palette,
    title: "Component Library",
    description:
      "Pre-configured shadcn/ui components built on Radix UI primitives with Tailwind CSS v4.",
  },
  {
    icon: Blocks,
    title: "App Router",
    description:
      "Next.js 16 App Router with server and client components, route groups, and middleware.",
  },
  {
    icon: TestTube,
    title: "Testing Suite",
    description:
      "Unit tests with Vitest and Testing Library, plus end-to-end tests with Playwright.",
  },
  {
    icon: GitBranch,
    title: "Code Quality",
    description:
      "ESLint, Prettier, Husky pre-commit hooks, and Commitlint for consistent contributions.",
  },
  {
    icon: FileCode,
    title: "TypeScript",
    description:
      "Full TypeScript coverage across the application with strict type checking enabled.",
  },
];

export default function HomePage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center overflow-hidden px-6 py-24 text-center">
        {/* Gradient orbs */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute -top-40 right-1/4 h-[500px] w-[500px] rounded-full bg-[oklch(0.488_0.243_292/0.15)] blur-[120px] dark:bg-[oklch(0.627_0.265_303.9/0.2)]" />
          <div className="absolute -bottom-20 left-1/4 h-[400px] w-[400px] rounded-full bg-[oklch(0.627_0.265_303.9/0.1)] blur-[100px] dark:bg-[oklch(0.488_0.243_292/0.15)]" />
          <div className="absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[oklch(0.488_0.15_264/0.08)] blur-[80px] dark:bg-[oklch(0.488_0.15_264/0.12)]" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 flex max-w-3xl flex-col items-center gap-8">
          <div className="border-border/60 bg-muted/50 text-muted-foreground inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm backdrop-blur-sm">
            <span className="bg-primary inline-block h-2 w-2 rounded-full" />
            Production-ready Next.js Starter
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Ship faster with a{" "}
            <span className="from-primary bg-gradient-to-r to-[oklch(0.627_0.265_303.9)] bg-clip-text text-transparent dark:from-[oklch(0.627_0.265_303.9)] dark:to-[oklch(0.75_0.18_310)]">
              modern stack
            </span>
          </h1>

          <p className="text-muted-foreground max-w-2xl text-lg sm:text-xl">
            Authentication, components, testing, and developer tooling — all
            pre-configured. Clone, customize, and launch your next project in
            minutes.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Button asChild size="lg" className="gap-2">
              <Link href="/signup">
                Get Started
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="size-4" />
                View on GitHub
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 flex flex-col items-center gap-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              What&apos;s Included
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Everything you need to build a production-grade application, from
              authentication to deployment tooling.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="group border-border/50 bg-card/50 hover:border-primary/30 hover:bg-card/80 overflow-hidden backdrop-blur-sm transition-colors"
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="bg-primary/10 flex size-10 items-center justify-center rounded-lg">
                      <feature.icon className="text-primary size-5" />
                    </div>
                    {feature.title}
                  </CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
