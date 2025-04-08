import CourseCard from "./CourseCard";
import { EmptyCoursesList } from "./EmptyCoursesList";
import { Course } from "../types";
import { useNavigate } from "react-router";

type CourseListProps = {
  courses: Course[];
  searchTerm?: string;
  onShowCourseInfo: () => void;
  setShowCourseInfo: (state: boolean) => void;
  onBackToList: () => void;
};

const CourseList = ({ courses, searchTerm = "" }: CourseListProps) => {
  const navigate = useNavigate();
  const filteredCourses = courses.filter((course) => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    return (
      course.title.toLowerCase().includes(lowerSearchTerm) ||
      course.description.toLowerCase().includes(lowerSearchTerm)
    );
  });

  if (courses.length === 0) {
    return <EmptyCoursesList onAddNewCourse={() => navigate("/courses/add")} />;
  }

  if (filteredCourses.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No courses found matching your search.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-12">
      {filteredCourses.map((course) => (
        <CourseCard
          key={course.id}
          {...course}
          onDelete={() => console.log("something")}
        />
      ))}
    </div>
  );
};

export default CourseList;
