import Button from "./Button";
import { Course } from "../types";

type CourseInfoProps = {
  course: Course;
  onBack: () => void;
};

const formatDuration = (totalMinutes: number) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}:${minutes.toString().padStart(2, "0")} hours`;
};

export const CourseInfo = ({ course, onBack }: CourseInfoProps) => {
  const formattedCreationDate = course.creationDate.replace(/\//g, ".");

  return (
    <div className="shadow-lg border-gray-200 border bg-white p-6">
      <Button onClick={onBack}>Back to courses</Button>

      <h1 className="text-2xl font-bold text-gray-800 mb-4 pt-4">
        {course.title}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h2 className="text-lg font-semibold mb-2">Description:</h2>
          <p className="text-gray-700">{course.description}</p>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">ID:</h3>
            <p>{course.id}</p>
          </div>
          <div>
            <h3 className="font-semibold">Duration:</h3>
            <p>{formatDuration(course.duration)}</p>
          </div>

          <div>
            <h3 className="font-semibold">Created:</h3>
            <p>{formattedCreationDate}</p>
          </div>

          <div>
            <h3 className="font-semibold">Authors:</h3>
            <ul className="list-disc pl-5">
              {course.authors.map((author) => (
                <li key={author}>{author}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
