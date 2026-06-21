"use client";

import { useState } from "react";
import { Drawer } from "@/features/admin/components/ui/drawer";
import { SelectField } from "@/features/admin/components/ui/select-field";
import { Button } from "@/features/admin/components/ui/button";
import { ApiError } from "@/shared/api/api-error";
import { errorMessage } from "@/features/admin/lib/error-message";
import { adminUsersApi } from "@/shared/api/admin-users-api";
import type { AdminUserDetail } from "@/shared/api/types/admin-user";

type EditUserFormProps = {
  open: boolean;
  onClose: () => void;
  user: AdminUserDetail;
  isSelf: boolean;
  onSaved: () => void;
};

export function EditUserForm({ open, onClose, user, isSelf, onSaved }: EditUserFormProps) {
  const [plan, setPlan] = useState(user.plan);
  const [role, setRole] = useState(user.role);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await adminUsersApi.update(user.id, { plan, role });
      onSaved();
      onClose();
    } catch (err) {
      setError(err instanceof ApiError ? errorMessage(err.code) : "Lỗi không xác định");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Drawer open={open} onClose={onClose} title="Sửa user">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <SelectField
          label="Plan"
          value={plan}
          onChange={(e) => setPlan(e.target.value as "free" | "pro")}
          options={[
            { value: "free", label: "free" },
            { value: "pro", label: "pro" },
          ]}
        />
        <SelectField
          label="Role"
          value={role}
          disabled={isSelf}
          onChange={(e) => setRole(e.target.value as "user" | "admin")}
          options={[
            { value: "user", label: "user" },
            { value: "admin", label: "admin" },
          ]}
        />
        {isSelf && (
          <p className="text-xs text-muted">Không thể tự hạ quyền admin của chính mình.</p>
        )}
        {error && <p className="text-sm text-red">{error}</p>}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Đang lưu..." : "Lưu"}
        </Button>
      </form>
    </Drawer>
  );
}
