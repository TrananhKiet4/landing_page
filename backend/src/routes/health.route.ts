import { Router } from "express";
import { sendSuccess } from "../utils/response.js";

export const healthRouter = Router();

healthRouter.get("/", (_request, response) => {
  sendSuccess(response, 200, "SmartAir backend is healthy.", {
    status: "ok",
    timestamp: new Date().toISOString()
  });
});
