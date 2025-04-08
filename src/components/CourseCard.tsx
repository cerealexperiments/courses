import Button from "./Button";
import { Trash2 } from "lucide-react";
import { Pencil } from "lucide-react";
import { Course } from "../types";
import { useNavigate } from "react-router";

type CourseCardProps = Course & {
  onDelete: () => void;
};

const formatDuration = (totalMinutes: number) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}:${minutes.toString().padStart(2, "0")}`;
};

const CourseCard = ({
  id,
  title,
  description,
  authors,
  duration,
  creationDate,
  onDelete,
}: CourseCardProps) => {
  const formattedCreationDate = creationDate.replace(/\//g, ".");
  const navigate = useNavigate();

  return (
    <div className="shadow-lg border-gray-200 border bg-white py-6 px-3">
      <p className="text-lg font-bold text-gray-800">{title}</p>
      <div className="flex gap-12 pt-2">
        <p className="text-gray-800 text-sm">{description}</p>
        <div className="flex flex-col ml-auto">
          <div className="space-y-1">
            {" "}
            <div className="text-sm text-gray-800 flex items-baseline">
              {" "}
              <span className="font-semibold mr-1">Authors:</span>
              <span
                className="inline-block max-w-[200px] whitespace-nowrap overflow-hidden text-ellipsis align-middle"
                title={authors.map((author) => author).join(", ")}
              >
                {authors.map((author) => author).join(", ")}
              </span>
            </div>
            <p className="text-sm text-gray-800">
              <span className="font-semibold">Duration: </span>
              {formatDuration(duration)} hours
            </p>
            <p className="text-sm text-gray-800">
              <span className="font-semibold">Created: </span>
              {formattedCreationDate}
            </p>
          </div>
          <div className="flex items-center mt-auto pt-4 w-full gap-2">
            <Button onClick={() => navigate(`/courses/${id}`)}>
              Show Course
            </Button>
            <Button onClick={onDelete}>
              <Trash2 color="white" size={20} />
            </Button>
            <Button>
              <Pencil color="white" size={20} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
