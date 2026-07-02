import { z } from "zod";

const firstNameSchema = z.preprocess(
  (value) => {
    if (typeof value !== "string") {
      return value;
    }

    const trimmed = value.trim();
    return trimmed.length === 0 ? undefined : trimmed;
  },
  z.string().min(2, "Vui lòng nhập ít nhất 2 ký tự.").max(40).optional()
);

export const newsletterFormSchema = z.object({
  email: z.string().trim().email("Vui lòng nhập địa chỉ email hợp lệ."),
  firstName: firstNameSchema
});

export type NewsletterFormValues = z.infer<typeof newsletterFormSchema>;
