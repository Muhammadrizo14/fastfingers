import { configureStore } from '@reduxjs/toolkit';
import customWordsSlice from "./customWordsSlice";

export const store  = configureStore({
  reducer: {
    // Свойство counter будет внутри объекта общего состояния: state.counter
    words: customWordsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>



