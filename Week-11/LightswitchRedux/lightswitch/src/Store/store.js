import { configureStore } from '@reduxjs/toolkit';
//imports reducers from switchSlice 
import switchReducer from './switchReducer';

//configures the store with reducer functions from the slice exported as switchReducer 
export const store = configureStore({
   reducer: {
      light: switchReducer
   }
});