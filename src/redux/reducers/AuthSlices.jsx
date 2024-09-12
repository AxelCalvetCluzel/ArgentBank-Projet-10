
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const backendURL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001';

const initialState = {
  userInfo: JSON.parse(localStorage.getItem('userInfo')) || null,
  userToken: localStorage.getItem('userToken') || null,
  loading: false,
  error: null,
  success: false,
};

export const loginUser = createAsyncThunk(
  'auth/loginUser',
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

      localStorage.setItem('userInfo', JSON.stringify(userInfoResponse.data.body));

      return {
        token,
        userInfo: userInfoResponse.data.body
      };
    } catch (error) {
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'auth/updateUserProfile',
  async (userData, { rejectWithValue, getState }) => {
    try {
      const { userToken } = getState().auth;

      if (!userToken) {
        throw new Error('User token is missing');
      }

      const response = await axios.put(
        `${backendURL}/api/v1/user/profile`,
        userData,
        { headers: { 'Authorization': `Bearer ${userToken}`, 'Content-Type': 'application/json' } }
      );

      localStorage.setItem('userInfo', JSON.stringify(response.data.body));

      return response.data.body;

    } catch (error) {
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);

export const getUserProfile = createAsyncThunk(
  'auth/getUserProfile',
  async (_, { rejectWithValue, getState }) => {
    try {
      const { userToken } = getState().auth;

      if (!userToken) {
        throw new Error('User token is missing');
      }

      const response = await axios.post(
        `${backendURL}/api/v1/user/profile`,
        {},
        { headers: { 'Authorization': `Bearer ${userToken}` } }
      );

      return response.data.body;

    } catch (error) {
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.userInfo = null;
      state.userToken = null;
      localStorage.removeItem('userToken');
      localStorage.removeItem('userInfo');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload.userInfo;
        state.userToken = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        localStorage.removeItem('userToken');
        localStorage.removeItem('userInfo');
      })
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.userToken = null;
        localStorage.removeItem('userToken');
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logoutUser } = authSlice.actions;
export const selectUserInfo = (state) => state.auth.userInfo;
export const selectIsAuth = (state) => !!state.auth.userToken;
export const selectIsLoading = (state) => state.auth.loading;
export const selectError = (state) => state.auth.error;

export default authSlice.reducer;
