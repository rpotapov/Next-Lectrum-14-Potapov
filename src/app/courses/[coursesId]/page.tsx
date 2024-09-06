import CourseDetail from '@/src/components/CourseDetail'

const CourseDetailPage = ({ params }: { params: { coursesId: string } }) => {
    return <CourseDetail courseId={params.coursesId} />
}

export default CourseDetailPage;