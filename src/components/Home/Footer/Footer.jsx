import React from 'react';
import { GridItem } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import './Footer.css';

function Footer() {
  const navigate = useNavigate();
  return (
    <GridItem className="home-footer">
      <i
        className="fa fa-users home-footer-avatar4"
        onClick={() => {
          navigate('/trading_screen');
        }}
      />
      <i
        className="fa fa-shopping-bag home-footer-avatar5"
        onClick={() => {
          navigate('/market_place');
        }}
      />
    </GridItem>
  );
}

export default Footer;
