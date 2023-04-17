import React from 'react';
import { Box } from '@chakra-ui/react';
import Item from 'components/Base/Item';
import Source from 'components/Base/Source';
import SmallProduction from 'components/SmallProduction';
import SmallDollar from 'components/Base/SmallDollar';
import FuelCount from 'components/Base/FuelCount';
import Buy from 'components/Base/Button/Buy';
import './MarketItem.css';

function MarketItem({ ItemName, onClick }) {
  return (
    <Box className="MarketItem-container">
      <Box style={{ flexGrow: '1' }}></Box>
      <Box style={{ flexGrow: '2' }}>
        <Item type={ItemName.type}></Item>
      </Box>
      {ItemName.co2Production ? (
        <Box style={{ flexGrow: '4' }}>
          <SmallProduction
            mark={ItemName.energyProduction}
            type={'energyProduction'}
          ></SmallProduction>
          <SmallProduction
            mark={ItemName.co2Production}
            type={'co2Production'}
          ></SmallProduction>
        </Box>
      ) : (
        <Box style={{ flexGrow: '4' }}>
          <Source
            mark={ItemName.energyProduction}
            type={'energyProduction'}
          ></Source>
        </Box>
      )}
      <Box style={{ flexGrow: '1' }}>
        <Item type={ItemName.fuelType}></Item>
      </Box>
      <Box style={{ flexGrow: '11' }}>
        <FuelCount count={ItemName.fuelAmount}></FuelCount>
      </Box>
      <Box style={{ flexGrow: '1' }}>
        <SmallDollar mark={ItemName.price} type={'money'}></SmallDollar>
        <Buy onClick={onClick} />
      </Box>
    </Box>
  );
}

export default MarketItem;
