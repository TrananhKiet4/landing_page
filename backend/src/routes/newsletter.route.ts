import { Router } from "express";
import { createNewsletterSubscriber } from "../controllers/newsletter.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { newsletterSchema } from "../schemas/newsletter.schema.js";

export const newsletterRouter = Router();

newsletterRouter.post("/", validate(newsletterSchema), createNewsletterSubscriber);
