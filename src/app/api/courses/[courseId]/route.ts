import { mainCourses } from '@/src/mock';
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { courseId: string } }) {
  const course = mainCourses.find(course => course.hash === params.courseId);

  if (!course) {
    return NextResponse.json({ message: 'Course not found' }, { status: 404 });
  }

  return NextResponse.json(course);
}
