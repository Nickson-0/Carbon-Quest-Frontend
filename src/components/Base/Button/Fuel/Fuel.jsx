import React from 'react';
import { Button } from '@chakra-ui/react';
import './Fuel.css';

function Fuel({ onClick }) {
  return (
    <Button className="fuel-container" onClick={onClick}>
      Fuel
    </Button>
  );
}

export default Fuel;
