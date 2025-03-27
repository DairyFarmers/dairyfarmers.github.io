import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
  return [
    { id: 1, customer: "John Doe", status: "Pending", total: 120.5 },
    { id: 2, customer: "Jane Smith", status: "Completed", total: 75.3 },
    { id: 3, customer: "Alice Brown", status: "Shipped", total: 200.0 },
  ];
});

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    loading: false,
  },
  reducers: {
    addOrder: (state, action) => {
      state.orders.push(action.payload);
    },
    updateOrder: (state, action) => {
      const index = state.orders.findIndex((o) => o.id === action.payload.id);
      if (index !== -1) {
        state.orders[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
      })
      .addCase(fetchOrders.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { addOrder, updateOrder } = orderSlice.actions;
export default orderSlice.reducer;