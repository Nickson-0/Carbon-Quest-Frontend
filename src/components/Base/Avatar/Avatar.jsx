import React from 'react';
import { Flex, Image, Text } from '@chakra-ui/react';

import './Avatar.css';

function Avatar({ fileUrl, point, onClick, username }) {
  if (point !== undefined) {
    return (
      <Flex>
        <Image
          className="avatar-circle"
          src={fileUrl}
          style={{ top: point.x + '%', left: point.y + '%' }}
          onClick={onClick}
        />
        <Text fontSize={'lg'}>{username}</Text>
      </Flex>
    );
  }
}

export default Avatar;
