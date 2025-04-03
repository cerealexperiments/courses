import { useState, useEffect } from "react";
import CourseCard from "./CourseCard";
import { CourseInfo } from "./CourseInfo";
import { EmptyCoursesList } from "./EmptyCoursesList";
import { mockCurrentCoursesList, mockedAuthorsList } from "../mockCoursesList";

type Course = {
  id: string;
  title: string;
  description: string;
  authors: { id: string; name: string }[];
  duration: number;
  creationDate: string;
};

type CourseListProps = {
  searchTerm?: string;
  onShowCourseInfo: () => void;
  setShowCourseInfo: (state: boolean) => void;
  onBackToList: () => void;
};

const COURSES_STORAGE_KEY = "mockCourses";

const CourseList = ({
  onShowCourseInfo,
  setShowCourseInfo,
  searchTerm = "",
}: CourseListProps) => {
  const loadInitialCourses = () => {
    const savedCourses = localStorage.getItem(COURSES_STORAGE_KEY);
    if (savedCourses) {
      return JSON.parse(savedCourses);
    }
    return mockCurrentCoursesList.map((course) => {
      const authorNames = course.authors.map((authorId) =>
        mockedAuthorsList.find((author) => author.id === authorId),
      ) as { name: string; id: string }[];
      return { ...course, authors: authorNames };
    });
  };

  const [courses, setCourses] = useState<Course[]>(loadInitialCourses);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  useEffect(() => {
    localStorage.setItem(COURSES_STORAGE_KEY, JSON.stringify(courses));
  }, [courses]);

  const handleDeleteCourse = (courseId: string) => {
    setCourses((prevCourses) =>
      prevCourses.filter((course) => course.id !== courseId),
    );
  };

  const handleShowCourse = (course: Course) => {
    setSelectedCourse(course);
    onShowCourseInfo();
  };

  const handleBackToList = () => {
    setSelectedCourse(null);
    setShowCourseInfo(false);
  };

  const handleRestoreCourses = () => {
    const initialCourses = mockCurrentCoursesList.map((course) => {
      const authorNames = course.authors.map((authorId) =>
        mockedAuthorsList.find((author) => author.id === authorId),
      ) as { name: string; id: string }[];
      return { ...course, authors: authorNames };
    });
    setCourses(initialCourses);
    localStorage.setItem(COURSES_STORAGE_KEY, JSON.stringify(initialCourses));
  };

  const filteredCourses = courses.filter((course) => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    return (
      course.title.toLowerCase().includes(lowerSearchTerm) ||
      course.description.toLowerCase().includes(lowerSearchTerm) ||
      course.authors.some((author) =>
        author.name.toLowerCase().includes(lowerSearchTerm),
      )
    );
  });

  if (selectedCourse) {
    return <CourseInfo course={selectedCourse} onBack={handleBackToList} />;
  }

  if (courses.length === 0) {
    return <EmptyCoursesList onAddNewCourse={handleRestoreCourses} />;
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
          onDelete={() => handleDeleteCourse(course.id)}
          onShowCourse={() => handleShowCourse(course)}
        />
      ))}
    </div>
  );
};

export default CourseList;
