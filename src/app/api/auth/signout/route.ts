import { NextResponse } from 'next/server';
import { supabase } from '@/libs/supabase';

export async function POST() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 400 }
    );
  }

  return NextResponse.json(
    { message: 'Sign-out successful' },
    { status: 200 }
  );
}