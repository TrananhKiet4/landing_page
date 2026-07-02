const API_BASE_URL = (import.meta.env.VITE_API_URL ?? "http://localhost:5000").replace(/\/$/, "");
const API_BASE = `${API_BASE_URL}/api`;

export type TrackingEventType = "cta_click" | "scroll_milestone";

type JsonLike = string | number | boolean | null | JsonLike[] | { [key: string]: JsonLike };

export interface NewsletterPayload {
  email: string;
  firstName?: string;
  source: string;
  tags: string[];
}

export interface TrackingPayload {
  eventType: TrackingEventType;
  label?: string;
  location?: string;
  path: string;
  metadata?: Record<string, JsonLike>;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

function translateApiErrorMessage(message?: string) {
  const fallback = "Yêu cầu không thành công.";

  if (!message) {
    return fallback;
  }

  const messages: Record<string, string> = {
    "Too many requests. Please try again in a minute.": "Bạn thao tác quá nhanh. Vui lòng thử lại sau khoảng một phút.",
    "Validation failed.": "Dữ liệu chưa hợp lệ. Vui lòng kiểm tra lại biểu mẫu.",
    "The record already exists.": "Thông tin này đã tồn tại trong hệ thống.",
    "Internal server error.": "Máy chủ đang gặp lỗi. Vui lòng thử lại sau.",
    "Request failed.": fallback
  };

  return messages[message] ?? message;
}

async function parseResponse<T>(response: Response): Promise<ApiResponse<T>> {
  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(translateApiErrorMessage(payload?.message));
  }

  if (!payload) {
    throw new Error("Máy chủ không trả về dữ liệu hợp lệ.");
  }

  return payload as ApiResponse<T>;
}

export async function submitNewsletter(payload: NewsletterPayload) {
  return parseResponse(
    await fetch(`${API_BASE}/newsletter`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })
  );
}

export async function sendTracking(payload: TrackingPayload) {
  const url = `${API_BASE}/tracking`;
  const body = JSON.stringify(payload);

  if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
    const didQueue = navigator.sendBeacon(
      url,
      new Blob([body], {
        type: "application/json"
      })
    );

    if (didQueue) {
      return;
    }
  }

  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body,
    keepalive: true
  }).catch(() => undefined);
}

export type ChatApiMessage = {
  role: "user" | "bot";
  content: string;
};

export type ChatApiPayload = {
  message: string;
  history?: ChatApiMessage[];
};

export async function sendChatMessage(payload: ChatApiPayload) {
  const response = await fetch(`${API_BASE}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const data = (await response.json().catch(() => null)) as {
    success?: boolean;
    reply?: string;
    message?: string;
  } | null;

  if (!response.ok || !data?.success || !data.reply) {
    throw new Error(translateApiErrorMessage(data?.message) || "Không thể gửi tin nhắn đến trợ lý.");
  }

  return data.reply;
}