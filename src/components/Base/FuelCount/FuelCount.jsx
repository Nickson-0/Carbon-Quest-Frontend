import React from 'react';
import { Box } from '@chakra-ui/react';
import './FuelCount.css';

function FuelCount({ count }) {
  return (
    <Box className="fuelCount-container" sx={{ background: '#99EEFF' }}>
      <span className="fuelCount-span">{count} </span>
    </Box>
  );
}

export default FuelCount;
