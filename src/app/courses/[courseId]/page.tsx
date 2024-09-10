import CourseDetail from '@/src/components/CourseDetail';
import { getBaseURL } from '@/src/lib';
import { mainCourses } from '@/src/mock';

export const dynamicParams = false;

export async function generateStaticParams() {
    return mainCourses.map(({ hash }) => ({
      courseId: hash,
    }));
}

const CoursePage = async ({ params }: { params: { courseId: string } }) => {
    const res = await fetch(`${getBaseURL()}/api/courses/${params.courseId}`, { cache: 'no-store' });

    if (!res.ok) {
        return <p>Course not found</p>;
    }

    const course = await res.json();

    return (
        <CourseDetail course={course}/>
    );
};

export default CoursePage;
