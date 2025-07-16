import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/authSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //extract auth state from redux
  const { user, loading, isAuthenticated } = useSelector((state) => state.auth);

  //function to handle logout
  const handleLogout = async () => {
    try {
      dispatch(logout()).unwrap();
      navigate("/login");
    } catch (error) {
      console.log(`Error while logout`, error);
    }
  };
  return (
    <div className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            Task Manager
          </Link>
          <nav>
            {/* Navbar links */}
            <ul className="nav-links">
              <li>
                <Link to="/">All Tasks</Link>
              </li>
              <li>
                <Link to="/add-task">Add Task</Link>
              </li>
            </ul>
          </nav>
          <div className="user-section">
            {/* Greet user if logged in */}
            {user && isAuthenticated && <span className="user-name">Welcome, {user.name}</span>}
            {/* To show login or logout based on the auth state */}
            <button
              className="logout-btn"
              onClick={handleLogout}
              disabled={loading}
            >
              {isAuthenticated
                ? loading
                  ? "Logging out..."
                  : "Logout"
                : "Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
