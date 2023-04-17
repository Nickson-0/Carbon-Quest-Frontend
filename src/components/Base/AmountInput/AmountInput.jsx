import React, { useState } from 'react';
import { Input } from '@chakra-ui/react';

import './AmountInput.css';

function AmountInput({ resource, setResource, type, flag }) {
  const [strPlaceHolder, setStrPlaceHolder] = useState('amount');

  const handleValue = (value) => {
    if (flag === 'senderResources') {
      switch (type) {
        case 'gas':
          setResource({
            ...resource,
            senderResources: { ...resource.senderResources, gas: value },
          });
          break;
        case 'coal':
          setResource({
            ...resource,
            senderResources: { ...resource.senderResources, coal: value },
          });
          break;
        case 'oil':
          setResource({
            ...resource,
            senderResources: { ...resource.senderResources, oil: value },
          });
          break;
        case 'uranium':
          setResource({
            ...resource,
            senderResources: { ...resource.senderResources, uranium: value },
          });
          break;
        default:
          break;
      }
    } else if (flag === 'recipientResources') {
      switch (type) {
        case 'gas':
          setResource({
            ...resource,
            recipientResources: { ...resource.recipientResources, gas: value },
          });
          break;
        case 'coal':
          setResource({
            ...resource,
            recipientResources: { ...resource.recipientResources, coal: value },
          });
          break;
        case 'oil':
          setResource({
            ...resource,
            recipientResources: { ...resource.recipientResources, oil: value },
          });
          break;
        case 'uranium':
          setResource({
            ...resource,
            recipientResources: {
              ...resource.recipientResources,
              uranium: value,
            },
          });
          break;
        default:
          break;
      }
    }
  };

  return (
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
      className="amount-input"
      value={resource[flag][type] === 0 ? '' : resource[flag][type]}
      onChange={(e) => handleValue(Number(e.target.value))}
    ></Input>
  );
}

export default AmountInput;
