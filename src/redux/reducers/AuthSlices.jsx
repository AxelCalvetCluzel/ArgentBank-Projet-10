import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const backendURL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001';

// Action pour se connecter
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${backendURL}/api/v1/user/login`,
        { email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      const token = response.data.body.token;
      localStorage.setItem('userToken', token);

      const userInfoResponse = await axios.post(
        `${backendURL}/api/v1/user/profile`,
        {},
        { headers: { 'Authorization': `Bearer ${token}` } }
      );

      return {
        token,
        userInfo: userInfoResponse.data.body
      };
    } catch (error) {
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);

// État initial
const initialState = {
  loading: false,
  userInfo: JSON.parse(localStorage.getItem('userInfo')) || null,
  userToken: localStorage.getItem('userToken') || null,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.userInfo = null;
      state.userToken = null;
      localStorage.removeItem('userToken');
      localStorage.removeItem('userInfo');
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userToken = action.payload.token;
        state.userInfo = action.payload.userInfo;
        state.success = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  }
});

export const { logoutUser } = authSlice.actions;

export const selectIsAuth = (state) => !!state.auth.userToken;
export const selectIsLoading = (state) => state.auth.loading;
export const selectError = (state) => state.auth.error;
export const selectUserInfo = (state) => state.auth.userInfo;

export default authSlice.reducer;
