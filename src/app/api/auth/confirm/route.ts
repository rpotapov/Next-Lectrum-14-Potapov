import { NextResponse, NextRequest } from 'next/server';
import { supabase } from '@/libs/supabase';

export async function POST(request: NextRequest) {
  const { email, token } = await request.json();

  if (!token || !email) {
    return NextResponse.json(
      { message: 'Invalid or missing token/email' },
      { status: 400 }
    );
  }

  const { error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: 'email',
  });

  if (error) {
    console.error('Verification error:', error);
    return NextResponse.json(
      { message: 'Failed to verify email: ' + error.message },
      { status: 400 }
    );
  }

  return NextResponse.json(
    { message: 'Email successfully verified!' },
    { status: 200 }
  );
}