"use client";

import { useState } from "react";
import { Badge } from "@/features/admin/components/ui/badge";
import { adminLessonsApi } from "@/shared/api/admin-lessons-api";

type PublishToggleProps = {
  lessonId: string;
  isPublished: boolean;
  onChanged: (next: boolean) => void;
};

export function PublishToggle({ lessonId, isPublished, onChanged }: PublishToggleProps) {
  const [pending, setPending] = useState(false);

  async function handleClick() {
    const next = !isPublished;
    onChanged(next);
    setPending(true);
    try {
      await adminLessonsApi.setPublished(lessonId, next);
    } catch {
      onChanged(isPublished);
    } finally {
      setPending(false);
    }
  }

  return (
    <button onClick={handleClick} disabled={pending}>
      <Badge active={isPublished}>{isPublished ? "Đã xuất bản" : "Bản nháp"}</Badge>
    </button>
  );
}
