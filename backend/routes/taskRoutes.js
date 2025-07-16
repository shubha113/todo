import express from 'express';
import { createTask, deleteTask, getAllTasks, getTaskById, updateTaskStatus } from '../controllers/taskController.js';
import { isAuthenticated } from '../middlewares/auth.js';

// Create a router object to handle task-related routes separately
const router = express.Router();

//to create task
router.post('/create', isAuthenticated, createTask)
//to get all tasks
router.get('/get', isAuthenticated, getAllTasks)
//to get task by id
router.get('/get/:id', isAuthenticated, getTaskById)
//to update the task status
router.patch('/update/:id', isAuthenticated, updateTaskStatus)
//to delete the task
router.delete('/delete/:taskId', isAuthenticated, deleteTask)

export default router;