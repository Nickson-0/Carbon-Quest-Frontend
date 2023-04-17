import React, { useState } from 'react';
import {
  Flex,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
  Switch,
  CircularProgress,
  useColorMode,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import userApi from 'api/userApi';
import { userData } from 'redux/home/homeSlice';
import { useDispatch } from 'react-redux';

import './Register.css';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const toastIdRef = React.useRef;
  const { toggleColorMode } = useColorMode();
  const [strPlaceHolder, setStrPlaceHolder] = useState('CoCo');

  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const formBackground = useColorModeValue('gray.100', 'gray.700');

  function addToast(status, value) {
    toastIdRef.current = toast({
      status: status,
      position: 'top-right',
      description: value,
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    userApi
      .getSenderById(name)
      .then((res) => {
        setIsLoading(false);
        dispatch(userData(res.data));
        localStorage.setItem('userInfo', JSON.stringify(res.data.user));
        addToast('success', res.data.user.username + ' is logged in');
        navigate('/home');
      })
      .catch((error) => {
        setIsLoading(false);
        addToast('error', 'Invalid username. Please check it');
      });
  };

  return (
    <Flex
      h="100vh"
      alignItems="center"
      justifyContent="center"
      flexDirection={'column'}
    >
      <Flex>
        <Heading mb={16}>Carbon Quest</Heading>
      </Flex>
      <Flex
        flexDirection="column"
        bg={formBackground}
        p={12}
        borderRadius={8}
        boxShadow="lg"
      >
        <form onSubmit={(e) => handleSubmit(e)}>
          <Heading mb={6}>Log In</Heading>
          <FormLabel>User name</FormLabel>
          <Input
            onFocus={() => {
              setStrPlaceHolder('');
            }}
            onBlur={() => {
              setStrPlaceHolder('CoCo');
            }}
            placeholder={strPlaceHolder}
            type="User name"
            variant="filled"
            isRequired
            mb={3}
            onChange={(e) => setName(e.currentTarget.value)}
          />
          <Button colorScheme="teal" mb={8} type="submit" width={'full'}>
            {isLoading ? (
              <CircularProgress isIndeterminate size="24px" color="teal" />
            ) : (
              'Log In'
            )}
          </Button>
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="dark_mode" mb="0">
              Enable Dark Mode?
            </FormLabel>
            <Switch
              id="dark_mode"
              colorScheme="teal"
              size="lg"
              onChange={toggleColorMode}
            />
          </FormControl>
        </form>
      </Flex>
    </Flex>
  );
};

export default Register;
