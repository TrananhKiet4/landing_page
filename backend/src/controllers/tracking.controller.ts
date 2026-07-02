import type { RequestHandler } from "express";
import { createTrackingEvent } from "../services/tracking.service.js";
import { sendSuccess } from "../utils/response.js";

export const createTrackingEventController: RequestHandler = async (request, response, next) => {
  try {
    const event = await createTrackingEvent(request.body);

    sendSuccess(response, 201, "Tracking event recorded.", {
      event
    });
  } catch (error) {
    next(error);
  }
};
