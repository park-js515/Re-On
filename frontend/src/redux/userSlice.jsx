import { createSlice } from '@reduxjs/toolkit';
// import { current } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: { accessToken: '' },
  reducers: {
    userLogin: (state, action) => {
      state.accessToken = action.payload.accessToken;
    },
    userLogout: (state) => {
      state.accessToken = '';
    },
    userAcessToken: (state) => {
      return state.user.accessToken;
    },
  },
});

export const { userLogin, userLogout, userAcessToken } = userSlice.actions;
export default userSlice.reducer;
