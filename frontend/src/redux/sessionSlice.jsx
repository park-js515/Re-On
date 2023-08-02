import { createSlice } from '@reduxjs/toolkit';

const sessionSlice = createSlice({
  name: 'session',
  initialState: { sessionStarted: false },
  reducers: {
    setSessionStarted: (state, action) => {
      state.sessionStarted = action.payload;
    },
  },
});

export const { setSessionStarted } = sessionSlice.actions;
export default sessionSlice.reducer;
