import { createSlice } from '@reduxjs/toolkit';

const sessionSlice = createSlice({
  name: 'session',
  initialState: { isJoinSession: false },
  reducers: {
    setIsJoinSession: (state, action) => {
      state.isJoinSession = action.payload;
    },
  },
});

export const { setIsJoinSession } = sessionSlice.actions;
export default sessionSlice.reducer;
