import { Suspense } from "react";
import { FeedbackListPage } from "@/features/admin/feedback/feedback-list-page";

export default function Page() {
  return (
    <Suspense>
      <FeedbackListPage />
    </Suspense>
  );
}
