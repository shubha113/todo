import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  clearError,
  clearMessage,
  registerUser,
} from "../redux/slices/authSlice";

const Register = () => {
  //Local state to manage form inputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //To get the relevant auth state from redux store
  const { loading, message, isAuthenticated } = useSelector(
    (state) => state.auth
  );

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

  //To handle submit and send register credentials
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(registerUser(formData)).unwrap();
      navigate("/login");
    } catch (error) {
      console.log("Error in register", error);
    }
  };
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Create Account</h2>

        {/*To show success message*/}
        {message && <div className="alert alert-success">{message}</div>}

        {/*Register form */}
        <form className="form" autoComplete="off">
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your name"
              required
            />
          </div>

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
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="auth-switch">
          <p>
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
