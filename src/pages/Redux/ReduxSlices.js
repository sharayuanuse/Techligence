import { createSlice } from '@reduxjs/toolkit';

import { setItemWithExpiry, getItemWithExpiry } from '../../utils/utils.js';


const initialState = {
  user: getItemWithExpiry('userInfo') ? getItemWithExpiry('userInfo') : null,
};

const authSlice = createSlice({
  name: 'authenticate',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      setItemWithExpiry('userInfo', action.payload, 3600000);
    },
    clearUser: (state) => {
      state.user = null;
      localStorage.removeItem('userInfo')
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export const selectState = (state) => {
  return state.auth.user;
}
export default authSlice.reducer;
