// src/components/Auth/Register.jsx
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Register = () => {
  const { registerUser } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer"); // default role

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser({ username, email, password, role });
      alert("Registered successfully!");
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
      
      <select value={role} onChange={e => setRole(e.target.value)}>
        <option value="customer">Customer</option>
        <option value="admin">Admin</option>
        <option value="manager">Manager</option>
      </select>

      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
