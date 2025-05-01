import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const mockInventoryData = [
  { id: 1, name: "Milk", quantity: 50, unit: "liters", category: "Dairy" },
  { id: 2, name: "Cheese", quantity: 20, unit: "kg", category: "Dairy" },
  { id: 3, name: "Yogurt", quantity: 30, unit: "packs", category: "Dairy" },
  { id: 4, name: "Butter", quantity: 15, unit: "kg", category: "Dairy" }
];

export const fetchInventory = createAsyncThunk(
  "inventory/fetchInventory",
  async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockInventoryData);
      }, 500);
    });
  }
);

const inventorySlice = createSlice({
  name: "inventory",
  initialState: {
    inventory: [],
    loading: false,
    error: null
  },
  reducers: {
    addItem: (state, action) => {
      state.inventory.push(action.payload);
    },
    updateItem: (state, action) => {
      const index = state.inventory.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.inventory[index] = action.payload;
      }
    },
    deleteItem: (state, action) => {
      state.inventory = state.inventory.filter((item) => item.id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInventory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchInventory.fulfilled, (state, action) => {
        state.loading = false;
        state.inventory = action.payload;
      })
      .addCase(fetchInventory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { addItem, updateItem, deleteItem } = inventorySlice.actions;
export default inventorySlice.reducer;