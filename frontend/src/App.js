import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect } from "react";
import { getUserProfile } from "./redux/slices/authSlice.js";
import Header from "./component/Header.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";
import AddTask from "./pages/AddTask.jsx";
import EditTask from "./pages/EditTask.jsx";

function App() {
  const dispatch = useDispatch();

  // Get auth state from Redux
  const { isAuthenticated, profileLoading } = useSelector((state) => state.auth);

  //To fetch logged in user's profile on component mounts
  useEffect(() => {
  dispatch(getUserProfile());
}, [dispatch]);

 //loading spinner while tasks are being fetched
  if (profileLoading) {
    return (
      <div className="container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        {/* Common header component */}
        <Header/>
        <main className="main-content">
          <Routes>
            {/* Public Route: Login */}
            <Route
              path="/login"
              element={!isAuthenticated ? <Login /> : <Navigate to="/" />}
            />
            {/* Public Route: Register */}
            <Route
              path="/register"
              element={!isAuthenticated ? <Register /> : <Navigate to="/" />}
            />
            {/* Private Route: Home (all tasks) */}
            <Route
              path="/"
              element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
            />
            {/* Private Route: Add Task */}
            <Route
              path="/add-task"
              element={isAuthenticated ? <AddTask /> : <Navigate to="/login" />}
            />
            {/* Private Route: Edit Task*/}
            <Route
              path="/edit-task/:id"
              element={
                isAuthenticated ? <EditTask /> : <Navigate to="/login" />
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
