import React, { useEffect, useState, useTransition } from 'react';
import { Flex, GridItem } from '@chakra-ui/react';
import { useNavigate } from 'react-router';
import NotificationModal from 'pages/TradingScreen/Modal';
import { getUserByHeader } from 'redux/home/homeSlice';
import './Header.css';
import { useDispatch } from 'react-redux';

function Header({ URL }) {
  switch (URL) {
    case '/lobby':
      return UrlShow('Carbon Quest');
    case '/main_game':
      return UrlShow('Main Game');
    case '/market_place':
      return UrlShow('Buy Powerplants');
    case '/trading_screen':
      return UrlShow('Trading screen');
    case '/evaluation':
      return EvaluationShow('End of Year Performance');
    case '/fueling_station':
      return UrlShow('Fueling Station');
    default:
      return <></>;
  }
}

function string(min, sec) {
  let string = '';
  if (min / 10 >= 1) {
    if (sec / 10 >= 1) {
      string = min + ' : ' + sec;
    } else {
      string = min + ' : ' + '0' + sec;
    }
  } else if (sec / 10 >= 1) {
    string = '0' + min + ' : ' + sec;
  } else {
    string = '0' + min + ' : ' + '0' + sec;
  }
  return string;
}

function UrlShow(headerTitle) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isPending, startTransition] = useTransition();
  const [round, setRound] = useState(Number(localStorage.getItem('round')));
  let roundValue = Number(localStorage.getItem('round'));

  useEffect(() => {
    if (localStorage.getItem('time_delay') !== '0') setTimer();
  }, []);

  switch (round) {
    case 1:
      localStorage.setItem('EnergyTarget', 2500);
      break;
    case 2:
      localStorage.setItem('EnergyTarget', 5000);
      break;
    case 3:
      localStorage.setItem('EnergyTarget', 7500);
      break;
    case 4:
      localStorage.setItem('EnergyTarget', 10000);
      break;
    default:
      break;
  }

  const showModal = () => {
    setShow(true);
  };

  const handleClick = () => {
    if (localStorage.getItem('round') >= 4) {
      setShow(false);
      navigate('/evaluation');
    } else {
      localStorage.setItem('time_delay', 900);

      let userInfo = JSON.parse(localStorage.getItem('userInfo'));
      let fine =
        Number(localStorage.getItem('EnergyTarget')) -
        2500 -
        userInfo.energyProduction;
      if (fine > 0) {
        userInfo.money = userInfo.money - 500;
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        dispatch(getUserByHeader(userInfo));
      }
      setTimer();
      setShow(false);
    }
  };

  const setTimer = () => {
    let delay = localStorage.getItem('time_delay');

    const timer = setInterval(() => {
      startTransition(() => {
        delay = delay - 1;
        setMinutes(Math.floor(delay / 60));
        setSeconds(Math.floor(delay % 60));
        localStorage.setItem('time_delay', delay);
      });

      if (Number(localStorage.getItem('time_delay')) == 0) {
        clearInterval(timer);
        roundValue = roundValue + 1;
        localStorage.setItem('round', roundValue);
        setRound(roundValue);
        showModal();
      }
    }, 1000);
  };

  const showModals = () => {
    if (localStorage.getItem('time_delay') === '0') {
      return (
        <NotificationModal
          isOpen={true}
          onClick={() => {
            handleClick();
          }}
        ></NotificationModal>
      );
    } else return '';
  };

  return (
    <GridItem className="header-header">
      {headerTitle === 'Canbon Quest' ? (
        <i style={{ opacity: '0' }}></i>
      ) : (
        <i
          className="fa fa-arrow-left header-arrow"
          onClick={() => {
            navigate(-1);
          }}
          style={{ cursor: 'pointer' }}
        ></i>
      )}
      <Flex justifyContent={'space-between'} w={'-webkit-fill-available'}>
        <Flex marginLeft={20} fontSize={'2xl'}>
          Round {round}
        </Flex>
        <Flex
          style={{
            fontSize: '40px',
            fontStyle: 'normal',
            fontFamily: 'Irish Grover',
          }}
        >
          {headerTitle}
        </Flex>
        <Flex marginRight={20} fontSize={'2xl'}>
          Time Left : {string(minutes, seconds)}
        </Flex>
        {showModals()}
      </Flex>
    </GridItem>
  );
}

function EvaluationShow(headerTitle) {
  const navigate = useNavigate();
  navigate('/evaluation');
  return (
    <GridItem
      className="header-header"
      justifyContent={'space-between'}
      w={'-webkit-fill-available'}
      style={{
        fontSize: '40px',
        fontStyle: 'normal',
      }}
    >
      <i
        className="fa fa-arrow-left header-arrow"
        onClick={() => {
          navigate('/');
        }}
        style={{ cursor: 'pointer' }}
      ></i>
      {headerTitle}
      <div></div>
    </GridItem>
  );
}

export default Header;
