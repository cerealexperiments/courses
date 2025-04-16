import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router";
import Button from "../components/Button";

type Author = {
  id: string;
  name: string;
};

type CourseFormData = {
  title: string;
  description: string;
  duration: string;
  newAuthor: string;
};

const AddCoursePage = () => {
  const navigate = useNavigate();
  const [allAuthors, setAllAuthors] = useState<Author[]>([]);
  const [courseAuthors, setCourseAuthors] = useState<Author[]>([]);
  const [isCreatingAuthor, setIsCreatingAuthor] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CourseFormData>({
    defaultValues: {
      title: "",
      description: "",
      duration: "",
      newAuthor: "",
    },
  });

  const fetchAuthors = async () => {
    try {
      const response = await fetch(
        "https://67f47ff6cbef97f40d2e5f26.mockapi.io/authors",
      );
      const data = await response.json();
      setAllAuthors(data);
    } catch (error) {
      console.error("Error fetching authors:", error);
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  const handleAddAuthor = (author: Author) => {
    setAllAuthors((prev) => prev.filter((a) => a.id !== author.id));
    setCourseAuthors((prev) => [...prev, author]);
  };

  const handleRemoveAuthor = (author: Author) => {
    setCourseAuthors((prev) => prev.filter((a) => a.id !== author.id));
    setAllAuthors((prev) => [...prev, author]);
  };

  const handleCreateAuthor = async () => {
    const newAuthorName = watch("newAuthor");
    if (newAuthorName.length >= 2) {
      setIsCreatingAuthor(true);
      try {
        const response = await fetch(
          "https://67f47ff6cbef97f40d2e5f26.mockapi.io/authors",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: newAuthorName }),
          },
        );

        if (response.ok) {
          const newAuthor = await response.json();

          setAllAuthors((prev) => [...prev, newAuthor]);
          setValue("newAuthor", "");
        } else {
          console.error("Failed to create author");
        }
      } catch (error) {
        console.error("Error creating author:", error);
      } finally {
        setIsCreatingAuthor(false);
      }
    }
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}:${mins.toString().padStart(2, "0")} hours`;
  };

  const onSubmit = async (data: CourseFormData) => {
    if (courseAuthors.length === 0) {
      return;
    }

    const newCourse = {
      title: data.title,
      description: data.description,
      duration: parseInt(data.duration),
      creationDate: new Date().toLocaleDateString(),
      authors: courseAuthors.map((a) => a.id),
    };

    try {
      const response = await fetch(
        "https://67f47ff6cbef97f40d2e5f26.mockapi.io/courses",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newCourse),
        },
      );

      if (response.ok) {
        navigate("/courses");
      }
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Create New Course</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Title*
            </label>
            <input
              id="title"
              {...register("title", {
                required: "Title is required",
                minLength: {
                  value: 2,
                  message: "Title must be at least 2 characters",
                },
              })}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.title ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Course title"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="duration"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Duration (minutes)*
            </label>
            <Controller
              name="duration"
              control={control}
              rules={{
                required: "Duration is required",
                validate: {
                  positive: (v) =>
                    parseInt(v) > 0 || "Duration must be greater than 0",
                  isNumber: (v) => !isNaN(Number(v)) || "Must be a number",
                },
              }}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.duration ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Duration in minutes"
                  onChange={(e) => {
                    if (
                      e.target.value === "" ||
                      /^[0-9\b]+$/.test(e.target.value)
                    ) {
                      field.onChange(e.target.value);
                    }
                  }}
                />
              )}
            />
            {watch("duration") && !errors.duration && (
              <p className="mt-1 text-sm text-gray-500">
                Duration: {formatDuration(parseInt(watch("duration")))}
              </p>
            )}
            {errors.duration && (
              <p className="mt-1 text-sm text-red-600">
                {errors.duration.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description*
          </label>
          <textarea
            id="description"
            {...register("description", {
              required: "Description is required",
              minLength: {
                value: 2,
                message: "Description must be at least 2 characters",
              },
            })}
            rows={4}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Course description"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-300 p-4 rounded-md">
            <h2 className="text-lg font-semibold mb-4">Authors</h2>
            {allAuthors.length > 0 ? (
              <ul className="space-y-2">
                {allAuthors.map((author) => (
                  <li
                    key={author.id}
                    className="flex justify-between items-center"
                  >
                    <span>{author.name}</span>
                    <Button
                      type="button"
                      onClick={() => handleAddAuthor(author)}
                      className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 text-sm"
                    >
                      Add
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No authors available</p>
            )}

            <div className="mt-6">
              <h3 className="text-md font-medium mb-2">Add New Author</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  {...register("newAuthor", {
                    minLength: {
                      value: 2,
                      message: "Author name must be at least 2 characters",
                    },
                  })}
                  className={`flex-1 px-3 py-2 border rounded-md ${
                    errors.newAuthor ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Author name"
                />
                <Button
                  type="button"
                  onClick={(event) => {
                    event.preventDefault();
                    handleCreateAuthor();
                  }}
                  disabled={isCreatingAuthor}
                  className={`${
                    isCreatingAuthor
                      ? "bg-green-400"
                      : "bg-green-600 hover:bg-green-700"
                  } text-white py-2 px-4`}
                >
                  {isCreatingAuthor ? "Creating..." : "Create"}
                </Button>
              </div>
              {errors.newAuthor && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.newAuthor.message}
                </p>
              )}
            </div>
          </div>

          <div className="border border-gray-300 p-4 rounded-md">
            <h2 className="text-lg font-semibold mb-4">Course Authors</h2>
            {courseAuthors.length > 0 ? (
              <ul className="space-y-2">
                {courseAuthors.map((author) => (
                  <li
                    key={author.id}
                    className="flex justify-between items-center"
                  >
                    <span>{author.name}</span>
                    <Button
                      type="button"
                      onClick={() => handleRemoveAuthor(author)}
                      className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 text-sm"
                    >
                      Delete
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No authors selected</p>
            )}
            {courseAuthors.length === 0 && (
              <p className="mt-2 text-sm text-red-600">
                Please add at least one author
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            onClick={() => navigate("/courses")}
            className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-6"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6"
          >
            Create Course
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddCoursePage;
