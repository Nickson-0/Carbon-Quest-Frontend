import React from 'react';
import { Box } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';

import './State.css';
import imageSrc1 from '../../../png/flash.png';
import imageSrc2 from '../../../png/cloud-computing.png';

function State({ count, mark, type }) {
  switch (type) {
    case 'energyProduction':
      return StateShow(count, mark, imageSrc1, '#99eeff');
    case 'co2Production':
      return StateShow(count, mark, imageSrc2, '#ff99b6');
    default:
      return <></>;
  }
}

function StateShow(count, mark, imageUrl, backgroundColor) {
  return (
    <Box className="state-color" sx={{ background: backgroundColor }}>
      <div
        className="state"
        style={{
          display: 'flex',
          width: '100%',
          flexDirection: 'column',
        }}
      >
        <span className="state-color-span1" style={{ textAlign: 'center' }}>
          {count}@{mark}
        </span>
        <div style={{ display: 'flex' }}>
          <span className="state-color-span">{count * mark}</span>
          <div style={{ width: '30%', float: 'left', margin: 'auto' }}>
            <Image className="state-image" src={imageUrl} />
          </div>
        </div>
      </div>
    </Box>
  );
}

export default State;
