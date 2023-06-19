import { createSlice } from '@reduxjs/toolkit';

//creates slice with name, initial count state as 0 and adds reducers for add/reset functionalities
const stepsSlice = createSlice({
    //sets name for the slices
    name: 'steps',

    //sets the initial state value as object with count as 0
    initialState : {count: 0},

    //addStep & resetSteps reducers that assumes default value of state (value of count: 0) if otherwise not given 
    reducers: {
      addStep: (state = {count: 0}) => {
        state.count++;
        // console.log(state.count)
      },
      resetSteps: (state = {count: 0}) => {
        state.count = 0;
        // console.log(state.count)
      }
    }
});

//exports both actions to be used by Steps component onClick
export const {addStep, resetSteps} = stepsSlice.actions;

//exports reducers to be used by store
export default stepsSlice.reducer;
