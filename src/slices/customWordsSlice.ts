
import {createSlice, PayloadAction} from '@reduxjs/toolkit';


interface CountState {
  value: string[]
}

// Начальное значение
const initialState: CountState = {
  value: [],
};

const customWordsSlice = createSlice({
  name: 'words',
  initialState,
  // Редьюсеры в слайсах меняют состояние и ничего не возвращают
  reducers: {
    changeState: (state, action: PayloadAction<string[]>) => {
      state.value = action.payload;
    },
  },
});

// Слайс генерирует действия, которые экспортируются отдельно
// Действия генерируются автоматически из имен ключей редьюсеров
export const { changeState } = customWordsSlice.actions;

// По умолчанию экспортируется редьюсер, сгенерированный слайсом
export default customWordsSlice.reducer;