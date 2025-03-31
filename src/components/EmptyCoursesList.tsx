import Button from "./Button";

type EmptyCoursesListProps = {
  onAddNewCourse?: () => void;
};

export const EmptyCoursesList = ({ onAddNewCourse }: EmptyCoursesListProps) => {
  return (
    <div className="text-center py-12 border border-gray-200 rounded-lg bg-white shadow-sm">
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        Your course list is empty
      </h3>
      <p className="text-gray-500 mb-6">
        Start by adding a new course to your list
      </p>
      <Button onClick={onAddNewCourse}>Add New Course</Button>
    </div>
  );
};
