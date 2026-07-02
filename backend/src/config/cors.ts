import type { CorsOptions } from "cors";
import { corsOrigins } from "./env.js";

export const corsOptions: CorsOptions = {
  origin(origin, callback) {
    if (!origin || corsOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error("CORS origin is not allowed."));
  },
  credentials: true,
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};
