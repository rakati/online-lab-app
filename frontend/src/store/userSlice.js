// src/store/userSlice.js
import { createSlice } from '@reduxjs/toolkit';
import api from '../services/api';
import { jwtDecode } from 'jwt-decode';

const initialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isLoggedIn: false,
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLogin(state, action) {
      console.log("userSlice: log in");
      const { accessToken, refreshToken } = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.isLoggedIn = true;

      // Decode jwt to get user info
      const decoded = jwtDecode(accessToken);
      state.user = {
        username: decoded.username,
        role: decoded.role,
      };

      localStorage.setItem('access', accessToken);
      localStorage.setItem('refresh', refreshToken);
      api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    },
    setLogout(state) {
      console.log("userSlice: log out");
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isLoggedIn = false;
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
    },
    loadUserFromStorage(state) {
      console.log("loading user from storage");
      const storedAccess = localStorage.getItem('access');
      const storedRefresh = localStorage.getItem('refresh');
      if (storedAccess && storedRefresh) {
        state.accessToken = storedAccess;
        state.refreshToken = storedRefresh;
        state.isLoggedIn = true;
        // decode
        console.log("decode token to get username at loaduser func");
        const decoded = jwtDecode(storedAccess);
        state.user = {
          username: decoded.username,
          role: decoded.role,
        };
        // set axios header
        api.defaults.headers.common['Authorization'] = `Bearer ${storedAccess}`;
      }
    }
  },
});

export const { setLogin, setLogout, loadUserFromStorage } = userSlice.actions;
export default userSlice.reducer;
