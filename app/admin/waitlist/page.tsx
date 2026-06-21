import { Suspense } from "react";
import { WaitlistPage } from "@/features/admin/waitlist/waitlist-page";

export default function Page() {
  return (
    <Suspense>
      <WaitlistPage />
    </Suspense>
  );
}
