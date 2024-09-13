'use client';
import { useState } from 'react';
import { CourseType } from "@/src/types";
import CourseCard from "./CourseCard";

export const revalidate = 10;

const CourseList = ({ courses =[] }: { courses: CourseType[ ]}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCourses = courses?.filter(course =>
    course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section>
      <input
        type="text"
        placeholder="Search courses..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 w-full p-2 border border-gray-300 rounded"
      />
      <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-md:grid-cols-1">
      {filteredCourses.length ? (
        filteredCourses?.map((course) => (
          <CourseCard
            key={course.hash}
            course={course}
          />
        ))
      ) : (
        <p>No courses found</p>
      )}
    </div>
    </section>
  );
};

export default CourseList;