import type { CorsOptions } from "cors";

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:4173",
  "https://landing-page-frontend-seven.vercel.app"
];

export const corsOptions: CorsOptions = {
  origin(origin, callback) {
    if (!origin) {
      callback(null, true);
      return;
    }

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    if (origin.endsWith(".vercel.app")) {
      callback(null, true);
      return;
    }

    callback(null, false);
  },
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false,
  optionsSuccessStatus: 204
};