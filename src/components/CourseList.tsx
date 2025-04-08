import { useState } from "react";
import CourseCard from "./CourseCard";
import { CourseInfo } from "./CourseInfo";
import { EmptyCoursesList } from "./EmptyCoursesList";
import { Course } from "../types";

type CourseListProps = {
  courses: Course[];
  searchTerm?: string;
  onShowCourseInfo: () => void;
  setShowCourseInfo: (state: boolean) => void;
  onBackToList: () => void;
};

const CourseList = ({
  courses,
  onShowCourseInfo,
  setShowCourseInfo,
  searchTerm = "",
}: CourseListProps) => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const handleShowCourse = (course: Course) => {
    setSelectedCourse(course);
    onShowCourseInfo();
  };

  const handleBackToList = () => {
    setSelectedCourse(null);
    setShowCourseInfo(false);
  };

  const filteredCourses = courses.filter((course) => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    return (
      course.title.toLowerCase().includes(lowerSearchTerm) ||
      course.description.toLowerCase().includes(lowerSearchTerm)
    );
  });

  if (selectedCourse) {
    return <CourseInfo course={selectedCourse} onBack={handleBackToList} />;
  }

  if (courses.length === 0) {
    return (
      <EmptyCoursesList onAddNewCourse={() => console.log("change later")} />
    );
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
          onShowCourse={() => handleShowCourse(course)}
        />
      ))}
    </div>
  );
};

export default CourseList;
