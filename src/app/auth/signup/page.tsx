'use client';

import { useAuthStore } from '@/store/auth.store';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const { signUp } = useAuthStore();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await signUp({ email, password });

      if (response.error) {
        setError(response.error.message);
      } else {

        router.push('/profile');
      }
    } catch (error) {
      console.error('Error during sign up: ', error);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50">
      <div className="bg-white p-8 rounded-md shadow-lg w-full max-w-md">
        <h1 className="text-3xl mb-4 text-green-600 font-bold">Sign Up</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSignUp} className="space-y-4">
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
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-green-500">
          Already have an account?{' '}
          <a href="/auth/signin" className="text-green-600 font-semibold">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}