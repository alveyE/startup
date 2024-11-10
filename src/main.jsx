import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

import List from "./pages/List";
import Sales from "./pages/Sales";
import ProductPage from "./pages/ProductPage";
import Login from "./pages/Login";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/index.html" element={<Home />} />
        <Route path="/list.html" element={<List />} />
        <Route path="/login.html" element={<Login />} />
        <Route path="/sales.html" element={<Sales />} />
        <Route path="/product.html" element={<ProductPage />} />

        <Route path="/" element={<Home />} />
        <Route path="/list" element={<List />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  </StrictMode>
);
