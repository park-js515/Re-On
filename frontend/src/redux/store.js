import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from './sessionSlice'; // Path should be updated according to your folder structure

const store = configureStore({
  reducer: {
    session: sessionReducer,
  },
});

export default store;
