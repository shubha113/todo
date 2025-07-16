# TODO Application - MERN Stack

A full-stack todo application built with MongoDB, Express.js, React, and Node.js with JWT authentication.

## Features

### Backend (REST API)
- **POST /api/v1/auth/register**: Register User
- **POST /api/v1/auth/login**: Login User
- **POST /api/v1/auth/logout**: Logout User
- **GET /api/v1/auth/me**: Get Profile
- **POST /api/v1/task/create**: Create a new task
- **GET /api/v1/get**: Fetch all tasks
- **GET /api/v1/task/get/:id**: Fetch a task by ID
- **PATCH /api/v1/task/update/:id**: Update task status
- **DELETE /api/v1/task/delete/:taskId**: Delete a task
- **JWT Authentication**: Secure API endpoints

### Frontend
- **Home Page**: Display all tasks with status
- **Add Task Page**: Create new tasks
- **Edit Task Page**: Update task status
- **Responsive Design**: Works on mobile devices as well
- **State Management**: Redux Toolkit for global state
- **Protected Routes**: Authentication-based navigation

## Tech Stack

### Backend
- Node.js & Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing
- Cookie-based session management

### Frontend
- React.js with React Router
- Redux Toolkit for state management
- Axios for API calls
- CSS for styling

## Prerequisites

Before running this application, make sure you have:
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn package manager

## Installation & Setup

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd todo-app
```

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file in the root of backend with the following variables:
PORT=5000
MONGODB_URI=mongodb://localhost:27017/todoapp
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:3000
NODE_ENV=development

# Start the backend server
npm run dev
```

### 3. Frontend Setup
```bash
# Navigate to frontend directory (in a new terminal)
cd frontend

# Install dependencies
npm install

# Start the frontend development server
npm start
```

### 4. Database Setup
- Make sure MongoDB is running locally, or
- Use MongoDB Atlas and update the MONGODB_URI in your .env file

## Running the Application

1. **Start Backend Server**:
   ```bash
   cd backend
   npm run dev
   ```
   Server will run on `http://localhost:5000`

2. **Start Frontend Application**:
   ```bash
   cd frontend
   npm start
   ```
   Application will run on `http://localhost:3000`

## Project Structure

```
todo-app/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── taskController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── error.js
│   │   └── catchAsyncError.js
│   ├── models/
│   │   ├── user.js
│   │   └── task.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   ├── utils/
│   │   ├── errorHandler.js
│   │   └── sendToken.js
│   ├── config/
│   │   └── db.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   └── TaskCard.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── AddTask.jsx
│   │   │   └── EditTask.jsx
│   │   ├── redux/
│   │   │   ├── store.js
│   │   │   └── slices/
│   │   │       ├── authSlice.js
│   │   │       └── taskSlice.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
└── README.md
```

## Usage

1. **Register/Login**: Create an account or login to existing account
2. **View Tasks**: See all your tasks on the home page
3. **Add Task**: Click "Add Task" to create new tasks
4. **Edit Task**: Click on any task's edit button to edit it's status
5. **Delete Task**: Remove tasks you no longer need

## Task Status Options
- **pending**: Newly created tasks
- **in-progress**: Tasks currently being worked on
- **completed**: Finished tasks

## Testing

The application includes error handling and validation. Test the following:
- User registration and login
- Creating, reading, updating, and deleting tasks
- Authentication protection on routes
- Responsive design on different screen sizes
