import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/v1";

//async thunk for creating a task
export const createTask = createAsyncThunk(
  "task/create",
  async (taskData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/task/create`, taskData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to  create task"
      );
    }
  }
);

//async thunk for getting all thasks
export const getAllTasks = createAsyncThunk(
  "task/getAllTasks",
  async (__dirname, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/task/get`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch tasks"
      );
    }
  }
);

//async thunk to get task by id
export const getTaskById = createAsyncThunk(
  "task/getTaskById",
  async (taskId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/task/get/${taskId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch task"
      );
    }
  }
);

//async thunk for updating task status
export const updateTaskStatus = createAsyncThunk(
  "task/updateTaskStatus",
  async ({ taskId, status }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${API_URL}/task/update/${taskId}`, {
        status,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update task"
      );
    }
  }
);

//async thunk for deleting a task
export const deleteTask = createAsyncThunk(
  "task/deleteTask",
  async (taskId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URL}/task/delete/${taskId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete task"
      );
    }
  }
);

const initialState = {
  tasks: [],
  currentTask: null,
  loading: false,
  error: null,
  message: null,
  count: 0,
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
    setCurrentTask: (state, action) => {
      state.currentTask = action.payload;
    },
    clearCurrentTask: (state, action) => {
      state.currentTask = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //create task
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.unshift(action.payload.task);
        state.count += 1;
        state.message = action.payload.message;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //get all tasks
      .addCase(getAllTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload.tasks;
        state.count = action.payload.count;
      })
      .addCase(getAllTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //get task by id
      .addCase(getTaskById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTaskById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentTask = action.payload.task;
      })
      .addCase(getTaskById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //update task status
      .addCase(updateTaskStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTaskStatus.fulfilled, (state, action) => {
        const taskIndex = state.tasks.findIndex(
          (task) => task._id === action.payload.task._id
        );
        if (taskIndex !== -1) {
          state.tasks[taskIndex] = action.payload.task;
        }
        state.currentTask = action.payload.task;
        state.message = action.payload.message;
      })
      .addCase(updateTaskStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //delete task
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.filter(
          (task) => task._id !== action.payload.taskId
        );
        state.count -= 1;
        state.message = action.payload.message;
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearMessage, setCurrentTask, clearCurrentTask } =
  taskSlice.actions;
export default taskSlice.reducer;
