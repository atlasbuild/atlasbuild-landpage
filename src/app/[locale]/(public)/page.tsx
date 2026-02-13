"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import {
  ArrowRight,
  Blocks,
  CreditCard,
  Puzzle,
  Rocket,
  Brain,
  Workflow,
  Database,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { ContactForm } from "@/components/contact-form";

export default function HomePage() {
  const t = useTranslations();

  const expertiseCards = [
    { icon: Blocks, key: 0 },
    { icon: CreditCard, key: 1 },
    { icon: Puzzle, key: 2 },
    { icon: Rocket, key: 3 },
  ];

  const techCards = [
    { icon: Brain, key: 0 },
    { icon: Database, key: 1 },
    { icon: Workflow, key: 2 },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-24 sm:py-32 lg:py-40">
        {/* Gradient Orbs Background */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-1/2 left-1/4 h-96 w-96 rounded-full bg-purple-600/30 blur-[100px]" />
          <div className="absolute top-1/4 right-1/4 h-96 w-96 rounded-full bg-blue-500/20 blur-[100px]" />
          <div className="absolute bottom-0 left-1/2 h-96 w-96 rounded-full bg-cyan-400/20 blur-[100px]" />
        </div>

        <div className="mx-auto max-w-7xl">
          <ScrollReveal className="text-center">
            <Badge className="mb-6 border-white/20 bg-white/5 px-4 py-1.5 text-sm backdrop-blur-sm">
              {t("hero.badge")}
            </Badge>

            <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              {t("hero.headline")}
              <br />
              <span className="text-gradient-purple-cyan">
                {t("hero.headlineGradient")}
              </span>
            </h1>

            <p className="text-muted-foreground mx-auto mb-10 max-w-2xl text-lg sm:text-xl">
              {t("hero.subheadline")}
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="glow-purple text-base">
                <Link href="#contact">
                  {t("hero.ctaPrimary")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="glass border-white/20 text-base"
              >
                <Link href="#expertise">{t("hero.ctaSecondary")}</Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Expertise Section */}
      <section id="expertise" className="px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              {t("expertise.title")}
            </h2>
            <p className="text-muted-foreground text-lg">
              {t("expertise.subtitle")}
            </p>
          </ScrollReveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {expertiseCards.map(({ icon: Icon, key }, index) => (
              <ScrollReveal key={key} delay={index * 0.1}>
                <Card className="glass group hover:border-primary/50 h-full p-6 transition-all hover:scale-105">
                  <Icon className="text-primary mb-4 h-12 w-12 transition-transform group-hover:scale-110" />
                  <h3 className="mb-3 text-xl font-semibold">
                    {t(`expertise.cards.${key}.title`)}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {t(`expertise.cards.${key}.description`)}
                  </p>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <Separator className="mx-auto w-11/12 max-w-7xl opacity-20" />

      {/* Tech Differential Section */}
      <section id="tech" className="px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              {t("tech.title")}
            </h2>
            <p className="text-muted-foreground text-lg">
              {t("tech.subtitle")}
            </p>
          </ScrollReveal>

          <div className="grid gap-8 md:grid-cols-3">
            {techCards.map(({ icon: Icon, key }, index) => (
              <ScrollReveal key={key} delay={index * 0.15}>
                <Card className="glass-strong group h-full p-8 transition-all hover:scale-105">
                  <div className="bg-primary/10 mb-6 inline-flex rounded-lg p-3">
                    <Icon className="text-primary h-8 w-8 transition-transform group-hover:scale-110" />
                  </div>
                  <h3 className="mb-4 text-2xl font-semibold">
                    {t(`tech.cards.${key}.title`)}
                  </h3>
                  <p className="text-muted-foreground">
                    {t(`tech.cards.${key}.description`)}
                  </p>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <Separator className="mx-auto w-11/12 max-w-7xl opacity-20" />

      {/* Process Section */}
      <section id="process" className="px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-5xl">
          <ScrollReveal className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              {t("process.title")}
            </h2>
            <p className="text-muted-foreground text-lg">
              {t("process.subtitle")}
            </p>
          </ScrollReveal>

          <div className="space-y-8">
            {[0, 1, 2, 3].map((index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="glass relative flex flex-col gap-6 rounded-xl p-8 md:flex-row md:items-start">
                  {/* Step Number */}
                  <div className="flex-shrink-0">
                    <div className="bg-gradient-purple-cyan flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold text-white shadow-lg">
                      {t(`process.steps.${index}.number`)}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="mb-3 text-2xl font-semibold">
                      {t(`process.steps.${index}.title`)}
                    </h3>
                    <p className="text-muted-foreground">
                      {t(`process.steps.${index}.description`)}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-3xl">
          <ScrollReveal className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              {t("contact.title")}
            </h2>
            <p className="text-muted-foreground text-lg">
              {t("contact.subtitle")}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <Card className="glass-strong p-8">
              <ContactForm />
            </Card>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
