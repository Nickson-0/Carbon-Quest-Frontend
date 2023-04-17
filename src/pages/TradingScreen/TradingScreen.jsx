import React, { useEffect, useState, useRef } from 'react';
import { Box } from '@chakra-ui/react';
import { Flex, Spacer } from '@chakra-ui/react';
import { SockerInit } from 'Socker/Socker';
import { useToast } from '@chakra-ui/react';

import './TradingScreen.css';

import TradingNav1 from 'components/Trading/TradingNav1/TradingNav1';
import TradingMain from 'components/Trading/TradingMain/TradingMain';
import TradingNav2 from 'components/Trading/TradingNav2/TradingNav2';
import Normal from 'components/Base/Button/Normal';
import { useNavigate } from 'react-router';

export let socker = undefined;

function TradingScreen() {
  const navigate = useNavigate();
  const toast = useToast();
  const toastIdRef = useRef();
  const info = JSON.parse(localStorage.getItem('userInfo'));
  const username = info.username;
  const roomId = info.roomId;
  const password = info.password;
  const flag = info.flag;

  function addToast(status, value) {
    toastIdRef.current = toast({
      status: status,
      position: 'top',
      description: value,
    });
  }

  useEffect(() => {
    socker = SockerInit(username, roomId, password, flag);
    // Create the new Trade
    socker.on('newTrade', async (data) => {
      if (data.code === 200) {
        if (
          data.data.recipientId ==
          JSON.parse(localStorage.getItem('userInfo'))._id
        ) {
          setTradeInfo(data.data);
          localStorage.setItem('tradeId', data.data._id);
          localStorage.setItem('condition', 0);
          await JSON.parse(localStorage.getItem('userList')).map((item) => {
            if (item._id == data.data.senderId) {
              addToast('info', `Trade is arrived from ${item.username}!`);
            }
          });
        }
      } else {
        addToast('error', data.message);
      }
    });

    // Accept the Trade
    socker.on('successTrade', (data) => {
      if (data.code === 200) {
        setTradeInfo(data.data);
        localStorage.setItem('tradeId', 0);
        if (localStorage.getItem('condition') == 1) {
          addToast('success', 'Trade is succesed!');
          navigate(-1);
        }
      } else {
        addToast('error', data.message);
      }
    });

    // Reject the Trade
    socker.on('returnTrade', (data) => {
      if (data.code === 200) {
        setTradeInfo(data.data);
        localStorage.setItem('tradeId', 0);
        if (localStorage.getItem('condition') == 2) {
          addToast('success', 'Trade is rejected!');
          navigate(-1);
        }
      } else {
        addToast('error', data.message);
      }
    });
  }, []);

  const [tradeInfo, setTradeInfo] = useState({});
  const [resource, setResource] = useState({
    senderId: JSON.parse(localStorage.getItem('userInfo'))._id,
    recipientId: JSON.parse(localStorage.getItem('recipient')).id,
    senderResources: {
      gas: 0,
      coal: 0,
      oil: 0,
      uranium: 0,
    },
    recipientResources: {
      gas: 0,
      coal: 0,
      oil: 0,
      uranium: 0,
    },
    senderMoney: 0,
    recipientMoney: 0,
  });

  const handleTrade = () => {
    localStorage.setItem('condition', 100);
    const info = JSON.parse(localStorage.getItem('userInfo'));
    if (
      resource.senderResources.gas == 0 &&
      resource.senderResources.coal == 0 &&
      resource.senderResources.oil == 0 &&
      resource.senderResources.uranium == 0 &&
      resource.senderMoney == 0 &&
      resource.recipientMoney == 0 &&
      resource.recipientResources.coal == 0 &&
      resource.recipientResources.gas == 0 &&
      resource.recipientResources.oil == 0 &&
      resource.recipientResources.uranium == 0
    ) {
      addToast('error', 'Please enter the correct value');
    } else if (resource.senderMoney > info.money) {
      return addToast('error', 'Please enter the correct amount');
    } else if (
      resource.senderResources.coal > info.resources.nonRenewable.coal
    ) {
      return addToast('error', 'Please enter the correct coal');
    } else if (resource.senderResources.oil > info.resources.nonRenewable.oil) {
      return addToast('error', 'Please enter the correct oil');
    } else if (resource.senderResources.gas > info.resources.nonRenewable.gas) {
      return addToast('error', 'Please enter the correct gas');
    } else if (
      resource.senderResources.uranium > info.resources.nonRenewable.uranium
    ) {
      return addToast('error', 'Please enter the correct uranium');
    } else {
      socker.emit('requestTrade', { data: resource });
    }
  };
  const handleAccept = () => {
    localStorage.setItem('condition', 1);
    socker.emit('acceptTrade', { data: localStorage.getItem('tradeId') });
  };
  const handleReject = () => {
    localStorage.setItem('condition', 2);
    socker.emit('rejectTrade', { data: localStorage.getItem('tradeId') });
  };

  return (
    <Box>
      <Flex>
        <TradingNav1 resource={resource} setResource={setResource} />
        <Spacer />
        <TradingMain />
        <Spacer />
        <TradingNav2 resource={resource} setResource={setResource} />
      </Flex>
      <Flex style={{ display: 'flex', justifyContent: 'center' }}>
        {localStorage.getItem('condition') == 0 ? (
          <Box display="flex" gap={'4rem'}>
            <Box>
              <Normal color={'#f6d'} type={'accept'} onClick={handleAccept} />
            </Box>
            <Box>
              <Normal color={'#f00'} type={'reject'} onClick={handleReject} />
            </Box>
          </Box>
        ) : (
          <Normal color={''} type={'trade'} onClick={handleTrade} />
        )}
      </Flex>
    </Box>
  );
}

export default TradingScreen;
