import React, { useEffect, useState } from 'react';
import { Flex } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router';

import WelcomeRoom from 'components/Base/Room/WelcomeRoom';
import JoinRoom from 'components/Base/Room/JoinRoom';
import CreateRoom from 'components/Base/Room/CreateRoom';
import userListApi from 'api/userListApi';

const Home = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const toastIdRef = React.useRef();
  const [changeFlag, setChangeFlag] = useState(false);
  const [toastFlag, setToastFlag] = useState(2);
  const [message, setMessage] = useState('');
  const [data, setData] = useState({
    roomId: '',
    password: '',
  });

  function addToast(status, value) {
    toastIdRef.current = toast({
      status: status,
      position: 'top',
      duration: 2000,
      description: value,
    });
  }

  const handleClick = () => {
    setChangeFlag(!changeFlag);
  };

  const handleAuth = async () => {
    if (!data.roomId) {
      addToast('error', 'Enter the correct room ID');
    } else {
      const info = JSON.parse(localStorage.getItem('userInfo'));
      const formData = {
        username: info.username,
        roomId: data.roomId,
        password: data.password,
        flag: info.flag,
      };
      changeFlag == false
        ? userListApi
            .getUserList(formData)
            .then((res) => {
              localStorage.setItem('userInfo', JSON.stringify(res.data.user));
              addToast('success', 'You have joined room successfully');
              navigate(`/room/${data.roomId}`);
            })
            .catch((err) => {
              addToast('error', err.response.data.message);
            })
        : userListApi
            .createUserList(formData)
            .then((res) => {
              localStorage.setItem('userInfo', JSON.stringify(res.data.user));
              addToast('success', 'You have joined room successfully');
              navigate(`/room/${data.roomId}`);
            })
            .catch((err) => {
              addToast('error', err.response.data.message);
            });
    }
  };

  const handleMessage = () => {
    addToast('error', message);
  };

  useEffect(() => {
    if (toastFlag == 1) {
      addToast('success', 'You have joined room successfully');
    }
    if (toastFlag == 0) {
      handleMessage();
    }
  }, [toastFlag]);

  return (
    <Flex flexDirection={'row'}>
      <Flex w="10%" h="100vh"></Flex>
      <Flex w="90%" h="100vh" justifyContent="center" flexDirection={'column'}>
        <WelcomeRoom
          username={JSON.parse(localStorage.getItem('userInfo')).username}
        />
        {changeFlag == false ? (
          <JoinRoom data={data} setData={setData} onClick={handleAuth} />
        ) : (
          <CreateRoom data={data} setData={setData} onClick={handleAuth} />
        )}

        <Button onClick={handleClick} m={'8'} w="max-content">
          {changeFlag == false ? 'Create New Room' : 'Join Room'}
        </Button>
      </Flex>
      <Flex w="10%" h="100vh"></Flex>
    </Flex>
  );
};

export default Home;
