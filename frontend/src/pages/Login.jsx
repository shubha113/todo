import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearError, clearMessage, login } from "../redux/slices/authSlice";

const Login = () => {
  // Local state to manage form inputs
  const [formData, setFormData] = useState({ email: "", password: "" });

  // To get relevant auth state from Redux store
  const { loading, isAuthenticated, message } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //To navigate user to home page, if he's authenticated and to perform cleanup
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    return () => {
      dispatch(clearError());
      dispatch(clearMessage());
    };
  }, [isAuthenticated, dispatch, navigate]);

  //To handle change in the input, and to give the value the name
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //To handle submit and send login credentials
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login(formData)).unwrap();
      navigate("/");
    } catch (error) {
      console.log(`Error while logging in ${error}`);
    }
  };
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Login</h2>

        {/* Show success message if present */}
        {message && <div className="alert alert-success">{message}</div>}

        {/* Login form */}
        <form className="form" autoComplete="off" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your email"
              required
              autoComplete="off"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your password"
              required
              autoComplete="new-password"
            />
          </div>

          {/*Button to login */}
          <button
            type="submit"
            className="btn btn-primary btn-full"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="auth-switch">
          <p>
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
