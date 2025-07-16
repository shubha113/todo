import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import Task from "../models/Task.js";
import User from "../models/User.js";
import ErrorHandler from "../utils/errorHandler.js";

//controller to create task
export const createTask = catchAsyncError(async (req, res, next) => {
  const { title, description } = req.body;

  //will show error if user will not pass all the fields
  if (!title || !description) {
    return next(new ErrorHandler("Please enter all the fields", 400));
  }

  //now will create task in db
  const task = await Task.create({ title, description, user: req.user.id });

  //send response to the user
  res.status(201).json({
    success: true,
    message: "Task created successfully",
    task,
  });
});

//get all tasks
export const getAllTasks = catchAsyncError(async (req, res, next) => {
  //find the tasks accosiated with a particular user
  const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });

  //will send response to the user
  res.status(200).json({
    success: true,
    tasks,
    count: tasks.length,
  });
});

//get task by id
export const getTaskById = catchAsyncError(async (req, res, next) => {
  //find the particular taks accosiated with a particular user
  const task = await Task.findOne({ _id: req.params.id, user: req.user.id });

  //show error when task not found
  if (!task) {
    return next(new ErrorHandler("Task not found", 404));
  }

  //will send response to the user
  res.status(200).json({
    success: true,
    task,
  });
});

//update task status
export const updateTaskStatus = catchAsyncError(async (req, res, next) => {
  const { status } = req.body;

  //check if user provided the task
  if (!status) {
    return next(new ErrorHandler("Please provide status", 400));
  }

  //check if the status thta user has passed is in the enum that we defined
  if (!["pending", "in-progress", "completed"].includes(status)) {
    return next(new ErrorHandler("Invalid status", 400));
  }

  //find the particular task of the particular user, whose status user wants to update
  const task = await Task.findOne({ _id: req.params.id, user: req.user.id });

  if (!task) {
    return next(new ErrorHandler("Task not found", 404));
  }

  //assigning updated status to task
  task.status = status;
  await task.save();

  res.status(200).json({
    success: true,
    message: "Task status updated successfully",
    task,
  });
});

//delete task
export const deleteTask = catchAsyncError(async (req, res, next) => {
  const { taskId } = req.params;
  //find the task of user that he want to delete
  const task = await Task.findOne({ _id: taskId, user: req.user.id });

  if (!task) {
    return next(new ErrorHandler("Task not found", 404));
  }

  //delete the task by id
  await Task.findByIdAndDelete(taskId);

  res.status(200).json({
    success: true,
    message: "Task deleted successfully",
    taskId,
  });
});
