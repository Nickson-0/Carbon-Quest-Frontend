import { usePrefersReducedMotion } from '@chakra-ui/react';
import { createSlice } from '@reduxjs/toolkit';
import userApi from 'api/userApi';
import senderApi from 'api/userApi';

export const homeSlice = createSlice({
  name: 'homeSlice',
  initialState: {
    sender: {},
    recipient: {},
    error: 'This is the Home axios ERROR!',
  },
  reducers: {
    actionSenderById: (state, action) => {
      state.sender = action.payload.user;
    },
    actionRecipientById: (state, action) => {
      state.recipient = action.payload.user;
    },
  },
});

export default homeSlice.reducer;

// Action creators are generated for each case reducer function
export const { actionSenderById, actionRecipientById, getErrors } =
  homeSlice.actions;

export const userData = (data) => (dispatch) => {
  dispatch(actionSenderById(data));
};

// Get Sender Api call features and dispatch to action
export const fetchSenderById = (id) => (dispatch) => {
  senderApi
    .getSenderById(id)
    .then((res) => {
      dispatch(actionSenderById(res.data));
    })
    .catch((error) => {});
};

// Get Recipient Api call features and dispatch to action
export const fetchRecipientById = (id) => (dispatch) => {
  senderApi
    .getRecipientById(id)
    .then((res) => {
      dispatch(actionRecipientById(res.data));
    })
    .catch((error) => {});
};

// Get Sender Api call features and dispatch to action
export const getUserByHeader = (data) => (dispatch) => {
  userApi
    .changeUserById(data)
    .then((res) => {
      localStorage.setItem('userInfo', JSON.stringify(res.data.user));
      dispatch(actionSenderById(res.data));
    })
    .catch((error) => {});
};
