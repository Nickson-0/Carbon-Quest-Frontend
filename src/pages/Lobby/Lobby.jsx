import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@chakra-ui/react';

import './Lobby.css';
import Nav from 'components/Home/Nav';
import Main from 'components/Home/Main';
import NewFooter from 'components/Home/NewFooter';
import Footer from 'components/Home/Footer';
import { useToast } from '@chakra-ui/react';
import { changeById } from 'redux/change/changeSlice';
import { isEmpty } from 'utils/isEmpty';

function Lobby() {
  const toast = useToast();
  const dispatch = useDispatch();
  const toastIdRef = useRef();

  const [info, setInfo] = useState({});
  const stateValue = useSelector((state) => state.homeSlice);

  // Toast
  function addToast(status, value) {
    toastIdRef.current = toast({
      status: status,
      position: 'top',
      description: value,
    });
  }

  useEffect(() => {
    if (!isEmpty(stateValue)) {
      console.log('stateValue  = ', stateValue);
      setInfo(stateValue.sender);
    }
  }, [stateValue]);

  const id = JSON.parse(localStorage.getItem('userInfo'))._id;
  const ids = [];
  JSON.parse(localStorage.getItem('userList')).map((item, index) => {
    ids.push(item._id);
  });
  const [me, setMe] = useState({ id: id });

  // useEffect(() => {
  //   let temp = localStorage.getItem('homeaccess');
  //   if (isEmpty(temp) || localStorage.getItem('homeaccess') === 'false') {
  //     navigate('/');
  //   }
  // }, []);

  // useEffect(() => {
  //   if (isMounted) {
  //     // Create the new Trade
  //     socket.on('newTrade', (data) => {
  //       let executed = false;
  //       if (!executed) {
  //         executed = true;
  //         if (data.code === 200) {
  //           if (data.data.recipientId == localStorage.getItem('id')) {
  //             if (localStorage.getItem('condition') == 100) {
  //               addToast('info', 'The new Trade is arrived!');
  //               // localStorage.setItem('condition', 101);
  //             }
  //           }
  //         } else {
  //           addToast('error', data.message);
  //         }
  //       }
  //     });
  //   } else isMounted = true;
  // }, []);

  useEffect(() => {
    dispatch(changeById(me));
  }, [me]);

  return (
    <Grid className="lobby">
      <Nav id={me.id} />
      <Main setMe={setMe} />
      {me && me.id === id ? <NewFooter /> : <Footer />}
    </Grid>
  );
}
export default Lobby;
