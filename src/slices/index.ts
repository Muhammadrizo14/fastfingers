import { configureStore } from '@reduxjs/toolkit';
import customWordsSlice from "./customWordsSlice";

export const store  = configureStore({
  reducer: {
    words: customWordsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>



