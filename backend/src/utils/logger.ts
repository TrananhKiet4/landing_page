export const logger = {
  info(message: string, meta?: unknown) {
    console.info("[smartair-api]", message, meta ?? "");
  },
  error(message: string, meta?: unknown) {
    console.error("[smartair-api]", message, meta ?? "");
  }
};
