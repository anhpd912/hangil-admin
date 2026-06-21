"use client";

import { useEffect, useState } from "react";
import { adminUsersApi } from "@/shared/api/admin-users-api";
import type { AdminUserDetail } from "@/shared/api/types/admin-user";
import { LoadingState, ErrorState } from "@/features/admin/components/ui/state-views";
import { Button } from "@/features/admin/components/ui/button";
import { useAdminSession } from "@/shared/auth/use-admin-session";
import { UserDetailCard } from "./components/user-detail-card";
import { EditUserForm } from "./components/edit-user-form";

export function UserDetailPage({ userId }: { userId: string }) {
  const { user: currentUser } = useAdminSession();
  const [detail, setDetail] = useState<AdminUserDetail | null>(null);
  const [error, setError] = useState<unknown>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  function refetch() {
    adminUsersApi.get(userId).then(setDetail).catch(setError);
  }

  useEffect(() => {
    adminUsersApi.get(userId).then(setDetail).catch(setError);
  }, [userId]);

  if (error) return <ErrorState error={error} />;
  if (!detail) return <LoadingState />;

  return (
    <div className="flex flex-col gap-4">
      <UserDetailCard user={detail} />
      <Button onClick={() => setIsEditOpen(true)} className="w-fit">
        Sửa
      </Button>
      <EditUserForm
        open={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        user={detail}
        isSelf={currentUser?.id === detail.id}
        onSaved={refetch}
      />
    </div>
  );
}
