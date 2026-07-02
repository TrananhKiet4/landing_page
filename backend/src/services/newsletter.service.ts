import { prisma } from "../prisma/client.js";
import type { NewsletterInput } from "../schemas/newsletter.schema.js";

export async function subscribeNewsletter(input: NewsletterInput) {
  const tags = Array.from(new Set(input.tags));

  return prisma.newsletterSubscriber.upsert({
    where: {
      email: input.email
    },
    update: {
      firstName: input.firstName ?? null,
      source: input.source,
      tags
    },
    create: {
      email: input.email,
      firstName: input.firstName ?? null,
      source: input.source,
      tags
    }
  });
}
