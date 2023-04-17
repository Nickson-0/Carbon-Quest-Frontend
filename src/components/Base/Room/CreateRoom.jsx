import React, { useState } from 'react';
import {
  Flex,
  Text,
  Input,
  Button,
  FormLabel,
  CircularProgress,
} from '@chakra-ui/react';

import './Room.css';

const CreateRoom = ({ data, setData, onClick }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [strPlaceHolder, setStrPlaceHolder] = useState('Enter the RoomID here');
  const [strPlaceHolder1, setStrPlaceHolder1] = useState(
    'Optional: Enter room password'
  );

  const roomIdChange = (value) => {
    setData({ ...data, roomId: value });
  };

  const passwordChange = (value) => {
    setData({ ...data, password: value });
  };

  return (
    <Flex flexDirection={'column'}>
      <Flex w="40%" flexDirection="column" p={8} alignSelf="end">
        <form>
          <FormLabel>
            <Text fontSize={'4xl'}>Create New Room</Text>
          </FormLabel>
          <Input
            onFocus={() => {
              setStrPlaceHolder('');
            }}
            onBlur={() => {
              setStrPlaceHolder('Enter the RoomID here');
            }}
            placeholder={strPlaceHolder}
            type="RoomId"
            variant="filled"
            required
            mb={3}
            value={data.roomId}
            onChange={(e) => roomIdChange(e.currentTarget.value)}
          />
          <FormLabel>
            <Text>Add password to keep it exclusive</Text>
          </FormLabel>
          <Input
            onFocus={() => {
              setStrPlaceHolder1('');
            }}
            onBlur={() => {
              setStrPlaceHolder1('Optional: Enter room password');
            }}
            placeholder={strPlaceHolder1}
            type="Password"
            variant="filled"
            mb={3}
            value={data.password}
            onChange={(e) => passwordChange(e.currentTarget.value)}
          />
          <Button colorScheme="teal" mb={8} type="button" onClick={onClick}>
            {isLoading ? (
              <CircularProgress isIndeterminate size="24px" color="teal" />
            ) : (
              'Create'
            )}
          </Button>
        </form>
      </Flex>
    </Flex>
  );
};

export default CreateRoom;
