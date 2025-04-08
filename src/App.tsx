import { Routes, Route } from "react-router";
import MainLayout from "./components/MainLayout";
import HomePage from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
      </Route>
    </Routes>
  );
}

export default App;
