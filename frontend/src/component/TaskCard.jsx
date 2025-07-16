import React from "react";
import { Link } from "react-router-dom";

const TaskCard = ({ task, onDelete }) => {
  //Format date to readable format, like jul 16, 2025
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className={`task-card ${task.status}`}>
      <div className="task-header">
        <div>
          <h3 className="task-title">{task.title}</h3>
          <small style={{ color: "#666" }}>
            Created: {formatDate(task.createdAt)}
          </small>
        </div>
        {/* Status badge (e.g., pending, in-progress, completed) and will replace the "-" with empty space */}
        <span className={`task-status ${task.status}`}>
          {task.status.replace("-", " ")}
        </span>
      </div>

      <p className="task-description">{task.description}</p>
      {/* Edit and Delete buttons */}
      <div className="task-actions">
        <Link
          to={`/edit-task/${task._id}`}
          className="btn btn-primary btn-small"
        >
          Edit Status
        </Link>

        <button
          onClick={() => onDelete(task._id)}
          className="btn btn-danger btn-small"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
