import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Flex, GridItem, Progress } from '@chakra-ui/react';
import Avatar from '../../../components/Base/Avatar';
import Source from '../../../components/Base/Source';

// actions
import { fetchSenderById } from 'redux/home/homeSlice';

import { isEmpty } from 'utils/isEmpty';
import './Nav.css';
import Item from '../../../components/Base/Item';
import manUrl from '../../../png/1.png';
import manUrl1 from '../../../png/7.png';
import womanUrl from '../../../png/23.png';
import womanUrl1 from '../../../png/12.png';
import womanUrl2 from '../../../png/10.png';

function Nav({ id }) {
  const dispatch = useDispatch();

  let i = 0;
  const markValue = useSelector((state) => state.homeSlice);
  const present = useSelector((state) => state.changeSlice);
  const [userInfo, setUserInfo] = useState({});
  const [url, setUrl] = useState([
    manUrl,
    manUrl1,
    womanUrl,
    womanUrl1,
    womanUrl2,
  ]);

  for (i = 0; i < JSON.parse(localStorage.getItem('userList')).length; i++) {
    if (JSON.parse(localStorage.getItem('userList'))[i]._id == id) {
      break;
    }
  }

  useEffect(() => {
    dispatch(fetchSenderById(id));
  }, []);

  useEffect(() => {
    if (!isEmpty(present.id)) {
      dispatch(fetchSenderById(present.id));
    }
  }, [present]);

  useEffect(() => {
    if (!isEmpty(markValue.sender.resources)) {
      if (
        JSON.parse(localStorage.getItem('userInfo')).username ==
        markValue.sender.username
      ) {
        localStorage.setItem('userInfo', JSON.stringify(markValue.sender));
      }
      setUserInfo(markValue.sender);
    }
  }, [markValue]);

  return (
    <GridItem className="home-nav">
      <Box className="home-nav-user">
        <Box>
          <Flex h={'56%'}></Flex>
          <Avatar
            fileUrl={url[i]}
            point={{ x: 10, y: 13 }}
            username={userInfo.username}
          />
        </Box>
        <Box display={'flex'} flexDirection={'column'} gap={'0.7rem'}>
          {!isEmpty(userInfo) ? (
            <Box>
              <Box>
                <Source mark={userInfo.money} type={'money'}></Source>

                <Source
                  mark={userInfo.co2Production}
                  type={'co2Production'}
                ></Source>
              </Box>
              <Box>
                <Source
                  mark={userInfo.energyProduction}
                  type={'energyProduction'}
                ></Source>
                <Source
                  mark={localStorage.getItem('EnergyTarget')}
                  type={'energyProduction'}
                ></Source>
              </Box>
            </Box>
          ) : (
            ''
          )}
        </Box>
      </Box>
      <Box
        className="home-nav-title"
        paddingLeft={'12px'}
        paddingRight={'8px'}
        marginTop={'-60px'}
      >
        <Progress
          value={
            (userInfo.energyProduction / localStorage.getItem('EnergyTarget')) *
            100
          }
          w={'100%'}
          h={'10px'}
          max={100}
          min={0}
          isAnimated={true}
          colorScheme="gray"
          isIndeterminate={userInfo.energyProduction ? false : true}
        />
      </Box>
      <Box className="home-nav-title" marginTop={'20px'}>
        <h1 style={{ fontSize: '1.5rem' }}>Non renewable Reserves</h1>
      </Box>
      <Box className="home-nav-feature">
        <Box className="home-nav-source">
          <Item
            type={'oil'}
            value={
              JSON.parse(localStorage.getItem('userInfo')).resources
                .nonRenewable.oil
            }
          ></Item>
          <Item
            type={'gas'}
            value={
              JSON.parse(localStorage.getItem('userInfo')).resources
                .nonRenewable.gas
            }
          ></Item>
        </Box>
        <br></br>
        <Box className="home-nav-source">
          <Item
            type={'coal'}
            value={
              JSON.parse(localStorage.getItem('userInfo')).resources
                .nonRenewable.coal
            }
          ></Item>
          <Item
            type={'uranium'}
            value={
              JSON.parse(localStorage.getItem('userInfo')).resources
                .nonRenewable.uranium
            }
          ></Item>
        </Box>
      </Box>
      <Box className="home-nav-title">
        <h1 style={{ fontSize: '1.5rem' }}> Green Energy Capacity</h1>
      </Box>
      <Box className="home-nav-feature">
        <Box className="home-nav-source">
          <Item
            type={'solar'}
            value={
              JSON.parse(localStorage.getItem('userInfo')).resources.renewable
                .solar
            }
          ></Item>
          <Item
            type={'wind'}
            value={
              JSON.parse(localStorage.getItem('userInfo')).resources.renewable
                .wind
            }
          ></Item>
        </Box>
        <br></br>
        <Box className="home-nav-source">
          <Item
            type={'hydro'}
            value={
              JSON.parse(localStorage.getItem('userInfo')).resources.renewable
                .hydro
            }
          ></Item>
          <Item
            type={'geoThermal'}
            value={
              JSON.parse(localStorage.getItem('userInfo')).resources.renewable
                .geoThermal
            }
          ></Item>
        </Box>
      </Box>
    </GridItem>
  );
}

export default Nav;
