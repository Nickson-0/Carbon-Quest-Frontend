import { Box } from '@chakra-ui/layout';
import { Input, Image } from '@chakra-ui/react';
import React, { useState } from 'react';
import dollar from '../../../png/euro.png';

import './AmountBox.css';

function AmountBox({ resource, setResource, flag }) {
  const [strPlaceHolder, setStrPlaceHolder] = useState('amount');
  return (
    <Box className="amount-box">
      <Input
        onFocus={() => {
          setStrPlaceHolder('');
        }}
        onBlur={() => {
          setStrPlaceHolder('amount');
        }}
        placeholder={strPlaceHolder}
        size="lg"
        type="number"
        className="amount-box-input"
        value={resource[flag] === 0 ? '' : resource[flag]}
        onChange={(e) => {
          if (flag === 'senderMoney') {
            setResource({
              ...resource,
              senderMoney: Number(e.target.value),
            });
          } else if (flag === 'recipientMoney') {
            setResource({
              ...resource,
              recipientMoney: Number(e.target.value),
            });
          }
        }}
      />
      <Image src={dollar} className="amount-box-icon" />
    </Box>
  );
}

export default AmountBox;
