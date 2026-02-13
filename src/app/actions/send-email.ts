"use server";

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { Resend } from "resend";
import { headers } from "next/headers";
import {
  contactFormSchema,
  type ContactFormData,
} from "@/lib/validations/contact";
import { ContactNotificationEmail } from "@/components/emails/contact-notification";
import { track } from "@vercel/analytics/server";

const resend = new Resend(process.env.RESEND_API_KEY);

// Initialize Upstash Rate Limiter
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, "1 h"), // 3 requests per hour
  analytics: true,
  prefix: "contact_form",
});

export async function sendContactEmail(data: ContactFormData) {
  try {
    // Validate data on server
    const validated = contactFormSchema.parse(data);

    // Get IP address for rate limiting
    const headersList = await headers();
    const forwarded = headersList.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0] : "127.0.0.1";

    // Check rate limit
    const { success, remaining, reset } = await ratelimit.limit(ip);

    if (!success) {
      return {
        success: false,
        error: `Rate limit exceeded. Please try again in ${Math.ceil((reset - Date.now()) / 1000 / 60)} minutes.`,
      };
    }

    // Get recipient emails from environment variable
    const recipientEmails =
      process.env.RESEND_TO_EMAILS?.split(",").map((email) => email.trim()) ||
      [];

    if (recipientEmails.length === 0) {
      console.error("No recipient emails configured");
      return {
        success: false,
        error: "Email configuration error. Please contact support.",
      };
    }

    // Send email using Resend
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "contato@atlasbuild.com",
      to: recipientEmails,
      subject: `Novo Contato: ${validated.name} - ${validated.company}`,
      react: ContactNotificationEmail({
        name: validated.name,
        email: validated.email,
        company: validated.company,
        phone: validated.phone,
        description: validated.description,
      }),
    });

    if (error) {
      console.error("Resend error:", error);
      return {
        success: false,
        error: "Failed to send email. Please try again later.",
      };
    }

    // Track conversion event
    await track("contact_form_submitted", {
      company: validated.company,
    });

    return {
      success: true,
      remaining,
    };
  } catch (error) {
    console.error("Contact form error:", error);

    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: false,
      error: "An unexpected error occurred.",
    };
  }
}
