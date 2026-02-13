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
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
