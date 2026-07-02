import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { logger } from "../utils/logger.js";

export class AppError extends Error {
  statusCode: number;
  details?: unknown;

  constructor(statusCode: number, message: string, details?: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
  }
}

export function notFoundHandler(_request: Request, _response: Response, next: NextFunction) {
  next(new AppError(404, "Route not found."));
}

export function errorMiddleware(
  error: unknown,
  _request: Request,
  response: Response,
  _next: NextFunction
) {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      success: false,
      message: error.message,
      details: error.details ?? null
    });
  }

  if (error instanceof ZodError) {
    return response.status(400).json({
      success: false,
      message: "Validation failed.",
      details: error.flatten()
    });
  }

  if (error instanceof PrismaClientKnownRequestError && error.code === "P2002") {
    return response.status(409).json({
      success: false,
      message: "The record already exists.",
      details: error.meta ?? null
    });
  }

  logger.error("Unhandled error", error);

  return response.status(500).json({
    success: false,
    message: "Internal server error."
  });
}
