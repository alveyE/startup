import { StrictMode } from "react";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";

import List from "./pages/List";
import Sales from "./pages/Sales";
import ProductPage from "./pages/ProductPage";
import Login from "./login/Login";
import "./main.css";
import { AuthState } from "./login/authState";
import Navbar from "./components/NavBar";

export function App() {
  const [userName, setUserName] = React.useState(
    localStorage.getItem("userName") || ""
  );

  return (
    <Router>
      <AppContent userName={userName} setUserName={setUserName} />
    </Router>
  );
}

export function AppContent({ userName, setUserName }) {
  const currentAuthState = userName
    ? AuthState.Authenticated
    : AuthState.Unauthenticated;
  const [authState, setAuthState] = React.useState(currentAuthState);

  const location = useLocation();

  const getActivePage = () => {
    switch (location.pathname) {
      case "/":
        return "home";
      case "/list":
        return "list";
      case "/sales":
        return "sales";
      case "/product":
        return "product";
      case "/login":
        return "login";
      default:
        return "";
    }
  };

  return (
    <>
      <Navbar
        username={userName}
        onLogout={() => {
          fetch(`/api/auth/logout`, {
            method: "delete",
          })
            .catch(() => {
              // Logout failed. Assuming offline
            })
            .finally(() => {
              setAuthState(AuthState.Unauthenticated);
              setUserName("");
              localStorage.removeItem("userName");
            });
        }}
        activePage={getActivePage()}
      />

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

        <Route path="/" element={<Home username={userName} />} />
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
    </>
  );
}
