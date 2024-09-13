import CourseList from "@/src/components/courses/CourseList";
import ProfileInfo from "@/src/components/ProfileInfo";
import { getBaseURL } from "@/src/lib";
import { CourseType } from "@/src/types";

export const revalidate = 3600;

const Home = async () => {
  const courses = await fetch(`${getBaseURL()}/api/courses`, { cache: 'no-store' }).then(res => res.json()) as CourseType[]
  return (
    <main className="min-h-screen">
      <div className="flex justify-between pt-[40px] pb-[50px] flex-row max-xl:flex-col mx-[3vw] gap-8">
        <section className="w-[75%] max-xl:mb-[40px]">
          <CourseList courses={courses} />
        </section>
        <aside className="w-[25%] max-xl:w-full">
          <ProfileInfo />
        </aside>
      </div>
    </main>
  );
};

export default Home;
