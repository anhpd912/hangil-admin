import { ApiError } from "@/shared/api/api-error";
import { errorMessage } from "@/features/admin/lib/error-message";

export function LoadingState({ label = "Đang tải..." }: { label?: string }) {
  return <p className="font-mono-label py-8 text-center text-sm text-muted">{label}</p>;
}

export function EmptyState({ label = "Chưa có dữ liệu" }: { label?: string }) {
  return <p className="font-mono-label py-8 text-center text-sm text-muted">{label}</p>;
}

export function ErrorState({ error }: { error: unknown }) {
  const message = error instanceof ApiError ? errorMessage(error.code) : "Lỗi không xác định";
  return <p className="py-8 text-center text-sm text-red">{message}</p>;
}
