import axios from 'axios';

const powerPlantBuy = (userId, powerPlantId) => {
  return axios({
    method: 'post',
    url: 'https://carbonquest.herokuapp.com/powerPlants/buy',
    headers: {},
    data: {
      userId,
      powerPlantId,
    },
  });
  // return axios.post('http://localhost:8080/powerPlants/buy', data);
};

const powerPlantUpdate = (data) => {
  return axios.post(
    'https://carbonquest.herokuapp.com/powerPlants/update',
    data
  );
};

export default { powerPlantUpdate, powerPlantBuy };
