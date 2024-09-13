import CourseDetail from '@/src/components/courses/CourseDetail';
import { getBaseURL } from '@/src/lib';
import { mainCourses } from '@/src/mock';

export const dynamicParams = false;

export async function generateStaticParams() {
  return mainCourses.map((course) => ({
    courseId: course.hash,
  }));
}

const CoursePage = async ({ params }: { params: { courseId: string } }) => {
  const res = await fetch(`${getBaseURL()}/api/courses/${params.courseId}`, { cache: 'no-store' });

  if (!res.ok) {
    return <p>Course not found</p>;
  }

  const course = await res.json();

  return (
    <div>
      <CourseDetail course={course} />
    </div>
  );
};

export default CoursePage;
