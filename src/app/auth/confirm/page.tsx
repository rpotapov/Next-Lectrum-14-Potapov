'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/libs/supabase';

export default function ConfirmEmail() {
  const router = useRouter();
  const [message, setMessage] = useState('Verifying your email...');

  useEffect(() => {
    const confirmEmail = async () => {
      const token = new URLSearchParams(window.location.search).get('token');
      const email = new URLSearchParams(window.location.search).get('email');

      if (!token || !email) {
        setMessage('Invalid or missing token/email');
        return;
      }

      const { error } = await supabase.auth.verifyOtp({
        email,
        token,
        type: 'email',
      });

      if (error) {
        console.error('Verification error:', error);
        setMessage('Failed to verify email: ' + error.message);
      } else {
        setMessage('Email successfully verified! Redirecting...');
        setTimeout(() => {
          router.push('/auth/signin');
        }, 2000);
      }
    };

    confirmEmail();
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50">
      <h1 className="text-2xl font-semibold text-lime-700">{message}</h1>
    </div>
  );
}