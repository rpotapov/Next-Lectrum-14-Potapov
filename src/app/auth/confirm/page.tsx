'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';

export default function ConfirmEmail() {
  const router = useRouter();
  const [message, setMessage] = useState('Verifying your email...');
  const { confirmEmail } = useAuthStore();

  useEffect(() => {
    const verifyEmail = async () => {
      const token = new URLSearchParams(window.location.search).get('token');
      const email = new URLSearchParams(window.location.search).get('email');

      if (!token || !email) {
        setMessage('Invalid or missing token/email');
        return;
      }

      const response = await confirmEmail({ email, token });

      if (response.error) {
        console.error('Verification error:', response.error);
        setMessage('Failed to verify email: ' + response.error.message);
      } else {
        setMessage('Email successfully verified! Redirecting...');
        setTimeout(() => {
          router.push('/auth/signin');
        }, 3000);
      }
    };

    verifyEmail();
  }, [router, confirmEmail]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50">
      <h1 className="text-2xl font-semibold text-lime-700">{message}</h1>
    </div>
  );
}