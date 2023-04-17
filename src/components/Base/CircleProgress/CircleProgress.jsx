import React from 'react';
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react';

function CircleProgress({ value, color }) {
  return (
    <CircularProgress value={value} color={color} size="80px">
      <CircularProgressLabel style={{ color: color }}>
        {value}%
      </CircularProgressLabel>
    </CircularProgress>
  );
}

export default CircleProgress;
