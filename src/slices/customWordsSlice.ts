import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/**
 * Интерфейс состояния пользовательских слов
 */
interface CustomWordsState {
  /** Массив пользовательских слов */
  value: string[]
}


const initialState: CustomWordsState = {
  value: [],
};


const customWordsSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {
    /**
     * Редьюсер для изменения массива пользовательских слов
     */
    changeState: (state, action: PayloadAction<string[]>) => {
      state.value = action.payload;
    },
  },
});


export const { changeState } = customWordsSlice.actions;


export default customWordsSlice.reducer;