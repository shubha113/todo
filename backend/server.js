import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js'
import taskRoutes from './routes/taskRoutes.js'
import cors from 'cors';
import connectDatabase from './config/db.js';
import ErrorMiddleware from './middlewares/error.js'

//load env variables
dotenv.config();

//connect to database
connectDatabase();
const app = express();

//cors middleware, to give the access to the frontend
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));

//middleware to parse the incoming data
app.use(express.json());

//middleware to parse cookie
app.use(cookieParser());

//routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/task', taskRoutes);


// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.use(ErrorMiddleware);