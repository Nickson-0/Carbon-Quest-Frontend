import { createSlice } from '@reduxjs/toolkit';

export const changeSlice = createSlice({
  name: 'changeSlice',
  initialState: {
    id: '',
    urlId: '',
    error: 'This is the Home nav ERROR!',
  },
  reducers: {
    actionChangeById: (state, action) => {
      state.id = action.payload.id;
      state.urlId = action.payload.urlId;
    },
  },
});

export default changeSlice.reducer;

export const { actionChangeById } = changeSlice.actions;

export const changeById = (id) => (dispatch) => {
  dispatch(actionChangeById(id));
};
