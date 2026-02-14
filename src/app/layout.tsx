import type { Metadata } from "next";
import { headers } from "next/headers";
import { routing } from "@/i18n/routing";

function getFallbackBaseUrl() {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:3000";
}

async function getMetadataBaseUrl() {
  const headersList = await headers();
  const host = headersList.get("x-forwarded-host") ?? headersList.get("host");
  const forwardedProto = headersList.get("x-forwarded-proto");

  if (host) {
    const protocol =
      forwardedProto ?? (host.includes("localhost") ? "http" : "https");
    return new URL(`${protocol}://${host}`);
  }

  return new URL(getFallbackBaseUrl());
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: await getMetadataBaseUrl(),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
