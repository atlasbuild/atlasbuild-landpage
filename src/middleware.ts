import createMiddleware from "next-intl/middleware";
import { locales } from "./i18n/request";

// Simple i18n middleware - no authentication needed for landing page
export default createMiddleware({
  locales,
  defaultLocale: "en",
  localeDetection: true,
  localePrefix: "always",
});

export const config = {
  matcher: ["/((?!_next|_vercel|.*\\..*).*)", "/(pt|en)/:path*"],
};
