'use client';

import { useAuthStore } from '@/store/auth.store';

export default function Profile() {
  const { session } = useAuthStore();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100">
      {session ? (
        <>
          <h1 className="text-2xl font-bold text-lime-800">
            Welcome {session.user?.email}
          </h1>
          <p className="text-lime-600 mt-2">User ID: {session.user?.id}</p>
        </>
      ) : (
        <div className="text-lime-600 text-lg">No active session. <b>Check your login or confirm email and try login again</b></div>
      )}
    </div>
  );
}