import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@chakra-ui/layout';

import Avatar from 'components/Base/Avatar';
import AmountInput from 'components/Base/AmountInput';
import Item from 'components/Base/Item';
import manUrl from '../../../png/1.png';
import manUrl1 from '../../../png/7.png';
import womanUrl from '../../../png/23.png';
import womanUrl1 from '../../../png/12.png';
import womanUrl2 from '../../../png/10.png';

// actions
import { fetchSenderById } from 'redux/home/homeSlice';
import { isEmpty } from 'utils/isEmpty';

import './TradingNav1.css';
import AmountBox from 'components/Base/AmountBox';

function TradingNav1({ resource, setResource }) {
  const dispatch = useDispatch();
  const value = useSelector((state) => state.homeSlice);
  const [gas, setGas] = useState('');
  const [coal, setCoal] = useState('');
  const [oil, setOil] = useState('');
  const [uranium, setUranium] = useState('');
  const [url, setUrl] = useState([
    manUrl,
    manUrl1,
    womanUrl,
    womanUrl1,
    womanUrl2,
  ]);

  useEffect(() => {
    const id = JSON.parse(localStorage.getItem('userInfo'))._id;
    dispatch(fetchSenderById(id));
  }, []);

  useEffect(() => {
    if (!isEmpty(value.sender.resources)) {
      setGas(value.sender.resources.nonRenewable.gas);
      setCoal(value.sender.resources.nonRenewable.coal);
      setOil(value.sender.resources.nonRenewable.oil);
      setUranium(value.sender.resources.nonRenewable.uranium);
    }
  }, [value]);

  return (
    <Box className="trading-gird1">
      <Box className="trading-nav-user">
        <Avatar
          fileUrl={url[JSON.parse(localStorage.getItem('userInfo')).avatar]}
          point={{ x: 1, y: 30 }}
        />
      </Box>
      <Box className="trading-nav-feature">
        <Box style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
          <Item type={'gas'} value={gas}></Item>
          <AmountInput
            resource={resource}
            setResource={setResource}
            type={'gas'}
            flag={'senderResources'}
          />
        </Box>
        <Box style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
          <Item type={'coal'} value={coal}></Item>
          <AmountInput
            resource={resource}
            setResource={setResource}
            type={'coal'}
            flag={'senderResources'}
          />
        </Box>
        <Box style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
          <Item type={'oil'} value={oil}></Item>
          <AmountInput
            resource={resource}
            setResource={setResource}
            type={'oil'}
            flag={'senderResources'}
          />
        </Box>
        <Box style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
          <Item type={'uranium'} value={uranium}></Item>
          <AmountInput
            resource={resource}
            setResource={setResource}
            type={'uranium'}
            flag={'senderResources'}
          />
        </Box>
      </Box>
      <Box style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
        <AmountBox
          resource={resource}
          setResource={setResource}
          flag={'senderMoney'}
        />
      </Box>
    </Box>
  );
}

export default TradingNav1;
