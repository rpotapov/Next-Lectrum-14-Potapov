import { NextResponse, NextRequest } from 'next/server';
import { supabase } from '@/libs/supabase';

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 400 }
    );
  }

  return NextResponse.json(
    { message: 'Sign-in successful', data },
    { status: 200 }
  );
}