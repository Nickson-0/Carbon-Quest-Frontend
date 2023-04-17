import React from 'react';
import { Box } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';

import './Source.css';
import imageSrc1 from '../../../png/euro.png';
import imageSrc2 from '../../../png/flash.png';
import imageSrc3 from '../../../png/cloud-computing.png';

function Source({ mark, type }) {
  switch (type) {
    case 'money':
      return SourceShow(mark, imageSrc1, '#99eeff');
    case 'energyProduction':
      return SourceShow(mark, imageSrc2, '#99eeff');
    case 'co2Production':
      return SourceShow(mark, imageSrc3, '#ff99b6');
    default:
      return <></>;
  }
}

function SourceShow(mark, imageUrl, backgroundColor) {
  return (
    <Box className="source-color" sx={{ background: backgroundColor }}>
      <span className="source-color-span" style={{ fontSize: '24px' }}>
        {mark}
      </span>

      <div style={{ width: '30%', float: 'left', margin: 'auto' }}>
        <Image className="source-image" src={imageUrl} />
      </div>
    </Box>
  );
}

export default Source;
