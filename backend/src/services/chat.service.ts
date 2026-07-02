import { GoogleGenAI } from "@google/genai";
import type { ChatRequestInput } from "../schemas/chat.schema.js";

const ai = new GoogleGenAI({});

function getFallbackReply(message: string) {
  const text = message.toLowerCase();

  if (text.includes("giá") || text.includes("bao nhiêu")) {
    return "SmartAir Pro dự kiến có giá từ 4.990.000đ. Bạn có thể đăng ký danh sách chờ để nhận thông tin mở bán sớm.";
  }

  if (text.includes("lọc") || text.includes("bụi") || text.includes("pm2.5") || text.includes("hepa")) {
    return "SmartAir Pro dùng bộ lọc HEPA H13 kết hợp than hoạt tính, giúp giảm bụi mịn PM2.5, phấn hoa, mùi nấu ăn và các tác nhân gây dị ứng.";
  }

  if (text.includes("ồn") || text.includes("độ ồn") || text.includes("ngủ")) {
    return "Ở chế độ ngủ, SmartAir Pro hoạt động khoảng 22 dB, phù hợp cho phòng ngủ hoặc không gian cần yên tĩnh.";
  }

  if (text.includes("diện tích") || text.includes("phòng") || text.includes("m2") || text.includes("m²")) {
    return "SmartAir Pro phù hợp cho không gian lên đến khoảng 75m² như phòng khách, phòng ngủ lớn, studio hoặc văn phòng tại nhà.";
  }

  return "Mình có thể hỗ trợ bạn về giá, bộ lọc, độ ồn, diện tích phòng, kết nối app, bảo hành hoặc chế độ AI của SmartAir Pro.";
}

function buildPrompt(input: ChatRequestInput) {
  const historyText =
    input.history
      ?.slice(-8)
      .map((message) => `${message.role === "user" ? "Khách hàng" : "Trợ lý"}: ${message.content}`)
      .join("\n") ?? "";

  return `
Bạn là chatbot tư vấn sản phẩm SmartAir Pro trên landing page.

Thông tin sản phẩm:
- SmartAir Pro là máy lọc không khí thông minh dùng AI.
- Tính năng chính: lọc bụi PM2.5, HEPA H13, than hoạt tính, theo dõi chất lượng không khí, tự điều chỉnh theo ngữ cảnh phòng.
- Diện tích phù hợp: khoảng 75m².
- CADR: 520 m³/h.
- Độ ồn chế độ ngủ: khoảng 22 dB.
- Kết nối: Wi-Fi 6, điều khiển qua app, cập nhật OTA.
- Giá dự kiến: từ 4.990.000đ.
- Bảo hành dự kiến: 12 tháng.

Quy tắc trả lời:
- Trả lời bằng tiếng Việt.
- Ngắn gọn, thân thiện, dễ hiểu.
- Không bịa thông tin ngoài dữ liệu sản phẩm.
- Nếu khách hỏi thông tin chưa có, hãy nói hiện chưa có thông tin chính thức và gợi ý đăng ký nhận tin.
- Không trả lời các chủ đề không liên quan đến SmartAir Pro.

Lịch sử hội thoại:
${historyText || "Chưa có."}

Câu hỏi mới của khách hàng:
${input.message}
`.trim();
}

export async function createChatReply(input: ChatRequestInput) {
  if (!process.env.GEMINI_API_KEY) {
    return getFallbackReply(input.message);
  }

  try {
    const interaction = await ai.interactions.create({
      model: process.env.GEMINI_MODEL ?? "gemini-3.5-flash",
      input: buildPrompt(input)
    });

    return interaction.output_text?.trim() || getFallbackReply(input.message);
  } catch (error) {
    console.error("Chat error:", error);
    return getFallbackReply(input.message);
  }
}