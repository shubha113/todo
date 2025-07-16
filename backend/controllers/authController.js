import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import User from "../models/User.js";
import ErrorHandler from "../utils/errorHandler.js";
import { sendToken } from "../utils/sendToken.js";

//controller to register user
export const registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  //if any one of the data is not provided, then will show error
  if (!name || !email || !password) {
    return next(new ErrorHandler("Please enter all the fields", 400));
  }

  //check if user already exists in the db
  const existedUser = await User.findOne({ email });

  //if user already exist, means he already has an account. So will ask him to login
  if (existedUser) {
    return next(new ErrorHandler("User already exist, please login", 400));
  }

  //will create user in the db
  const user = await User.create({ name, email, password });

  //now will send the response back to the user
  res.status(201).json({
    success: true,
    message: "User Registered successfully",
    user,
  });
});

//controller to login
export const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  //if user will not fill this data then will show error
  if (!email || !password) {
    return next(new ErrorHandler("Please enter all the fields", 401));
  }

  //trying to find user for login
  const user = await User.findOne({ email }).select("+password");

  //if we can't find user with the email then will show error
  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  //now if the email is correct then will try to compare the password
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  // to send the token when the user login for authentication
  sendToken(user, 200, res);
});

//controller to logout
export const logout = catchAsyncError(async (req, res, next) => {
  //will clear the token from the cookie
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  //now will send the response to the user
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

//controller to get user profile
export const getUserProfile = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  //if user not found with the id then will show the error
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  //will send the response to the user
  res.status(200).json({
    success: true,
    user,
  });
});
