import { Suspense } from "react";
import { UsersListPage } from "@/features/admin/users/users-list-page";

export default function Page() {
  return (
    <Suspense>
      <UsersListPage />
    </Suspense>
  );
}
