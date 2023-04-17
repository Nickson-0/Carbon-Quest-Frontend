import axios from 'axios';

const getSenderById = (data) => {
  return axios.get('https://carbonquest.herokuapp.com/user/' + data);
};

const getRecipientById = (data) => {
  return axios.get('https://carbonquest.herokuapp.com/user/' + data);
};

const changeUserById = (data) => {
  return axios.post('https://carbonquest.herokuapp.com/user/money', data);
};

const getUsersByRoomId = (id) => {
  return axios.get('https://carbonquest.herokuapp.com/user/' + id);
};
export default {
  getSenderById,
  getRecipientById,
  getUsersByRoomId,
  changeUserById,
};
