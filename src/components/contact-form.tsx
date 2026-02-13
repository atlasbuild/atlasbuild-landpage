"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  contactFormSchema,
  type ContactFormData,
} from "@/lib/validations/contact";
import { sendContactEmail } from "@/app/actions/send-email";

export function ContactForm() {
  const t = useTranslations("contact");
  const tValidation = useTranslations("contact.validation");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      const result = await sendContactEmail(data);

      if (result.success) {
        toast.success(t("form.success"));
        reset();
      } else {
        toast.error(result.error || t("form.error"));
      }
    } catch {
      toast.error(t("form.error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-foreground">
            {t("form.name")}
          </Label>
          <Input
            id="name"
            placeholder={t("form.namePlaceholder")}
            {...register("name")}
            className="glass focus:border-primary focus:ring-primary border-white/20"
          />
          {errors.name && (
            <p className="text-destructive text-sm">
              {tValidation(errors.name.message || "")}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-foreground">
            {t("form.email")}
          </Label>
          <Input
            id="email"
            type="email"
            placeholder={t("form.emailPlaceholder")}
            {...register("email")}
            className="glass focus:border-primary focus:ring-primary border-white/20"
          />
          {errors.email && (
            <p className="text-destructive text-sm">
              {tValidation(errors.email.message || "")}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="company" className="text-foreground">
            {t("form.company")}
          </Label>
          <Input
            id="company"
            placeholder={t("form.companyPlaceholder")}
            {...register("company")}
            className="glass focus:border-primary focus:ring-primary border-white/20"
          />
          {errors.company && (
            <p className="text-destructive text-sm">
              {tValidation(errors.company.message || "")}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-foreground">
            {t("form.phone")}
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder={t("form.phonePlaceholder")}
            {...register("phone")}
            className="glass focus:border-primary focus:ring-primary border-white/20"
          />
          {errors.phone && (
            <p className="text-destructive text-sm">
              {tValidation(errors.phone.message || "")}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-foreground">
          {t("form.description")}
        </Label>
        <textarea
          id="description"
          rows={5}
          placeholder={t("form.descriptionPlaceholder")}
          {...register("description")}
          className="glass bg-card/50 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary flex min-h-[120px] w-full rounded-md border border-white/20 px-3 py-2 text-sm focus:ring-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        />
        {errors.description && (
          <p className="text-destructive text-sm">
            {tValidation(errors.description.message || "")}
          </p>
        )}
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="glow-purple w-full md:w-auto"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {t("form.submitting")}
          </>
        ) : (
          t("form.submit")
        )}
      </Button>
    </form>
  );
}
