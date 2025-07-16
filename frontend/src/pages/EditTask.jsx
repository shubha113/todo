import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getTaskById,
  updateTaskStatus,
  clearError,
  clearMessage,
  clearCurrentTask,
} from "../redux/slices/taskSlice.js";

const EditTask = () => {
  //useState to get the status of the task
  const [status, setStatus] = useState("");

  //get task id from route params
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Extract task-related state from Redux store
  const { currentTask, loading, message } = useSelector((state) => state.tasks);

  //To fetch the task on which user clicked Edit, and to perform cleanup
  useEffect(() => {
    if (id) {
      dispatch(getTaskById(id));
    }
    return () => {
      dispatch(clearError());
      dispatch(clearMessage());
      dispatch(clearCurrentTask());
    };
  }, [dispatch, id]);

  // To set the current status in the options field
  useEffect(() => {
    if (currentTask) {
      setStatus(currentTask.status);
    }
  }, [currentTask]);

  //To handle handle submit and update the status by dispatching the async action thunk
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateTaskStatus({ taskId: id, status })).unwrap();
      navigate("/");
    } catch (error) {
      console.error("Update task error:", error);
    }
  };

  // Dropdown options for task status
  const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "in-progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
  ];

  // Show loading spinner while task is being fetched
  if (loading && !currentTask) {
    return (
      <div className="container">
        <div className="spinner"></div>
      </div>
    );
  }

  //show error if no task is found with given id
  if (!currentTask) {
    return (
      <div className="container">
        <div className="card">
          <div className="alert alert-error">Task not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h1 className="card-title">Edit Task Status</h1>
        </div>

        {/*To see success message */}
        {message && <div className="alert alert-success">{message}</div>}

        {/*Task details */}
        <div className="task-details" style={{ marginBottom: "2rem" }}>
          <h3 style={{ color: "#2c3e50", marginBottom: "1rem" }}>
            {currentTask.title}
          </h3>
          <p style={{ color: "#555", marginBottom: "1rem" }}>
            {currentTask.description}
          </p>
          <div className="task-info">
            <span style={{ color: "#666" }}>
              Created: {new Date(currentTask.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
        {/* Form to update task status */}
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="status" className="form-label">
              Task Status
            </label>
            <select
              id="status"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="form-select"
              required
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <div style={{ display: "flex", gap: "1rem" }}>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Status"}
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

export default EditTask;
