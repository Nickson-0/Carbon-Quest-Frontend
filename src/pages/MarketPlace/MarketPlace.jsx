import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';

// action
import { fetchAllMarket } from 'redux/marketPlace/marketSlice';

// Api
import powerPlantBuy from 'api/plantBuyApi';
import { isEmpty } from 'utils/isEmpty';
import MarketItem from 'components/Base/MarketPlaceItem/MarketItem';

function MarketPlace() {
  const toast = useToast();
  const toastIdRef = React.useRef();
  const dispatch = useDispatch();

  const marketValue = useSelector((state) => state.marketSlice);
  const [allMarket, setAllMarket] = useState([]);

  function addToast(status, value) {
    toastIdRef.current = toast({
      status: status,
      position: 'top',
      description: value,
    });
  }

  useEffect(() => {
    dispatch(fetchAllMarket());
  }, []);

  useEffect(() => {
    if (!isEmpty(marketValue)) {
      setAllMarket(marketValue.powerPlants);
    }
  }, [marketValue]);

  const handleClick = (key) => {
    powerPlantBuy
      .powerPlantBuy(
        JSON.parse(localStorage.getItem('userInfo'))._id,
        allMarket[key]._id
      )
      .then((res) => {
        addToast('success', res.data.message);
      })
      .catch((error) => {
        addToast('error', error.response.data.message);
      });
  };

  return (
    <Box style={{ padding: '10px', overflowY: 'auto' }}>
      {!isEmpty(allMarket)
        ? allMarket.map((item, index) => {
            return (
              <div key={index}>
                <MarketItem
                  ItemName={item}
                  onClick={() => handleClick(index)}
                ></MarketItem>
              </div>
            );
          })
        : ''}
    </Box>
  );
}

export default MarketPlace;
