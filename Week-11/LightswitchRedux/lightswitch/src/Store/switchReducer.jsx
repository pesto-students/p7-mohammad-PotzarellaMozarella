import { createSlice } from '@reduxjs/toolkit';

//creates slice with name, initial status as true and adds reducers for toggle functionalities
const switchSlice = createSlice({
    //sets name for the slices
    name: 'light',

    //sets the initial state value as object with active as false for light 
    initialState: {status: false},

    //toggle Light/Dark reducers that assumes default value of state (value of status: true) if otherwise not given 
    reducers: {
      toggleLight: (state = {status: true}) => {
        state.status = false;
      },
      toggleDark: (state = {status: true}) => {
        state.status = true;
      }
    }
});

//exports both toggle actions to be used by RoomLight component onClick
export const {toggleLight, toggleDark} = switchSlice.actions;

//exports reducers to be used by store
export default switchSlice.reducer;
