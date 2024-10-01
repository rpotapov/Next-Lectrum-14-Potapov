"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from '@/store/auth.store';

export default function Home() {
  const router = useRouter();
  const { session } = useAuthStore();

  if (session) {
    router.push("/profile");
  } else {
    router.push("/auth/signin");
  }
}