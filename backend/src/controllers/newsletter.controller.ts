import type { RequestHandler } from "express";
import { subscribeNewsletter } from "../services/newsletter.service.js";
import { sendSuccess } from "../utils/response.js";

export const createNewsletterSubscriber: RequestHandler = async (request, response, next) => {
  try {
    const subscriber = await subscribeNewsletter(request.body);

    sendSuccess(response, 201, "Newsletter subscription saved.", {
      subscriber
    });
  } catch (error) {
    next(error);
  }
};
