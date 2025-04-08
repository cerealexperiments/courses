import { Outlet } from "react-router";
import Header from "./Header";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="bg-gray-50 pt-12 flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
