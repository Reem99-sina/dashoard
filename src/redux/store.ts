
import { configureStore } from '@reduxjs/toolkit';
import  StyleSide  from './style';


const store = configureStore({
  reducer: {
  style:StyleSide
  }
});
export default store