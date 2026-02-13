import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "validation.nameMin").max(100),
  email: z.string().email("validation.emailInvalid"),
  company: z.string().min(2, "validation.companyMin").max(100),
  phone: z
    .string()
    .min(10, "validation.phoneMin")
    .max(20, "validation.phoneMax")
    .optional()
    .or(z.literal("")),
  description: z
    .string()
    .min(10, "validation.descriptionMin")
    .max(1000, "validation.descriptionMax"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
