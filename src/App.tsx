import { useState } from "react";
import CourseList from "./components/CourseList";
import Header from "./components/Header";
import { SearchBar } from "./components/SearchBar";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="bg-gray-50 pt-12 flex-1">
        <div className="max-w-5xl mx-auto px-4">
          <SearchBar onSearch={setSearchTerm} />
          <CourseList searchTerm={searchTerm} />
        </div>
      </div>
    </div>
  );
}

export default App;
