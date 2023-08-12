import { createSlice } from '@reduxjs/toolkit';
// import { current } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: { isLogin: false },
  reducers: {
    userLogin: (state) => {
      state.isLogin = true;
    },
    userLogout: (state) => {
      state.isLogin = false;
    },
  },
});

export const { userLogin, userLogout } = userSlice.actions;
export default userSlice.reducer;
