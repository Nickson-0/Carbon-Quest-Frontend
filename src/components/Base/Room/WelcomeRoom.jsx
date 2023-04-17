import React from 'react';
import { Flex, Text } from '@chakra-ui/layout';

const WelcomeRoom = ({ username }) => {
  return (
    <Flex m={'8'}>
      <Text fontSize={'xl'}>Welcome {username} </Text>
    </Flex>
  );
};

export default WelcomeRoom;
