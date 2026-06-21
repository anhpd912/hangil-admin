"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { TextField } from "@/features/admin/components/ui/text-field";

const DEBOUNCE_MS = 300;

export function UsersSearchBar({ initialSearch }: { initialSearch: string }) {
  const router = useRouter();
  const [value, setValue] = useState(initialSearch);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      const params = new URLSearchParams();
      if (value) params.set("search", value);
      router.push(`/admin/users?${params.toString()}`);
    }, DEBOUNCE_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [value, router]);

  return (
    <TextField
      placeholder="Tìm theo email hoặc tên..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
