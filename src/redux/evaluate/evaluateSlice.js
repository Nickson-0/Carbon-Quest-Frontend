import { createSlice } from '@reduxjs/toolkit';

export const evaluateSlice = createSlice({
  name: 'evaluateSlice',
  initialState: {
    evaluate: [],
    error: 'This is the PowerPlants info ERROR!',
  },
  reducers: {
    actionEvaluate: (state, action) => {
      localStorage.setItem('powerPlantInfo', JSON.stringify(action.payload));
      state.evaluate = action.payload;
    },
  },
});

export default evaluateSlice.reducer;

export const { actionEvaluate } = evaluateSlice.actions;

export const dispatchInfo = (data) => (dispatch) => {
  dispatch(actionEvaluate(data));
};
