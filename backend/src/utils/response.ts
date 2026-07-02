import type { Response } from "express";

export function sendSuccess<T>(
  response: Response,
  statusCode: number,
  message: string,
  data: T
) {
  return response.status(statusCode).json({
    success: true,
    message,
    data
  });
}
