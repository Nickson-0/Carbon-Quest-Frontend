import axios from 'axios';

const createUserList = (data) => {
  return axios.post('https://carbonquest.herokuapp.com/room/create', data);
};

const getUserList = (data) => {
  return axios.post('https://carbonquest.herokuapp.com/room/get', data);
};

export default {
  createUserList,
  getUserList,
};
