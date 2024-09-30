// src/app/api/auth/session/route.ts

import { NextResponse } from 'next/server';
import { supabase } from '@/libs/supabase';

export async function GET() {
  const { data: { session }, error } = await supabase.auth.getSession();

  if (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 400 }
    );
  }

  return NextResponse.json({ session }, { status: 200 });
}