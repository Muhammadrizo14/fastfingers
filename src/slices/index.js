import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice.js';

export default configureStore({
  reducer: {
    // Свойство counter будет внутри объекта общего состояния: state.counter
    counter: counterReducer,
  },
});