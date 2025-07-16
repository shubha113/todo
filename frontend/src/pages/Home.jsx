import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllTasks,
  deleteTask,
  clearError,
  clearMessage,
} from "../redux/slices/taskSlice";
import TaskCard from "../component/TaskCard.jsx";

const Home = () => {
  const dispatch = useDispatch();
  // Extract tasks state from Redux store
  const { tasks, loading, message, count } = useSelector(
    (state) => state.tasks
  );

  useEffect(() => {
    //fetch all tasks when component mounts
    dispatch(getAllTasks());
    return () => {
      //clear error and message when component unmounts
      dispatch(clearError());
      dispatch(clearMessage());
    };
  }, [dispatch]);

  //function to delete tasks
  const handleDeleteTask = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await dispatch(deleteTask(taskId)).unwrap();
      } catch (error) {
        console.error("Delete error:", error);
      }
    }
  };

  //function to filter tasks based on their status
  const filterTasks = (status) => {
    return tasks.filter((task) => task.status === status);
  };

  // Categorize tasks based on their current status
  const pendingTasks = filterTasks("pending");
  const inProgressTasks = filterTasks("in-progress");
  const completedTasks = filterTasks("completed");

  //loading spinner while tasks are being fetched
  if (loading) {
    return (
      <div className="container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card">
        {/* Header section with task count and Add Task button */}
        <div className="card-header">
          <div>
            <h1 className="card-title">My Tasks</h1>
            <p>Total Tasks: {count}</p>
          </div>
          <Link to="/add-task" className="btn btn-primary add-new">
            Add New Task
          </Link>
        </div>

        {/*To show message */}
        {message && <div className="alert alert-success">{message}</div>}

        {/*If no task found, then will shiw this */}
        {tasks.length === 0 ? (
          <div className="empty-state">
            <h3>No tasks found</h3>
            <p>
              You haven't created any tasks yet. Start by adding your first
              task!
            </p>
          </div>
        ) : (
          <div className="tasks-container">
            {/* Pending Tasks */}
            {pendingTasks.length > 0 && (
              <div className="task-section">
                <h3 style={{ color: "#f39c12", marginBottom: "1rem" }}>
                  Pending Tasks ({pendingTasks.length})
                </h3>
                {pendingTasks.map((task) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    onDelete={handleDeleteTask}
                  />
                ))}
              </div>
            )}

            {/* In Progress Tasks */}
            {inProgressTasks.length > 0 && (
              <div className="task-section">
                <h3 style={{ color: "#3498db", marginBottom: "1rem" }}>
                  In Progress Tasks ({inProgressTasks.length})
                </h3>
                {inProgressTasks.map((task) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    onDelete={handleDeleteTask}
                  />
                ))}
              </div>
            )}

            {/* Completed Tasks */}
            {completedTasks.length > 0 && (
              <div className="task-section">
                <h3 style={{ color: "#27ae60", marginBottom: "1rem" }}>
                  Completed Tasks ({completedTasks.length})
                </h3>
                {completedTasks.map((task) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    onDelete={handleDeleteTask}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
