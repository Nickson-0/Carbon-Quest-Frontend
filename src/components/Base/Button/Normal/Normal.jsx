import React from 'react';
import { Button } from '@chakra-ui/react';

import './Normal.css';

function Normal({ type, onClick, color }) {
  switch (type) {
    case 'finish':
      return ButtonShow('Finish', onClick, color);
    case 'trade':
      return ButtonShow('Trade', onClick, color);
    case 'fuel':
      return ButtonShow('Fuel', onClick, color);
    case 'accept':
      return ButtonShow('Accept', onClick, color);
    case 'reject':
      return ButtonShow('Reject', onClick, color);
    default:
      break;
  }
}

function ButtonShow(type, onClick, color) {
  return (
    <Button
      className="normal-container"
      textColor={'white'}
      onClick={onClick}
      bgColor={color === '' ? '#3388ff' : color}
    >
      {type}
    </Button>
  );
}

export default Normal;
