import { createSlice } from '@reduxjs/toolkit';
import marketApi from 'api/marketApi';

export const marketSlice = createSlice({
  name: 'marketSlice',
  initialState: {
    powerPlants: [],
    error: 'This is the Market axios ERROR!',
  },
  reducers: {
    actionAllMarket: (state, action) => {
      state.powerPlants = action.payload.powerPlants;
    },
    getErrors: (state, action) => {
      state.error = action.payload;
    },
  },
});

export default marketSlice.reducer;

// Action creators are generated for each case reducer function
export const { actionAllMarket, getErrors } = marketSlice.actions;

// Get Api call features and dispatch to action
export const fetchAllMarket = () => (dispatch) => {
  marketApi
    .getAllMarket()
    .then((res) => {
      dispatch(actionAllMarket(res.data));
    })
    .catch((error) => {
      dispatch(getErrors(error));
    });
};
