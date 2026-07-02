import { Router } from "express";
import { createTrackingEventController } from "../controllers/tracking.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { trackingSchema } from "../schemas/tracking.schema.js";

export const trackingRouter = Router();

trackingRouter.post("/", validate(trackingSchema), createTrackingEventController);
