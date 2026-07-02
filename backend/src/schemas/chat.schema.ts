import { z } from "zod";

export const chatMessageSchema = z.object({
  role: z.enum(["user", "bot"]),
  content: z.string().trim().min(1).max(1000)
});

export const chatRequestSchema = z.object({
  message: z.string().trim().min(1, "Vui lòng nhập nội dung câu hỏi.").max(500, "Câu hỏi tối đa 500 ký tự."),
  history: z.array(chatMessageSchema).max(10).optional()
});

export type ChatRequestInput = z.infer<typeof chatRequestSchema>;