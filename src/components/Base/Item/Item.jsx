import React from 'react';
import { Box } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';

import './Item.css';

import imageSrc1 from '../../../png/gas-pump.png';
import imageSrc2 from '../../../png/geothermal.png';
import imageSrc3 from '../../../png/hydro.jpg';
import imageSrc4 from '../../../png/oil-barrel.png';
import imageSrc5 from '../../../png/radiation.png';
import imageSrc6 from '../../../png/sun.png';
import imageSrc7 from '../../../png/uranium.png';
import imageSrc8 from '../../../png/windy.png';
import imageSrc9 from '../../../png/timber.png';
import imageSrc10 from '../../../png/rare-metal.png';
import imageSrc11 from '../../../png/iron.png';
import imageSrc12 from '../../../png/copper.png';
import imageSrc13 from '../../../png/glass.png';
import imageSrc14 from '../../../png/coal.png';

import imageSrc15 from '../../../png/nuclear-plant.png';
import imageSrc16 from '../../../png/solar-panel.png';
import imageSrc17 from '../../../png/geo-turbine.png';
import imageSrc18 from '../../../png/electric-dam.png';
import imageSrc19 from '../../../png/wind-turbine.png';
import imageSrc20 from '../../../png/gas-rig.png';
import imageSrc21 from '../../../png/coal-powerplant.png';
import imageSrc22 from '../../../png/oil-rig.png';

function Item({ type, value }) {
  switch (type) {
    case 'gas':
      return ItemShow(type, imageSrc1, value);
    case 'oil':
      return ItemShow(type, imageSrc4, value);
    case 'uranium':
      return ItemShow(type, imageSrc7, value);
    case 'coal':
      return ItemShow(type, imageSrc14, value);
    case 'geoThermal':
      return ItemShow(type, imageSrc2, value);
    case 'hydro':
      return ItemShow(type, imageSrc3, value);
    case 'radiation':
      return ItemShow(type, imageSrc5);
    case 'solar':
      return ItemShow(type, imageSrc6, value);
    case 'wind':
      return ItemShow(type, imageSrc8, value);
    case 'timber':
      return ItemShow(type, imageSrc9);
    case 'rareMetal':
      return ItemShow(type, imageSrc10);
    case 'iron':
      return ItemShow(type, imageSrc11);
    case 'copper':
      return ItemShow(type, imageSrc12);
    case 'glass':
      return ItemShow(type, imageSrc13);
    case 'Nuclear Plant':
      return ItemImage(imageSrc15);
    case 'Solar Panel':
      return ItemImage(imageSrc16);
    case 'Geo-Turbine':
      return ItemImage(imageSrc17);
    case 'Electric Dam':
      return ItemImage(imageSrc18);
    case 'Wind Turbine':
      return ItemImage(imageSrc19);
    case 'Gas-fired Plant':
      return ItemImage(imageSrc20);
    case 'Coal-fired Plant':
      return ItemImage(imageSrc21);
    case 'Oil-fired Plant':
      return ItemImage(imageSrc22);
    default:
      return <></>;
  }
}

function ItemShow(type, imageUrl, value) {
  let fontSize = type.length < 5 ? 10 : type.length < 7 ? 8 : 7;
  return (
    <Box className="item">
      <Box className="item-avatar-circle">
        <Box className="item-count">{value}</Box>
        <Image className="image-item" src={imageUrl} />
      </Box>
      <Box className="item-text">
        <span className="text" style={{ fontSize: fontSize, color: 'black' }}>
          {type}
        </span>
      </Box>
    </Box>
  );
}

function ItemImage(imageUrl) {
  return <Image src={imageUrl} />;
}

export default Item;
