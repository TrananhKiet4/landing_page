import type { NextFunction, Request, Response } from "express";
import { chatRequestSchema } from "../schemas/chat.schema.js";
import { createChatReply } from "../services/chat.service.js";

export async function createChatResponse(request: Request, response: Response, next: NextFunction) {
  try {
    const parsed = chatRequestSchema.safeParse(request.body);

    if (!parsed.success) {
      return response.status(400).json({
        success: false,
        message: parsed.error.issues[0]?.message ?? "Dữ liệu không hợp lệ.",
        errors: parsed.error.flatten()
      });
    }

    const reply = await createChatReply(parsed.data);

    return response.status(200).json({
      success: true,
      reply
    });
  } catch (error) {
    return next(error);
  }
}