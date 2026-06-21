import type { ApiErrorCode } from "@/shared/api/api-error";

const MESSAGES: Record<ApiErrorCode, string> = {
  VALIDATION_ERROR: "Dữ liệu không hợp lệ",
  USER_NOT_FOUND: "Không tìm thấy user",
  LESSON_NOT_FOUND: "Không tìm thấy bài học",
  VOCAB_NOT_FOUND: "Không tìm thấy từ vựng",
  SELF_DEMOTE_FORBIDDEN: "Không thể tự hạ quyền admin của chính mình",
  UNAUTHORIZED: "Chưa đăng nhập hoặc phiên đã hết hạn",
  FORBIDDEN: "Không đủ quyền truy cập",
  UNKNOWN: "Lỗi không xác định, vui lòng thử lại",
};

export function errorMessage(code: ApiErrorCode): string {
  return MESSAGES[code] ?? MESSAGES.UNKNOWN;
}
