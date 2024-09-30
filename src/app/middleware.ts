import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createClient } from "@/utils/supabase/server";

export async function middleware(request: Request) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error || !session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*', '/blog/:path*']
};