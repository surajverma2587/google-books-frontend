import { Routes, Route } from "react-router-dom";

import { Home } from "./pages/Home";
import { Libraries } from "./pages/Libraries";
import { Library } from "./pages/Library";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/libraries" element={<Libraries />} />
      <Route path="/libraries/:id" element={<Library />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
};
