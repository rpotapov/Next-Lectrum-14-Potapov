import { getClient } from "@/src/lib/client";
import { CourseReturn, Course } from '@/src/types/__generated__/graphql';
import { gql } from '@apollo/client';
import CourseCard from "./CourseCard";

export const revalidate = 10;

const query = gql`
  query GetAllCourses {
    getAllCourses(page: 1, limit: 10) {
    data {
        hash
        rating
        poster
        duration
        views
        description
        technologies
        createdBy
        price
      }
    }
  }
`;


const CourseList = async () => {
  const graphqlClient = await getClient();
  const { data } = await graphqlClient.query<{ getAllCourses: CourseReturn }>({ query, variables: { page: 1, limit: 10 } });

  return (
    <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-md:grid-cols-1">
      {data?.getAllCourses?.data?.map((course: Course) => (
        <CourseCard
          key={course.hash}
          course={course}
        />
      ))}
      <p className="text-sm text-gray-500 mt-8 text-center">
        Page updated every 60 seconds. Last update: {new Date().toLocaleTimeString()}
      </p>
    </div>
  );
};

export default CourseList;