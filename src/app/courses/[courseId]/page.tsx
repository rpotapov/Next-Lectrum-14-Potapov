import { getClient } from "@/src/lib/client";
import { GET_COURSE_DETAILS } from '@/src/constants/graphql/queries/getCourseDetails';
import CourseDetail from '@/src/components/courses/CourseDetail';

export const dynamicParams = false;

const CoursePage = async ({ params }: { params: { courseId: string } }) => {
  const client = await getClient();

  try {
    const { data } = await client.query({
      query: GET_COURSE_DETAILS,
      variables: { courseHash: params.courseId },
    });

    const course = data.getCourseDetails.data;

    return (
      <div>
        <CourseDetail course={course} />
      </div>
    );
  } catch (error) {
    console.error('Error fetching course details:', error);
    return <p>Course not found</p>;
  }
};

export default CoursePage;
