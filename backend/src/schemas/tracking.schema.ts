import { z } from "zod";

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

const jsonValue: z.ZodType<JsonValue> = z.lazy(() =>
  z.union([z.string(), z.number(), z.boolean(), z.null(), z.array(jsonValue), z.record(jsonValue)])
);

export const trackingSchema = z.object({
  eventType: z.enum(["cta_click", "scroll_milestone"]),
  label: z.string().trim().min(1).max(80).optional(),
  location: z.string().trim().min(1).max(80).optional(),
  path: z.string().trim().min(1).max(255),
  metadata: z.record(jsonValue).optional()
});

export type TrackingInput = z.infer<typeof trackingSchema>;
