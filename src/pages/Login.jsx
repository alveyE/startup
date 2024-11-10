import { useNavigate } from "react-router";
import Footer from "../components/Footer";
import Navbar from "../components/NavBar";

function Login() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/");
  };
  return (
    <>
      <Navbar />
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" required />
        <br />
        <br />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" required />
        <br />
        <br />
        <button className="button">Login</button>
        <button className="button">Create Account</button>
      </form>
      <Footer />
    </>
  );
}

export default Login;
