import { configureStore } from '@reduxjs/toolkit';
import switchReducer from './switch';

export const store = configureStore({
   reducer: {
      light: switchReducer
   }
});