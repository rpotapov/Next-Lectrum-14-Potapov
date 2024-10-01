'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import { useState } from 'react';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const { signIn } = useAuthStore();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await signIn({ email, password });

      if (response?.error) {
        setError(response.error.message);
      } else {
        setError(null);
        router.push('/profile');
      }
    } catch (err) {
      console.error('Error signing in:', err);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50">
      <div className="bg-white p-8 rounded-md shadow-lg w-full max-w-md">
        <h1 className="text-3xl mb-4 text-green-600 font-bold">Sign In</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSignIn} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-lime-700 text-lime-700 p-2 w-full rounded-md focus:outline-none focus:ring focus:ring-lime-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-lime-700 text-lime-700 p-2 w-full rounded-md focus:outline-none focus:ring focus:ring-lime-400"
          />
          <button
            type="submit"
            className="bg-green-300 text-white px-4 py-2 rounded-md hover:bg-green-400 w-full"
          >
            Sign In
          </button>
        </form>
        <p className="mt-4 text-center text-green-500">
          Don&apos;t have an account?{' '}
          <a href="/auth/signup" className="text-green-600 font-semibold">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}