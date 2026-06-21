import { Suspense } from "react";
import { VocabularyListPage } from "@/features/admin/vocabulary/vocabulary-list-page";

export default function Page() {
  return (
    <Suspense>
      <VocabularyListPage />
    </Suspense>
  );
}
