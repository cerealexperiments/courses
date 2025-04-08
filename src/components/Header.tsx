import Button from "./Button";
import logo from "../assets/logo.svg";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user, logout } = useAuth()!;

  return (
    <header className="border-b-gray-300 border-b">
      <div className="flex max-w-6xl mx-auto justify-between items-center py-2">
        <img src={logo} alt="Courses logo" />
        {user && (
          <div className="flex items-center gap-4">
            <p className="font-semibold text-gray-800">{user}</p>
            <Button onClick={logout}>Logout</Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
