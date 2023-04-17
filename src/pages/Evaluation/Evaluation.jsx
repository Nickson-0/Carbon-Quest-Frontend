import React, { useEffect } from 'react';
import { Grid, GridItem } from '@chakra-ui/layout';
import { useToast } from '@chakra-ui/react';
import EvaNav from 'components/Evaluation/EvaNav';

import './Evaluation.css';
import EvaMain from 'components/Evaluation/EvaMain';
import { isEmpty } from 'utils/isEmpty';
import { useNavigate } from 'react-router';

function Evalution() {
  const navigate = useNavigate();
  const toast = useToast();
  const toastIdRef = React.useRef();

  // Toast
  function addToast(status, value) {
    toastIdRef.current = toast({
      status: status,
      position: 'top',
      description: value,
    });
  }

  useEffect(() => {
    let energy = 0;
    let i = 0;
    JSON.parse(localStorage.getItem('userList')).map((item, index) => {
      if (energy < Number(item.energyProduction)) {
        energy = Number(item.energyProduction);
        i = index;
      }
    });
    addToast(
      'info',
      `Game is over. ${
        JSON.parse(localStorage.getItem('userList'))[i].username
      } generated the most energy!`
    );
    localStorage.clear();
  }, []);

  return (
    <Grid className="evaluation-gird">
      <GridItem className="evaluation-nav">
        <EvaNav />
      </GridItem>
      <GridItem className="evaluation-main">
        {!isEmpty(localStorage.getItem('powerPlantInfo')) == true ? (
          <EvaMain
            userData={JSON.parse(localStorage.getItem('powerPlantInfo'))}
          />
        ) : (
          <></>
        )}
      </GridItem>
    </Grid>
  );
}

export default Evalution;
