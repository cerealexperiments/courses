import { Routes, Route } from "react-router";
import MainLayout from "./components/MainLayout";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
