import { describe, expect, it } from "vitest";
import { trackingSchema } from "../src/schemas/tracking.schema.js";

describe("trackingSchema", () => {
  it("accepts scroll milestone metadata", () => {
    const result = trackingSchema.parse({
      eventType: "scroll_milestone",
      path: "/",
      metadata: {
        milestone: 75,
        viewport: "mobile"
      }
    });

    expect(result.metadata).toEqual({
      milestone: 75,
      viewport: "mobile"
    });
  });

  it("rejects unsupported event types", () => {
    expect(() =>
      trackingSchema.parse({
        eventType: "hover",
        path: "/"
      })
    ).toThrow();
  });
});
