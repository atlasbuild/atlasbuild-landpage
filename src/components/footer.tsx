import Link from "next/link";
import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="glass border-border/60 border-t">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-3">
          <h3 className="text-xl font-bold">
            <span className="text-gradient-purple-cyan">AtlasBuild</span>
          </h3>
          <p className="text-muted-foreground text-sm">
            {t("about.description")}
          </p>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-semibold">{t("services.title")}</h4>
          <ul className="text-muted-foreground space-y-2 text-sm">
            <li>
              <Link
                href="#expertise"
                className="hover:text-foreground transition-colors"
              >
                {t("services.blockchain")}
              </Link>
            </li>
            <li>
              <Link
                href="#tech"
                className="hover:text-foreground transition-colors"
              >
                {t("services.ai")}
              </Link>
            </li>
            <li>
              <Link
                href="#expertise"
                className="hover:text-foreground transition-colors"
              >
                {t("services.payments")}
              </Link>
            </li>
            <li>
              <Link
                href="#expertise"
                className="hover:text-foreground transition-colors"
              >
                {t("services.integrations")}
              </Link>
            </li>
            <li>
              <Link
                href="#tech"
                className="hover:text-foreground transition-colors"
              >
                {t("services.automation")}
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-semibold">{t("company.title")}</h4>
          <ul className="text-muted-foreground space-y-2 text-sm">
            <li>
              <Link
                href="#expertise"
                className="hover:text-foreground transition-colors"
              >
                {t("company.about")}
              </Link>
            </li>
            <li>
              <Link
                href="#process"
                className="hover:text-foreground transition-colors"
              >
                {t("company.process")}
              </Link>
            </li>
            <li>
              <Link
                href="#contact"
                className="hover:text-foreground transition-colors"
              >
                {t("company.contact")}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-muted-foreground border-border/60 border-t py-6 text-center text-sm">
        {t("copyright")}
      </div>
    </footer>
  );
}
