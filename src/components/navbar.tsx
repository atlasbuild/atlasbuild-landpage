"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSelector } from "@/components/language-selector";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useHasMounted } from "@/hooks/use-has-mounted";

export function Navbar() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);
  const mounted = useHasMounted();

  const navItems = [
    { href: "#expertise", label: t("features") },
    { href: "#process", label: t("process") },
    { href: "#contact", label: t("contact") },
  ];

  return (
    <header className="glass border-border/60 sticky top-0 z-50 w-full border-b">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="text-xl font-bold tracking-tight">
          <span className="text-gradient-purple-cyan">AtlasBuild</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-2 md:flex">
          <LanguageSelector />
          <ThemeToggle />
        </div>

        {/* Mobile Menu */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          {mounted ? (
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  aria-label="Open navigation menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="glass-strong w-[280px]">
                <SheetHeader>
                  <SheetTitle className="text-gradient-purple-cyan">
                    AtlasBuild
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-6 flex flex-col gap-4 px-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                  <div className="border-border/60 border-t pt-4">
                    <LanguageSelector />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              aria-label="Open navigation menu"
              disabled
              aria-hidden
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
}
