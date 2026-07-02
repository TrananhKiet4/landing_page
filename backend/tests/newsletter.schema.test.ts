import { describe, expect, it } from "vitest";
import { newsletterSchema } from "../src/schemas/newsletter.schema.js";

describe("newsletterSchema", () => {
  it("normalizes email and defaults tags", () => {
    const result = newsletterSchema.parse({
      email: " Hello@SmartAir.ai ",
      source: "landing-page"
    });

    expect(result.email).toBe("hello@smartair.ai");
    expect(result.tags).toEqual(["smartair-pro"]);
  });

  it("rejects malformed email", () => {
    expect(() =>
      newsletterSchema.parse({
        email: "not-an-email",
        source: "landing-page"
      })
    ).toThrow();
  });
});
