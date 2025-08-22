// src/components/Layout/Landing.jsx
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "5rem" }}>
      <h1>Welcome to Order Management</h1>
      <p>Please login or register to continue</p>
      <div style={{ marginTop: "2rem" }}>
        <Link to="/login"><button>Login</button></Link>
        <Link to="/register" style={{ marginLeft: "1rem" }}><button>Register</button></Link>
      </div>
    </div>
  );
};

export default Landing;
