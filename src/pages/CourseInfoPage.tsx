import Button from "../components/Button";
import { useParams, useNavigate } from "react-router";
import { Course, Author } from "../types";
import { useEffect, useState } from "react";
import axios from "axios";

const formatDuration = (totalMinutes: number) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}:${minutes.toString().padStart(2, "0")} hours`;
};

const SkeletonLoader = () => (
  <div className="max-w-5xl mx-auto px-4">
    <div className="shadow-lg border-gray-200 border bg-white p-6">
      <Button disabled>Back to courses</Button>

      <h1 className="text-2xl font-bold text-gray-800 mb-4 pt-4">
        <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse"></div>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold mb-2">Description:</h2>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
          </div>
        </div>

        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i}>
              <h3 className="font-semibold">
                <div className="h-5 bg-gray-200 rounded w-1/3 animate-pulse"></div>
              </h3>
              <div className="h-4 bg-gray-200 rounded mt-1 animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export const CourseInfoPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorsLoading, setIsAuthorsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const onBack = () => {
    navigate("/courses");
  };

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await axios.get<Course>(
          `https://67f47ff6cbef97f40d2e5f26.mockapi.io/courses/${courseId}`,
        );

        setCourse(response.data);
        return response.data.authors;
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred",
        );
        return [];
      } finally {
        setIsLoading(false);
      }
    };

    const fetchAuthors = async (authorIds: string[]) => {
      try {
        setIsAuthorsLoading(true);
        const authorsPromises = authorIds.map((authorId) =>
          axios
            .get<Author>(
              `https://67f47ff6cbef97f40d2e5f26.mockapi.io/authors/${authorId}`,
            )
            .then((response) => response.data),
        );
        const authorsData = await Promise.all(authorsPromises);
        setAuthors(authorsData);
      } catch (err) {
        console.error("Error fetching authors:", err);
      } finally {
        setIsAuthorsLoading(false);
      }
    };

    if (courseId) {
      fetchCourse().then((authorIds) => {
        if (authorIds && authorIds.length > 0) {
          fetchAuthors(authorIds);
        } else {
          setIsAuthorsLoading(false);
        }
      });
    }
  }, [courseId]);

  if (error) {
    return (
      <div className="max-w-5xl mx-auto px-4">
        <div className="shadow-lg border-gray-200 border bg-white p-6">
          <p className="text-red-500">{error}</p>
          <Button onClick={onBack}>Back to courses</Button>
        </div>
      </div>
    );
  }

  if (!course && !isLoading) {
    return (
      <div className="max-w-5xl mx-auto px-4">
        <div className="shadow-lg border-gray-200 border bg-white p-6">
          <p>Course not found</p>
          <Button onClick={onBack}>Back to courses</Button>
        </div>
      </div>
    );
  }

  const formattedCreationDate = course?.creationDate.replace(/\//g, ".");

  return (
    <div className="max-w-5xl mx-auto px-4">
      {isLoading ? (
        <SkeletonLoader />
      ) : (
        <div className="shadow-lg border-gray-200 border bg-white p-6">
          <Button onClick={onBack}>Back to courses</Button>

          <h1 className="text-2xl font-bold text-gray-800 mb-4 pt-4">
            {course?.title}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-lg font-semibold mb-2">Description:</h2>
              <p className="text-gray-700">{course?.description}</p>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">ID:</h3>
                <p>{course?.id}</p>
              </div>
              <div>
                <h3 className="font-semibold">Duration:</h3>
                <p>{course ? formatDuration(course.duration) : ""}</p>
              </div>

              <div>
                <h3 className="font-semibold">Created:</h3>
                <p>{formattedCreationDate}</p>
              </div>

              <div>
                <h3 className="font-semibold">Authors:</h3>
                {isAuthorsLoading ? (
                  <div className="space-y-2">
                    {course?.authors.map((_, index) => (
                      <div
                        key={index}
                        className="h-4 bg-gray-200 rounded animate-pulse w-3/4"
                      ></div>
                    ))}
                  </div>
                ) : (
                  <ul className="list-disc pl-5">
                    {authors.map((author) => (
                      <li key={author.id}>{author.name}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
