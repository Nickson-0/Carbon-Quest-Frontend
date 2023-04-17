import React, { useState } from 'react';
import { Input } from '@chakra-ui/react';

import './FuelInput.css';

function FuelInput({ value, onChange }) {
  const [strPlaceHolder, setStrPlaceHolder] = useState('fuel x power plants');
  return (
    <Input
      onFocus={() => {
        setStrPlaceHolder('');
      }}
      onBlur={() => {
        setStrPlaceHolder('fuel x power plants');
      }}
      placeholder={strPlaceHolder}
      size="lg"
      type="number"
      value={value}
      className="fuel-input"
      onChange={onChange}
    />
  );
}

export default FuelInput;
