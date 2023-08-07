import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: { id: null, name: '아직로그인안했는데이름', isLogin: false },
  reducers: {
    loginAccount(state, action) {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.isLogin = true;
    },
    logoutAccount(state) {
      state.id = null;
      state.name = null;
      state.isLogin = false;
    },
  },
});

export const { loginAccount, logoutAccount } = userSlice.actions;
export default userSlice.reducer;
