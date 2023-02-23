import { createSlice } from '@reduxjs/toolkit';

const initialStateValue = {
   active: true
}

const switchSlice = createSlice({
    name: 'light',
    initialState: initialStateValue,
    reducers: {
      toggleOn: (state = initialStateValue) => {
        state.active = true;
      },
      toggleOff: (state = initialStateValue) => {
        state.active = false;
      }
    }
});

export const {toggleOn, toggleOff} = switchSlice.actions;
export default switchSlice.reducer;
