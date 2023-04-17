import React, { useEffect, useState, useRef } from 'react';
import { Box } from '@chakra-ui/react';
import { useNavigate } from 'react-router';
import { Image, Stack } from '@chakra-ui/react';
import imageurl from '../../../png/coal-powerplant.png';
import imageur2 from '../../../png/electric-dam.png';
import imageur3 from '../../../png/gas-rig.png';
import imageur4 from '../../../png/geo-turbine.png';
import imageur5 from '../../../png/solar-panel.png';
import imageur6 from '../../../png/oil-rig.png';
import imageur7 from '../../../png/nuclear-plant.png';
import imageur8 from '../../../png/wind-turbine.png';

import './NewFooter.css';
import State from 'components/Base/State/State';
import Normal from 'components/Base/Button/Normal';
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from '@chakra-ui/react';
import { isEmpty } from 'utils/isEmpty';
import { dispatchInfo } from 'redux/evaluate/evaluateSlice';
import powerPlantApi from 'api/powerPlantApi';

function NewFooter() {
  const toast = useToast();
  const toastIdRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const powerPlants = useSelector(
    (state) => state.homeSlice.sender.powerPlants
  );
  const [plantValues, setPlantValues] = useState([]);

  function addToast(status, value) {
    toastIdRef.current = toast({
      status: status,
      position: 'top',
      description: value,
    });
  }
  function plant(plants) {
    let plantTemp = [];
    plants.map((power, index) => {
      const temp = {};
      switch (power.fuelType) {
        case 'oil':
          temp.avatarUrl = imageur6;
          break;
        case 'coal':
          temp.avatarUrl = imageurl;
          break;
        case 'gas':
          temp.avatarUrl = imageur3;
          break;
        case 'uranium':
          temp.avatarUrl = imageur7;
          break;
        case 'solar':
          temp.avatarUrl = imageur5;
          break;
        case 'geoThermal':
          temp.avatarUrl = imageur4;
          break;
        case 'hydro':
          temp.avatarUrl = imageur2;
          break;
        case 'wind':
          temp.avatarUrl = imageur8;
          break;
        default:
          break;
      }
      temp.energyProduction = power.energyProduction;
      temp.co2Production = power.co2Production;
      temp.count = powerPlants[index].count;
      temp.type = power.fuelType;
      temp.fuelAmount = power.fuelAmount;
      temp.id = power._id;
      temp.nonRenewable = JSON.parse(
        localStorage.getItem('userInfo')
      ).resources.nonRenewable;
      temp.renewable = JSON.parse(
        localStorage.getItem('userInfo')
      ).resources.renewable;
      plantTemp.push(temp);
    });
    setPlantValues(plantTemp);
  }

  useEffect(() => {
    let ids = [];
    let results = [];
    if (!isEmpty(powerPlants)) {
      powerPlants.map((powerPlant) => {
        ids.push(powerPlant.powerPlant_id);
      });

      Promise.all(
        ids.map((id) => {
          return powerPlantApi.getPowerPlantById(id);
        })
      ).then((newArray) => {
        newArray.map((item) => {
          results.push(item.data.powerPlant);
        });
        return plant(results);
      });
    }
  }, [powerPlants]);

  useEffect(() => {
    if (!isEmpty(plantValues)) {
      dispatch(dispatchInfo(plantValues));
    }
  }, [plantValues]);

  return (
    <Stack spacing={'20px'} direction="row">
      <Box className="home-footer1">
        <i
          className="fa fa-users home-footer-avatar1"
          onClick={() => {
            if (isEmpty(JSON.parse(localStorage.getItem('recipient')))) {
              addToast('error', 'Select the user for Trade');
            } else if (
              JSON.parse(localStorage.getItem('userInfo'))._id ==
              JSON.parse(localStorage.getItem('recipient')).id
            ) {
              addToast('error', 'Cannot trade with self');
            } else {
              navigate('/trading_screen');
            }
          }}
        />
        <i
          className="fa fa-shopping-bag home-footer-avatar2"
          onClick={() => {
            navigate('/market_place');
          }}
        />
      </Box>
      <Box
        className="home-footer2"
        style={{
          padding: '4rem',
          gap: '15rem',
          overflowX: 'auto',
          overflowY: 'hidden',
          display: 'flex',
        }}
      >
        {plantValues.map((plantValue, index) => {
          return (
            <Box
              key={index}
              style={{ display: 'flex', alignSelf: 'center', gap: '0.5rem' }}
            >
              <Image
                className="home-footer-image"
                src={plantValue.avatarUrl}
                style={{ position: 'unset' }}
              />
              <Box
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignSelf: 'center',
                }}
              >
                <State
                  count={plantValue.count}
                  mark={plantValue.energyProduction}
                  type={'energyProduction'}
                ></State>
                {plantValue.co2Production === 0 ? (
                  <></>
                ) : (
                  <State
                    count={plantValue.count}
                    mark={plantValue.co2Production}
                    type={'co2Production'}
                  ></State>
                )}
              </Box>
            </Box>
          );
        })}
        <Box display={'flex'} margin={'auto'}>
          <Normal
            color={''}
            type={'fuel'}
            onClick={() => {
              navigate('/fueling_station');
            }}
          ></Normal>
        </Box>
      </Box>
    </Stack>
  );
}

export default NewFooter;
