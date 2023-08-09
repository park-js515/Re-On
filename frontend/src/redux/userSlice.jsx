import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: { accessToken: '', refreshToken: '' },
  reducers: {
    userLogin: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    userLogout: (state) => {
      state.accessToken = '';
      state.accessToken = '';
    },
  },
});

export const { userLogin, userLogout } = userSlice.actions;
export default userSlice.reducer;
