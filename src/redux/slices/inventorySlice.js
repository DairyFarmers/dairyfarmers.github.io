import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  inventory: [],
  loading: false,
  error: null
};

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    setInventory: (state, action) => {
      state.inventory = action.payload;
    },
    addItem: (state, action) => {
      state.inventory.push(action.payload);
    },
    updateItem: (state, action) => {
      const index = state.inventory.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.inventory[index] = action.payload;
      }
    },
    deleteItem: (state, action) => {
      state.inventory = state.inventory.filter(item => item.id !== action.payload);
    }
  }
});

export const { setInventory, addItem, updateItem, deleteItem } = inventorySlice.actions;
export default inventorySlice.reducer;