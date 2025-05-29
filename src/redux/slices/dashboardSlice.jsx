import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '@/services/api';
import { DASHBOARD_ENDPOINTS, ERROR_MESSAGES, CACHE_DURATION } from '../../constants';

const initialState = {
  data: null,
  isLoading: false,
  error: null,
  lastFetchTime: null,
  ordersOverview: null,
  salesGraph: null,
};

export const fetchDashboardData = createAsyncThunk(
  'dashboard/fetchData',
  async (timeRange = 'week', { rejectWithValue }) => {
    try {
      const summaryRes = await api.get('/api/v1/dashboard/summary', {
        params: { time_range: timeRange },
      });

      if (!summaryRes?.data) {
        throw new Error('Invalid response from server');
      }

      return {
        summary: summaryRes.data,
        ordersOverview: summaryRes.data.order_metrics,
        salesGraph: summaryRes.data.financial_metrics,
      };
    } catch (error) {
      console.error('Dashboard data fetch error:', error);
      return rejectWithValue(
        error.response?.data?.message || ERROR_MESSAGES.FETCH_FAILED
      );
    }
  },
  {
    condition: (_, { getState }) => {
      const { dashboard } = getState();
      const now = Date.now();
      // Only fetch if no data or last fetch was more than cache duration
      if (!dashboard.lastFetchTime || now - dashboard.lastFetchTime >= CACHE_DURATION.DASHBOARD) {
        return true;
      }
      return false;
    },
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    clearDashboardData: (state) => {
      state.data = null;
      state.error = null;
      state.lastFetchTime = null;
      state.ordersOverview = null;
      state.salesGraph = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.summary;
        state.ordersOverview = action.payload.ordersOverview;
        state.salesGraph = action.payload.salesGraph;
        state.lastFetchTime = Date.now();
        state.error = null;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || ERROR_MESSAGES.FETCH_FAILED;
      });
  },
});

export const { clearDashboardData } = dashboardSlice.actions;

export const selectDashboardData = (state) => state.dashboard.data;
export const selectDashboardLoading = (state) => state.dashboard.isLoading;
export const selectDashboardError = (state) => state.dashboard.error;
export const selectOrdersOverview = (state) => state.dashboard.ordersOverview;
export const selectSalesGraph = (state) => state.dashboard.salesGraph;

export default dashboardSlice.reducer; 