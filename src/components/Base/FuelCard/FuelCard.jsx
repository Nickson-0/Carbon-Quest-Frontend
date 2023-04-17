import React, { useState } from 'react';
import { Box } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router';
import Item from 'components/Base/Item';
import IndustrialAvatar from '../IndustrialAvatar';
import State from '../State/State';
import FuelInput from '../FuelInput';
import Fuel from '../Button/Fuel';
import powerPlantUpdate from 'api/plantBuyApi';

import './FuelCard.css';
import { isEmpty } from 'utils/isEmpty';

function FuelCard({ fuelStations, index }) {
  const toast = useToast();
  const toastIdRef = React.useRef();
  const navigate = useNavigate();

  function addToast(status, value) {
    toastIdRef.current = toast({
      status: status,
      position: 'top',
      duration: 2000,
      description: value,
    });
  }

  const resourceType = (type) => {
    let name;
    switch (type) {
      case 'coal':
        name = fuelStations.nonRenewable.coal;
        break;
      case 'uranium':
        name = fuelStations.nonRenewable.uranium;
        break;
      case 'solar':
        name = fuelStations.renewable.solar;
        break;
      case 'geoThermal':
        name = fuelStations.renewable.geoThermal;
        break;
      case 'hydro':
        name = fuelStations.renewable.hydro;
        break;
      case 'wind':
        name = fuelStations.renewable.wind;
        break;
      case 'gas':
        name = fuelStations.nonRenewable.gas;
        break;
      case 'oil':
        name = fuelStations.nonRenewable.oil;
        break;
      default:
        break;
    }
    return name;
  };

  const onSubmit = () => {
    if (resourceType(fuelStations.type) > 0) {
      const data = {
        userId: JSON.parse(localStorage.getItem('userInfo'))._id,
        powerPlantId: JSON.parse(localStorage.getItem('powerPlantInfo'))[index]
          .id,
        countValue: fuelStations.count,
      };
      powerPlantUpdate
        .powerPlantUpdate(data)
        .then((res) => {
          if (res.status === 200) {
            addToast('success', res.data.message);
            setTimeout(() => {
              navigate(-1);
            }, 1000);
          }
        })
        .catch((err) => {
          addToast('error', err.response.data.message);
        });
    } else {
      addToast('error', 'Not enough Fuel Count');
    }
  };

  return (
    <Box className="Fuel-container1">
      <Box style={{ flexGrow: '1' }}></Box>
      <Box style={{ flexGrow: '1' }}>
        <IndustrialAvatar type={fuelStations.type} />
      </Box>
      <Box style={{ flexGrow: '2' }}>
        <State
          count={fuelStations.count}
          mark={fuelStations.energyProduction}
          type={'energyProduction'}
        ></State>
        {fuelStations.co2Production === 0 ? (
          <></>
        ) : (
          <State
            count={fuelStations.count}
            mark={fuelStations.co2Production}
            type={'co2Production'}
          ></State>
        )}
      </Box>
      <Box
        style={{
          flexGrow: '2',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'end',
        }}
      >
        <Item
          type={fuelStations.type}
          value={resourceType(fuelStations.type)}
        ></Item>
        <span style={{ marginTop: '5px', color: 'black' }}>Fuel type</span>
      </Box>
      <Box style={{ flexGrow: '3', marginLeft: '10px' }}>
        <span style={{ color: 'black' }}>
          {fuelStations.fuelAmount} per Power Plant
        </span>
      </Box>
      <Box
        style={{
          flexGrow: '3',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Fuel onClick={onSubmit} />
      </Box>
      <Box
        style={{
          flexGrow: '4',
        }}
      ></Box>
    </Box>
  );
}

export default FuelCard;
