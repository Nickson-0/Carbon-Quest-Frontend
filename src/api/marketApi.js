import axios from 'axios';

const getAllMarket = () => {
  return axios.get('https://carbonquest.herokuapp.com/powerPlants/all');
};

export default {
  getAllMarket,
};
