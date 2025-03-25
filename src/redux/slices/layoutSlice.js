import { createSlice } from '@reduxjs/toolkit';

const layoutSlice = createSlice({
  name: 'layout',
  initialState: {
    activePage: 'dashboard',
    isSidebarVisible: true,
    darkMode: false
  },
  reducers: {
    setActivePage: (state, action) => {
      state.activePage = action.payload;
    },
    toggleSidebar: (state) => {
      state.isSidebarVisible = !state.isSidebarVisible;
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    }
  }
});

export const { setActivePage, toggleSidebar, toggleDarkMode } = layoutSlice.actions;
export default layoutSlice.reducer;