import type { NextFunction, Request, RequestHandler, Response } from "express";
import type { AnyZodObject, ZodTypeAny } from "zod";
import { AppError } from "./error.middleware.js";

type RequestTarget = "body" | "query" | "params";

export function validate(schema: AnyZodObject | ZodTypeAny, target: RequestTarget = "body"): RequestHandler {
  return (request: Request, _response: Response, next: NextFunction) => {
    const parsed = schema.safeParse(request[target]);

    if (!parsed.success) {
      next(new AppError(400, "Validation failed.", parsed.error.flatten()));
      return;
    }

    request[target] = parsed.data as never;
    next();
  };
}
