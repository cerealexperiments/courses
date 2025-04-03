import Button from "./Button";
import logo from "../assets/logo.svg";

const Header = () => {
  return (
    <header className="border-b-gray-300 border-b">
      <div className="flex max-w-6xl mx-auto justify-between items-center py-2">
        <img src={logo} alt="Courses logo" />
        <div className="flex items-center gap-4">
          <p className="font-semibold text-gray-800">Harry Potter</p>
          <Button>Logout</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
