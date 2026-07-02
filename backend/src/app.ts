import cors from "cors";
import express from "express";
import helmet from "helmet";
import { corsOptions } from "./config/cors.js";
import { errorMiddleware, notFoundHandler } from "./middlewares/error.middleware.js";
import { apiRateLimit } from "./middlewares/rateLimit.middleware.js";
import { healthRouter } from "./routes/health.route.js";
import { newsletterRouter } from "./routes/newsletter.route.js";
import { trackingRouter } from "./routes/tracking.route.js";
import chatRoutes from "./routes/chat.routes.js";

export const app = express();

app.set("trust proxy", 1);

app.use(
  helmet({
    crossOriginResourcePolicy: false
  })
);

app.use((request, response, next) => {
  const origin = request.headers.origin;

  if (origin) {
    response.setHeader("Access-Control-Allow-Origin", origin);
    response.setHeader("Vary", "Origin");
  }

  response.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  response.setHeader("Access-Control-Max-Age", "86400");

  if (request.method === "OPTIONS") {
    response.status(204).end();
    return;
  }

  next();
});

app.use(apiRateLimit);
app.use(express.json({ limit: "64kb" }));
app.use(express.urlencoded({ extended: false }));

app.use("/api/health", healthRouter);
app.use("/api/newsletter", newsletterRouter);
app.use("/api/tracking", trackingRouter);
app.use("/api/chat", chatRoutes);

app.use(notFoundHandler);
app.use(errorMiddleware);

export default app;