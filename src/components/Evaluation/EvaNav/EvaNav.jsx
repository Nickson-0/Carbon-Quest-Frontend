import React, { useState } from 'react';
import { VStack, Box } from '@chakra-ui/layout';
import Avatar from 'components/Base/Avatar';
import manUrl from '../../../png/1.png';
import manUrl1 from '../../../png/7.png';
import womanUrl from '../../../png/23.png';
import womanUrl1 from '../../../png/12.png';
import womanUrl2 from '../../../png/10.png';

import './EvaNav.css';

function EvaNav() {
  const [url, setUrl] = useState([
    manUrl,
    manUrl1,
    womanUrl,
    womanUrl1,
    womanUrl2,
  ]);
  return (
    <VStack spacing={2} align="center">
      <Box style={{ height: '200px' }}>
        <Avatar
          fileUrl={url[JSON.parse(localStorage.getItem('userInfo')).avatar]}
          point={{ x: 7.5, y: 31 }}
        />
      </Box>
      <Box className="evaluation-item">Resources</Box>
      <Box className="evaluation-item">Energy Output</Box>
      <Box className="evaluation-item">Resources used</Box>
      <Box className="evaluation-item">CO2 produced</Box>
    </VStack>
  );
}

export default EvaNav;
