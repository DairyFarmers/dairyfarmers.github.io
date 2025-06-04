import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '@/services/api';
import { AUTH_ENDPOINTS } from '@/constants/endpoints';
import { toast } from 'sonner';

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
};

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post(AUTH_ENDPOINTS.LOGIN, credentials, {
        withCredentials: true
      });
      
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Login failed - please try again'
      );
    }
  }
);

export const verifyToken = createAsyncThunk(
  'user/verifyToken',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(AUTH_ENDPOINTS.VERIFY_TOKEN);
      
      if (!response?.status) {
        return rejectWithValue(response?.message || 'Token verification failed');
      }

      return {
        ...response.data,
        tokenChecked: true
      };
    } catch (error) {
      return rejectWithValue(error.response?.message || 'Token verification failed');
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

      if (!response?.status) {
        return rejectWithValue(response?.message || 'Logout failed');
      }

      return true;
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear the state even if the API call fails
      return true;
    }
  }
);

export const verifyEmail = createAsyncThunk(
  'user/verifyEmail',
  async ({ passcode }, { rejectWithValue }) => {
    try {
      const response = await api.post(AUTH_ENDPOINTS.VERIFY_EMAIL, { 
         passcode
      });
      
      if (!response?.status) {
        return rejectWithValue(response?.data?.message || 'Email verification failed');
      }
      
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.message || 
        'Email verification failed - please try again'
      );
    }
  }
);

export const sendOTP = createAsyncThunk(
  'user/sendOTP',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(AUTH_ENDPOINTS.SEND_OTP);
      
      if (!response?.status) {
        return rejectWithValue(response?.message || 'Failed to send OTP');
      }
      
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.message || 
        'Failed to send verification code'
      );
    }
  }
);

export const requestPasswordReset = createAsyncThunk(
  'user/requestPasswordReset',
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await api.post(
        AUTH_ENDPOINTS.FORGOT_PASSWORD_REQUEST, 
        { email }
      );
      
      if (!response?.status) {
        return rejectWithValue('Failed to process request');
      }
      
      return response.data;
    } catch (error) {
      return rejectWithValue(
        'Something went wrong. Please try again.'
      );
    }
  }
);

export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async ({ uid, token, password }, { rejectWithValue }) => {
    try {
      const response = await api.post(
        AUTH_ENDPOINTS.RESET_PASSWORD, 
      {
        uid,
        token,
        password
      });
      
      if (!response?.status) {
        return rejectWithValue('Password reset failed');
      }
      
      return response.data;
    } catch (error) {
      return rejectWithValue(
        'Failed to reset password. Please try again.'
      );
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
        state.loading = false;
        state.isLoggedIn = true;
        state.user_id = id;
        state.email = email;
        state.full_name = full_name;
        state.role = role.name;
        state.permissions = role.permissions;
        state.is_verified = is_verified;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Login failed';
        state.isLoggedIn = false;
      })
      // Token verification cases
      .addCase(verifyToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyToken.fulfilled, (state, action) => {
        const { id, email, full_name, is_verified, role } = action.payload;
        state.isLoggedIn = true;
        state.user_id = id;
        state.email = email;
        state.full_name = full_name;
        state.is_verified = is_verified;
        state.role = role.name;
        state.permissions = role.permissions;
        state.loading = false;
        state.error = null;
      })
      .addCase(verifyToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isLoggedIn = false;
      })
      // Logout cases
      .addCase(logoutUser.fulfilled, (state) => {
        return initialState;
      })
      // Email verification cases
      .addCase(verifyEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.is_verified = action.payload.is_verified;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Send OTP cases
      .addCase(sendOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.is_verified = action.payload.is_verified;
      })
      .addCase(sendOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Password reset request cases
      .addCase(requestPasswordReset.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(requestPasswordReset.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(requestPasswordReset.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Reset password cases
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      }
      )
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        toast.success(
          'Password reset successful. Please login with your new password.'
        );
      })
      .addCase(resetPassword.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to reset password';
      });
  },
});

export const { clearError } = userSlice.actions;
export default userSlice.reducer;