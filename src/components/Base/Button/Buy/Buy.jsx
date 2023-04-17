import React from 'react';
import { Button } from '@chakra-ui/react';
import './Buy.css';

function Buy({ onClick }) {
  return (
    <Button className="buy-container" background={'#99EEFF'} onClick={onClick}>
      Buy
    </Button>
  );
}

export default Buy;
