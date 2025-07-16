import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearError, clearMessage } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { createTask } from "../redux/slices/taskSlice";

const AddTask = () => {
  // Form state for task title and description
  const [formData, setFormData] = useState({ title: "", description: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Extract loading and message state from Redux store
  const { loading, message } = useSelector((state) => state.tasks);

  //To perform cleanup function
  useEffect(() => {
    return () => {
      dispatch(clearError());
      dispatch(clearMessage());
    };
  }, [dispatch]);

  //Handle input field changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value, //Update by input name
    });
  };

  //Function to handle submit and to create a new task
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createTask(formData)).unwrap();
      navigate("/");
    } catch (error) {
      console.log("Error in adding task", error);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h1 className="card-title">Add New Task</h1>
        </div>
        {/*To show success message */}
        {message && <div className="alert alert-success">{message}</div>}

        {/*Input fields */}
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Task Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter task title"
              maxLength={100}
              required
            />
            <small style={{ color: "#666" }}>
              {formData.title.length}/100 characters
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Task Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter task description"
              maxLength={300}
              required
            />
            <small style={{ color: "#666" }}>
              {formData.description.length}/300 characters
            </small>
          </div>
          {/* Buttons: Create and Cancel */}
          <div className="form-group">
            <div style={{ display: "flex", gap: "1rem" }}>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Task"}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/")}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
