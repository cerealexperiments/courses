import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import CourseList from "../components/CourseList";
import { SearchBar } from "../components/SearchBar";
import Button from "../components/Button";
import { Course } from "../types";
import { useNavigate } from "react-router";

function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showCourseInfo, setShowCourseInfo] = useState<boolean>(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await axios.get<Course[]>(
        "https://67f47ff6cbef97f40d2e5f26.mockapi.io/courses",
      );
      setCourses(response.data);
      setError(null);
    } catch (err) {
      const error = err as AxiosError;
      setError(error.message || "An error occurred while fetching courses");
      console.error("Error fetching courses:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToList = (): void => {
    setShowCourseInfo(false);
    setSearchTerm("");
  };

  console.log(courses);

  return (
    <div className="max-w-5xl mx-auto px-4">
      {!showCourseInfo && (
        <div className="flex justify-between items-center mb-8">
          <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
          <Button onClick={() => navigate("/courses/add")}>
            Add new course
          </Button>
        </div>
      )}

      {isLoading && (
        <div className="text-center py-4 text-gray-700">Loading courses...</div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-md p-4 my-4">
          <p className="font-medium">Error loading courses:</p>
          <p>{error}</p>
          <button
            onClick={fetchCourses}
            className="mt-2 text-blue-600 hover:text-blue-800 underline"
          >
            Try again
          </button>
        </div>
      )}

      {!isLoading && !error && (
        <CourseList
          courses={courses}
          searchTerm={searchTerm}
          onShowCourseInfo={() => setShowCourseInfo(true)}
          setShowCourseInfo={setShowCourseInfo}
          onBackToList={handleBackToList}
        />
      )}
    </div>
  );
}

export default CoursesPage;
