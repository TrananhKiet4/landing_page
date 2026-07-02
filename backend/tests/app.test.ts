import request from "supertest";
import { beforeEach, describe, expect, it, vi } from "vitest";

const newsletterService = vi.hoisted(() => ({
  subscribeNewsletter: vi.fn()
}));

const trackingService = vi.hoisted(() => ({
  createTrackingEvent: vi.fn()
}));

vi.mock("../src/services/newsletter.service.js", () => newsletterService);
vi.mock("../src/services/tracking.service.js", () => trackingService);

const { app } = await import("../src/app.js");

describe("SmartAir API", () => {
  beforeEach(() => {
    newsletterService.subscribeNewsletter.mockReset();
    trackingService.createTrackingEvent.mockReset();
  });

  it("returns health status", async () => {
    const response = await request(app).get("/api/health");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.status).toBe("ok");
  });

  it("validates newsletter payloads before hitting the controller", async () => {
    const response = await request(app).post("/api/newsletter").send({
      email: "invalid"
    });

    expect(response.status).toBe(400);
    expect(newsletterService.subscribeNewsletter).not.toHaveBeenCalled();
  });

  it("accepts a valid newsletter submission", async () => {
    newsletterService.subscribeNewsletter.mockResolvedValue({
      id: "sub_1",
      email: "hello@smartair.ai"
    });

    const response = await request(app).post("/api/newsletter").send({
      email: "hello@smartair.ai",
      source: "landing-page",
      tags: ["smartair-pro"]
    });

    expect(response.status).toBe(201);
    expect(newsletterService.subscribeNewsletter).toHaveBeenCalledTimes(1);
  });

  it("records a tracking event", async () => {
    trackingService.createTrackingEvent.mockResolvedValue({
      id: "evt_1",
      eventType: "cta_click"
    });

    const response = await request(app).post("/api/tracking").send({
      eventType: "cta_click",
      label: "hero_primary",
      location: "hero",
      path: "/",
      metadata: {
        viewport: "desktop"
      }
    });

    expect(response.status).toBe(201);
    expect(trackingService.createTrackingEvent).toHaveBeenCalledTimes(1);
  });
});
