import type { InputJsonValue } from "@prisma/client/runtime/library";
import { prisma } from "../prisma/client.js";
import type { TrackingInput } from "../schemas/tracking.schema.js";

export async function createTrackingEvent(input: TrackingInput) {
  return prisma.trackingEvent.create({
    data: {
      eventType: input.eventType,
      label: input.label,
      location: input.location,
      path: input.path,
      metadata: (input.metadata ?? undefined) as InputJsonValue | undefined
    }
  });
}
