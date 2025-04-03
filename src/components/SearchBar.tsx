import { useState } from "react";
import Button from "./Button";
import { Search } from "lucide-react";

type SearchBarProps = {
  onSearch: (searchTerm: string) => void;
};

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleSearch = () => {
    onSearch(inputValue);
  };

  return (
    <div className="">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)} // Only update local state
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="block pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm w-72"
            placeholder="Search courses..."
          />
        </div>
        <Button onClick={handleSearch}>Search</Button>
      </div>
    </div>
  );
};
