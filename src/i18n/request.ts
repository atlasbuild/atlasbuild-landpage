import { getRequestConfig } from "next-intl/server";

export const locales = ["pt", "en"] as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  // Validate that the incoming `locale` parameter is valid
  if (!locale || !locales.includes(locale as Locale)) {
    locale = "en"; // Default fallback
  }

  return {
    locale,
    messages: (await import(`../dictionaries/${locale}.json`)).default,
  };
});
