import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import {wordsApi} from "../services/words";
import customWordsSlice from "./customWordsSlice";

export const store  = configureStore({
  reducer: {
    // Свойство counter будет внутри объекта общего состояния: state.counter
    counter: counterReducer,
    words: customWordsSlice,
    [wordsApi.reducerPath]: wordsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(wordsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>



