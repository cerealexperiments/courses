import { Routes, Route, Navigate } from "react-router";
import MainLayout from "./components/MainLayout";
import CoursesPage from "./pages/Courses";
import LoginPage from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/" element={<Navigate to="/courses" replace />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
