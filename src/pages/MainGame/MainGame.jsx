import React from 'react';
import NewFooter from 'components/Home/NewFooter/NewFooter';
import { Grid } from '@chakra-ui/layout';

import './MainGame.css';

function MainGame() {
  return (
    <Grid className="home">
      <NewFooter />
    </Grid>
  );
}

export default MainGame;
