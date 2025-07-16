import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/v1";

// Axios defaults
axios.defaults.withCredentials = true;

//async thunk for register
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

//async thunk for login
export const login = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

//async thunk for logout
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/logout`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Logout failed");
    }
  }
);

// Async thunk for getting user profile
export const getUserProfile = createAsyncThunk(
  "auth/me",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/auth/me`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch profile"
      );
    }
  }
);


// Initial state
const initialState = {
    token: null,
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null,
    profileLoading: false,
    message: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        clearError: (state) =>{
            state.error = null
        },
        clearMessage: (state) =>{
            state.message = null
        },
        setAuth: (state, action) =>{
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.isAuthenticated = true;
        },
        clearAuth: (state) =>{
            state.token = null;
            state.error = null;
            state.user = null;
            state.isAuthenticated = false;
            state.loading = false
        },
    },
    extraReducers: (builder) =>{
        builder
        //register
        .addCase(registerUser.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(registerUser.fulfilled, (state, action)=>{
            state.loading = false;
            state.isAuthenticated = false;
            state.user = action.payload.user;
            state.message = action.payload.message;
        })
        .addCase(registerUser.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })

        //login
        .addCase(login.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(login.fulfilled, (state, action)=>{
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.message = action.payload.message;
        })
        .addCase(login.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
            state.isAuthenticated = false
        })

        //logout
        .addCase(logout.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(logout.fulfilled, (state, action)=>{
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.message = action.payload.message;
        })
        .addCase(logout.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })

        //profile
        .addCase(getUserProfile.pending, (state)=>{
            state.profileLoading = true;
            state.error = null;
        })
        .addCase(getUserProfile.fulfilled, (state, action)=>{
            state.profileLoading = false;
            state.user = action.payload.user;
            state.isAuthenticated = true;
        })
        .addCase(getUserProfile.rejected, (state, action)=>{
            state.profileLoading = false;
            state.error = action.payload;
            state.isAuthenticated = false;
            state.user = null
        });
    },
});

export const { clearError, clearMessage, setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;