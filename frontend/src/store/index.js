// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './themeSlice';
import userReducer from './userSlice';
// import labsReducer from './labsSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    user: userReducer,
    // labs: labsReducer,
  },
});

export default store;
