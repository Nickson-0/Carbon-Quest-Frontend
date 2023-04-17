import React from 'react';
import { Box, Grid, GridItem } from '@chakra-ui/layout';
import Normal from 'components/Base/Button/Normal';
import { useNavigate } from 'react-router';
import { isEmpty } from 'utils/isEmpty';

import './FuelingStation.css';
import Fuel from 'components/Base/FuelCard';

function FuelingStation() {
  const navigate = useNavigate();

  return (
    <Grid className="fueling-station">
      <GridItem className="fueling-station-main">
        {!isEmpty(localStorage.getItem('powerPlantInfo')) === true ? (
          JSON.parse(localStorage.getItem('powerPlantInfo')).map(
            (plantValue, index) => {
              return (
                <Box key={index}>
                  <Fuel fuelStations={plantValue} index={index}></Fuel>
                </Box>
              );
            }
          )
        ) : (
          <></>
        )}
      </GridItem>
      <GridItem className="fueling-station-footer">
        <Normal
          color={''}
          type={'finish'}
          onClick={() => {
            navigate(-1);
          }}
        />
      </GridItem>
    </Grid>
  );
}

export default FuelingStation;
