import React, { useState, useEffect } from 'react';
import { Button, Flex, Text } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router';

import { SockerInit } from 'Socker/Socker';
import Modal from 'components/Base/CustomModal';
import RoomUser from 'components/Base/RoomUser';

export let socker = undefined;

const Room = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [show, setShow] = useState(false);
  const [actionBtn, setActionBtn] = useState(false);
  const [data, setData] = useState([]);
  const [len, setLen] = useState(0);
  const [btnState, setBtnState] = useState(false);
  const handleClose = () => setShow(false);
  const showModal = () => {
    setShow(true);
  };

  const showButton = () => {
    let string =
      btnState == true &&
      len != 0 &&
      JSON.parse(localStorage.getItem('userInfo')).flag == 1
        ? 'visible'
        : 'hidden';
    return string;
  };

  useEffect(() => {
    const info = JSON.parse(localStorage.getItem('userInfo'));
    const username = info.username;
    const roomId = info.roomId;
    const password = info.password;
    const flag = info.flag;
    socker = SockerInit(username, roomId, password, flag);
    socker.emit('request_roon', username, roomId, password, flag);
    socker.on('response_room', async (result) => {
      const value = result.data.length == 1 ? result.data[0] : result.data;
      let stateFlag = true;
      const stateArray = [];
      if (result.code == 200) {
        if (result.data.length != 1) {
          value.map((item, index) => {
            stateArray.push(item.readyState);
          });
          stateArray.map((item) => {
            stateFlag = stateFlag && item;
          });
          setLen(stateArray.length);

          setBtnState(stateFlag);
          setData([value]);
        }
        setData(value);
      }
    });
    socker.on('game_started', (result) => {
      localStorage.setItem('userList', JSON.stringify(result.data));
      localStorage.setItem('time_delay', 1200);
      localStorage.setItem('round', 1);
      navigate('/lobby');
    });
  }, []);

  return (
    <Flex flexDirection={'row'}>
      <Flex w="20%" h="100vh"></Flex>
      <Flex
        w="60%"
        h="100vh"
        p={16}
        flexDirection={'column'}
        justifyContent="center"
      >
        <Text fontSize={'6xl'} textAlign={'center'}>
          ARE YOU READY?
        </Text>
        <Flex
          flexDirection={'column'}
          overflowY={'scrolld'}
          borderRadius={'lg'}
        >
          {data.length ? (
            data &&
            data.map((item, index) => {
              return (
                <div key={index}>
                  <RoomUser
                    username={item.username}
                    actionBtn={item.readyState}
                    onClick={() => {
                      socker.emit('isReady', {
                        name: item.username,
                        id: item.roomId,
                        state: actionBtn,
                      });
                    }}
                  ></RoomUser>
                </div>
              );
            })
          ) : (
            <RoomUser
              username={data.username}
              actionBtn={data.readyState}
              onClick={() => {
                socker.emit('isReady', {
                  name: data.username,
                  id: data.roomId,
                  state: actionBtn,
                });
              }}
            ></RoomUser>
          )}
        </Flex>
        <Flex w={'100%'} justifyContent={'center'}>
          <Button
            colorScheme={'teal'}
            type="button"
            w={'fit-content'}
            onClick={() => showModal()}
            visibility={() => showButton()}
          >
            Start the Game!
          </Button>
        </Flex>
      </Flex>
      <Modal isOpen={show} onClose={handleClose} data={data} />
      <Flex w="20%" h="100vh"></Flex>
    </Flex>
  );
};

export default Room;
