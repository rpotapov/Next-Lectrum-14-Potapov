import { getBaseURL } from "../lib";
import { CourseType } from "../types";
import CourseCard from "./CourseCard";

const CourseList = async () => {
  const coursesList = await fetch(`${getBaseURL()}/api/courses`, { cache: 'force-cache' }).then(res => res.json()) as CourseType[];

  return (
    <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-md:grid-cols-1">
      {coursesList?.map((course) => (
        <CourseCard
          key={course.hash}
          course={course}
        />
      ))}
    </div>
  );
};

export default CourseList;
