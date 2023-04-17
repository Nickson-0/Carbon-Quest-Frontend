import { configureStore } from '@reduxjs/toolkit';

import homeReducer from 'redux/home/homeSlice';
import marketReducer from 'redux/marketPlace/marketSlice';
import changeReducer from './change/changeSlice';
import evaluateReducer from './evaluate/evaluateSlice';

export default configureStore({
  reducer: {
    homeSlice: homeReducer,
    marketSlice: marketReducer,
    changeSlice: changeReducer,
    evaluateSlice: evaluateReducer,
  },
});
