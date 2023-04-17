import React, { useState } from 'react';
import { socker } from 'pages/Home/Home';
import { Avatar } from '@chakra-ui/react';
import { Flex, Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';

import './RoomUser.css';

const RoomUser = ({ username, actionBtn, onClick }) => {
  return (
    <Flex
      className="container"
      p={4}
      m={(0, 0, 0, 6)}
      justifyContent="space-around"
      alignItems={'center'}
      borderRadius={'lg'}
    >
      <Avatar size={'lg'} />
      <Text fontSize={'2xl'}>{username}</Text>
      <Button
        type="button"
        p={4}
        w={100}
        onClick={onClick}
        isDisabled={
          username == JSON.parse(localStorage.getItem('userInfo')).username
            ? false
            : true
        }
      >
        {!actionBtn ? 'NOT READY' : 'READY'}
      </Button>
    </Flex>
  );
};

export default RoomUser;
