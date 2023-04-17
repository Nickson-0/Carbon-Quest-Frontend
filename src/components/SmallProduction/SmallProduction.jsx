import React from 'react';
import { Box } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';

import './SmallProduction.css';
import imageSrc1 from '../../png/euro.png';
import imageSrc2 from '../../png/flash.png';
import imageSrc3 from '../../png/cloud-computing.png';

function SmallProduction({ mark, type }) {
  switch (type) {
    case 'money':
      return SmallShow(mark, imageSrc1, '#99eeff');
    case 'energyProduction':
      return SmallShow(mark, imageSrc2, '#99eeff');
    case 'co2Production':
      return SmallShow(mark, imageSrc3, '#ff99b6');
    default:
      return <></>;
  }
}

function SmallShow(mark, imageUrl, backgroundColor) {
  return (
    <Box className="small-production" sx={{ background: backgroundColor }}>
      <span className="small-production-span">{mark} </span>
      <div style={{ width: '30%', float: 'left', margin: 'auto' }}>
        <Image className="small-image" src={imageUrl} />
      </div>
    </Box>
  );
}

export default SmallProduction;
