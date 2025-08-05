
import {createSlice, PayloadAction} from '@reduxjs/toolkit';


interface CountState {
  value: string[]
}

const initialState: CountState = {
  value: [],
};

const customWordsSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {
    changeState: (state, action: PayloadAction<string[]>) => {
      state.value = action.payload;
    },
  },
});

export const { changeState } = customWordsSlice.actions;

export default customWordsSlice.reducer;