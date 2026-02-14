import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLocale, useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("notFound");
  const locale = useLocale();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-24">
      <h1 className="text-gradient-purple-cyan text-6xl font-bold tracking-tight">
        404
      </h1>
      <h2 className="text-2xl font-semibold">{t("title")}</h2>
      <p className="text-muted-foreground">{t("description")}</p>
      <Button
        asChild
        className="glow-purple bg-violet-700 text-white hover:bg-violet-600"
      >
        <Link href={`/${locale}`}>{t("backHome")}</Link>
      </Button>
    </main>
  );
}
