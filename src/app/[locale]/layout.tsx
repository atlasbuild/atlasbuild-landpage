import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const metadata = messages.metadata as {
    title: string;
    description: string;
    keywords: string;
  };

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      type: "website",
      locale: locale,
      alternateLocale: routing.locales.filter((l) => l !== locale),
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.title,
      description: metadata.description,
    },
    alternates: {
      canonical: "./",
      languages: {
        pt: "/pt",
        en: "/en",
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isVercelDeployment = process.env.VERCEL === "1";

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as "pt" | "en")) {
    notFound();
  }

  const messages = await getMessages({ locale });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "AtlasBuild",
    description:
      locale === "pt"
        ? "Fábrica de software especializada em Blockchain, IA e sistemas de alta performance."
        : "Software factory specialized in Blockchain, AI, and high-performance systems.",
    url: `${process.env.NEXT_PUBLIC_APP_URL}/${locale}`,
    logo: `${process.env.NEXT_PUBLIC_APP_URL}/logo.png`,
    sameAs: [],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Sales",
      availableLanguage: ["Portuguese", "English"],
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "BR",
    },
    areaServed: "Worldwide",
    service: [
      {
        "@type": "Service",
        name: "Blockchain Development",
        description: "Smart contracts, NFTs, and Web3 platforms",
      },
      {
        "@type": "Service",
        name: "AI Integration",
        description: "Generative AI, RAG, and machine learning solutions",
      },
      {
        "@type": "Service",
        name: "Payment Systems",
        description: "Complete gateway integrations and fintech solutions",
      },
      {
        "@type": "Service",
        name: "Custom Integrations",
        description: "APIs, webhooks, and system automations",
      },
    ],
  };

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
            {isVercelDeployment && <Analytics />}
            {isVercelDeployment && <SpeedInsights />}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
