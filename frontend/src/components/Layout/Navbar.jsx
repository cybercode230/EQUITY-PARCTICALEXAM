// src/components/Layout/Navbar.jsx
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser(); // Clears context and backend session
      navigate("/login"); // Redirect to login
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav className="bg-gray-800 text-white flex justify-between items-center px-6 py-4 sticky top-0 z-50">
      {/* Left Logo */}
      <div className="text-2xl font-bold">
        <Link to="/">Equity</Link>
      </div>

      {/* Right Links */}
      <div className="flex items-center gap-4">
        <Link to="/" className="hover:text-gray-300">Home</Link>

        {user && (
          <div className="relative">
            {/* Avatar */}
            <div
              className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center cursor-pointer font-bold"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {user.username[0].toUpperCase()}
            </div>

            {/* Dropdown */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg flex flex-col py-2">
                <p className="px-4 py-2 text-sm">Logged in as {user.username}</p>
                <button
                  className="px-4 py-2 text-left text-sm hover:bg-gray-200"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
