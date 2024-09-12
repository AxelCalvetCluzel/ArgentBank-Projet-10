import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

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

// Action pour récupérer les informations utilisateur
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

// Action pour mettre à jour les informations utilisateur !
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
