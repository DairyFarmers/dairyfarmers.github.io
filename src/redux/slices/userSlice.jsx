import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '@/services/api';
import { AUTH_ENDPOINTS } from '@/constants/endpoints';

const initialState = {
  user_id: null,
  email: null,
  full_name: null,
  is_verified: false,
  isLoggedIn: false,
  role: null,
  loading: false,
  error: null,
  permissions: {},
  tokenChecked: false
};

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post(AUTH_ENDPOINTS.LOGIN, credentials, {
        withCredentials: true
      });
      if (response?.status && response?.data) {
        return response.data;
      }
      return rejectWithValue(response?.message || 'Login failed');
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const verifyToken = createAsyncThunk(
  'user/verifyToken',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(AUTH_ENDPOINTS.VERIFY_TOKEN);
      if (response?.status && response?.data) {
        return response.data;
      }
      return rejectWithValue('Token verification failed');
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Token verification failed');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await api.post(AUTH_ENDPOINTS.LOGOUT, {}, {
        withCredentials: true
      });
      return true;
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear the state even if the API call fails
      return true;
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { id, email, full_name, is_verified, role } = action.payload;
        state.user_id = id;
        state.email = email;
        state.full_name = full_name;
        state.is_verified = is_verified;
        state.isLoggedIn = true;
        state.role = role.name;
        state.permissions = role.permissions;
        state.loading = false;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isLoggedIn = false;
      })
      // Token verification cases
      .addCase(verifyToken.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.tokenChecked = false;
      })
      .addCase(verifyToken.fulfilled, (state, action) => {
        const { id, email, full_name, is_verified, role } = action.payload;
        state.user_id = id;
        state.email = email;
        state.full_name = full_name;
        state.is_verified = is_verified;
        state.isLoggedIn = true;
        state.role = role.name;
        state.permissions = role.permissions;
        state.loading = false;
        state.error = null;
        state.tokenChecked = true;
      })
      .addCase(verifyToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isLoggedIn = false;
        state.tokenChecked = true;
      })
      // Logout cases
      .addCase(logoutUser.fulfilled, (state) => {
        return initialState;
      });
  },
});

export const { clearError } = userSlice.actions;
export default userSlice.reducer;