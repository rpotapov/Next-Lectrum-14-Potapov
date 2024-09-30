"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/libs/supabase"; // Adjust the import path as needed

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        router.push("/profile");
      } else {
        router.push("/auth/signin");
      }
    };

    checkSession();
  }, [router]);
}