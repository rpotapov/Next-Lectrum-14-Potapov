import { NextResponse } from 'next/server';
import { supabase } from '@/libs/supabase';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
console.log('data', data);
  if (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 400 }
    );
  }

  const accessToken = data.session?.access_token;

  if (accessToken) {
    const cookieStore = cookies();
    cookieStore.set('sb-access-token', accessToken, { path: '/' });
    
    return NextResponse.json(
      { message: 'Sign-in successful', accessToken },
      { status: 200 }
    );
  }

  return NextResponse.json(
    { message: 'Access token is missing.' },
    { status: 500 }
  );
}