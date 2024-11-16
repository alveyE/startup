import { StrictMode } from "react";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

import List from "./pages/List";
import Sales from "./pages/Sales";
import ProductPage from "./pages/ProductPage";
import Login from "./login/Login";
import "./main.css";
import { AuthState } from "./login/authState";

export function App() {
  const [userName, setUserName] = React.useState(
    localStorage.getItem("userName") || ""
  );
  const currentAuthState = userName
    ? AuthState.Authenticated
    : AuthState.Unauthenticated;
  const [authState, setAuthState] = React.useState(currentAuthState);

  return (
    <StrictMode>
      <Router>
        <Routes>
          <Route path="/index.html" element={<Home />} />
          <Route path="/list.html" element={<List />} />
          <Route
            path="/login.html"
            element={
              <Login
                userName={userName}
                authState={authState}
                onAuthChange={(userName, authState) => {
                  setAuthState(authState);
                  setUserName(userName);
                }}
              />
            }
          />
          <Route path="/sales.html" element={<Sales />} />
          <Route path="/product.html" element={<ProductPage />} />

          <Route path="/" element={<Home />} />
          <Route path="/list" element={<List />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/product" element={<ProductPage />} />
          <Route
            path="/login"
            element={
              <Login
                userName={userName}
                authState={authState}
                onAuthChange={(userName, authState) => {
                  setAuthState(authState);
                  setUserName(userName);
                }}
              />
            }
          />
        </Routes>
      </Router>
    </StrictMode>
  );
}
