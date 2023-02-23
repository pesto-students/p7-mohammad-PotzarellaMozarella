import { configureStore } from '@reduxjs/toolkit';
import switchReducer from './switchReducer';

export const store = configureStore({
   reducer: {
      light: switchReducer
   }
});