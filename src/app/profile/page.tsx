"use client";

import { supabase } from "@/libs/supabase";
import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export default function Profile() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Error fetching session:", error);
        setError("Failed to fetch session.");
      } else {
        setSession(data.session);
      }

      setLoading(false);
    };

    getSession();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100">
      {loading ? (
        <p className="text-lime-600">Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : session ? (
        <>
          <h1 className="text-2xl font-bold text-lime-800">Welcome {session.user.email}</h1>
          <p className="text-lime-600 mt-2">User ID: {session.user.id}</p>
        </>
      ) : (
        <div className="text-lime-600 text-lg">No active session</div>
      )}
    </div>
  );
}