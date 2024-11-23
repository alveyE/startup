import { useNavigate } from "react-router";
import Footer from "../components/Footer";
import Navbar from "../components/NavBar";
import React from "react";
import { AuthState } from "./authState";

function Login({ userName, authState, onAuthChange }) {
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
        <Unauthenticated
          userName={userName}
          onLogin={(loginUserName) => {
            onAuthChange(loginUserName, AuthState.Authenticated);
          }}
        />
      )}
      <Footer />
    </>
  );
}

function Authenticated(props) {
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
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
}

function Unauthenticated(props) {
  const navigate = useNavigate();

  const [userName, setUserName] = React.useState(props.userName);
  const [password, setPassword] = React.useState("");
  const [displayError, setDisplayError] = React.useState(null);

  async function loginUser() {
    loginOrCreate(`/api/auth/login`);
  }

  async function createUser() {
    loginOrCreate(`/api/auth/create`);
  }

  async function loginOrCreate(endpoint) {
    const response = await fetch(endpoint, {
      method: "post",
      body: JSON.stringify({ email: userName, password: password }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    if (response?.status === 200) {
      localStorage.setItem("userName", userName);
      props.onLogin(userName);
    } else {
      const body = await response.json();
      setDisplayError(`⚠ Error: ${body.msg}`);
    }
  }
  return (
    <>
      <div>
        <div className="input-group mb-3">
          <span className="input-group-text">@</span>
          <input
            className="form-control"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="your@email.com"
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text">🔒</span>
          <input
            className="form-control"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />
        </div>
        <button onClick={() => loginUser()} disabled={!userName || !password}>
          Login
        </button>
        <button onClick={() => createUser()} disabled={!userName || !password}>
          Create
        </button>
      </div>
    </>
  );
}

export default Login;
