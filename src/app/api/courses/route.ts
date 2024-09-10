import { mainCourses } from '@/src/mock';
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(mainCourses);
}
