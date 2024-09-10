import { mainCourses } from '@/src/mock';
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { courseId: string } }) {

  const geCourse = mainCourses.find(({ hash }) => hash === params.courseId);

  if (!geCourse) {
    return NextResponse.json({ message: 'Course not found' }, { status: 404 });
  }

  return NextResponse.json(geCourse);
}
