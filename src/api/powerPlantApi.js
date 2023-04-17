import axios from 'axios';

const getPowerPlantById = (id) => {
  return axios.get('https://carbonquest.herokuapp.com/powerPlants/' + id);
};

export default {
  getPowerPlantById,
};
