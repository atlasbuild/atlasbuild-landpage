import { getRequestConfig } from "next-intl/server";
import { routing } from "./i18n/routing";

export default getRequestConfig(
  async ({ requestLocale }: { requestLocale: Promise<string | undefined> }) => {
    let locale = await requestLocale;

    // Ensure that a valid locale is used
    if (!locale || !routing.locales.includes(locale as "pt" | "en")) {
      locale = routing.defaultLocale;
    }

    return {
      locale,
      messages: (await import(`@/dictionaries/${locale}.json`)).default,
    };
  },
);
