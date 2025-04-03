import { useState } from "react";
import CourseList from "./components/CourseList";
import Header from "./components/Header";
import { SearchBar } from "./components/SearchBar";
import Button from "./components/Button";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showCourseInfo, setShowCourseInfo] = useState(false);

  const handleBackToList = () => {
    setShowCourseInfo(false);
    setSearchTerm("");
  };

  console.log(showCourseInfo);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="bg-gray-50 pt-12 flex-1">
        <div className="max-w-5xl mx-auto px-4">
          {!showCourseInfo && (
            <div className="flex justify-between items-center mb-8">
              <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
              <Button>Add new course</Button>
            </div>
          )}
          <CourseList
            searchTerm={searchTerm}
            onShowCourseInfo={() => setShowCourseInfo(true)}
            setShowCourseInfo={setShowCourseInfo}
            onBackToList={handleBackToList}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
