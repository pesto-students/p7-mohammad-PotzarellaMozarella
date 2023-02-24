import { configureStore } from '@reduxjs/toolkit';
//imports reducers from stepsSlice 
import StepReducer from './stepReducer';

//configures the store with reducer functions from the slice exported as stepReducer 
export const store = configureStore({
   reducer: {
      steps: StepReducer
   }
});
