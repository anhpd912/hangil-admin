export type ApiErrorCode =
  | "VALIDATION_ERROR"
  | "USER_NOT_FOUND"
  | "LESSON_NOT_FOUND"
  | "VOCAB_NOT_FOUND"
  | "SELF_DEMOTE_FORBIDDEN"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "UNKNOWN";

export class ApiError extends Error {
  code: ApiErrorCode;
  status: number;

  constructor(code: ApiErrorCode, message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.code = code;
    this.status = status;
  }
}
