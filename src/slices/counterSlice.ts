
import {createSlice, PayloadAction} from '@reduxjs/toolkit';


interface CountState {
  value: number
}

// Начальное значение
const initialState: CountState = {
  value: 0,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  // Редьюсеры в слайсах меняют состояние и ничего не возвращают
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    // Пример с данными
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

// Слайс генерирует действия, которые экспортируются отдельно
// Действия генерируются автоматически из имен ключей редьюсеров
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// По умолчанию экспортируется редьюсер, сгенерированный слайсом
export default counterSlice.reducer;