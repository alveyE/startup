import { useNavigate } from "react-router";
import Footer from "../components/Footer";
import Navbar from "../components/NavBar";
import React from "react";
import { AuthState } from "./authState";

function Login({ userName, authState, onAuthChange }) {
  const [userNameText, setUserNameText] = React.useState(userName);
  const [password, setPassword] = React.useState("");

  const navigate = useNavigate();

  async function loginUser() {
    loginOrCreate(`/api/auth/login`);
  }

  async function createUser() {
    loginOrCreate(`/api/auth/create`);
  }

  async function loginOrCreate(endpoint) {
    const response = await fetch(endpoint, {
      method: "post",
      body: JSON.stringify({ email: userNameText, password: password }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    if (response?.status === 200) {
      localStorage.setItem("userName", userNameText);
      props.onLogin(userNameText);
    }
  }

  function handleSubmit(loginUserName) {
    event.preventDefault();
    onAuthChange(loginUserName, AuthState.Authenticated);
    // navigate("/");
  }

  return (
    <>
      <Navbar />
      {authState === AuthState.Authenticated && (
        <Authenticated
          userName={userName}
          onLogout={() => onAuthChange(userName, AuthState.Unauthenticated)}
        />
      )}
      {authState === AuthState.Unauthenticated && (
        <>
          <h2>Login</h2>
          <form onSubmit={() => handleSubmit(userNameText)}>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" required />
            <br />
            <br />
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required />
            <br />
            <br />
            <button className="button" onClick={loginUser}>
              Login
            </button>
            <button className="button" onClick={createUser}>
              Create Account
            </button>
          </form>
        </>
      )}
      <Footer />
    </>
  );
}

export function Authenticated(props) {
  const navigate = useNavigate();

  function logout() {
    fetch(`/api/auth/logout`, {
      method: "delete",
    })
      .catch(() => {
        // Logout failed. Assuming offline
      })
      .finally(() => {
        localStorage.removeItem("userName");
        props.onLogout();
      });
  }

  return (
    <div>
      <div>{props.userName}</div>
      <button variant="secondary" onClick={() => logout()}>
        Logout
      </button>
    </div>
  );
}

export default Login;
