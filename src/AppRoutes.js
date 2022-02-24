import { Routes, Route } from "react-router-dom";

import { Home } from "./pages/Home";
import { Libraries } from "./pages/Libraries";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/libraries" element={<Libraries />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
};
