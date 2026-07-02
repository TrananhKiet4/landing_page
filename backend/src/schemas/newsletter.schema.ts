import { z } from "zod";

const firstNameSchema = z.preprocess(
  (value) => {
    if (typeof value !== "string") {
      return value;
    }

    const trimmed = value.trim();
    return trimmed.length === 0 ? undefined : trimmed;
  },
  z.string().min(2).max(40).optional()
);

export const newsletterSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  firstName: firstNameSchema,
  source: z.string().trim().min(2).max(60).default("landing-page"),
  tags: z.array(z.string().trim().min(1).max(32)).max(6).default(["smartair-pro"])
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;
