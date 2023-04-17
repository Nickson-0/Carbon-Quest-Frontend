import React from 'react';
import { Image } from '@chakra-ui/react';
import './IndustrialAvatar.css';

import imgGas from '../../../png/gas-rig.png';
import imgCoal from '../../../png/coal-powerplant.png';
import imgOil from '../../../png/oil-rig.png';
import imgNuclear from '../../../png/nuclear-plant.png';
import imgSolar from '../../../png/solar-panel.png';
import imgGeo from '../../../png/geo-turbine.png';
import imgElectric from '../../../png/electric-dam.png';
import imgWind from '../../../png/wind-turbine.png';

function IndustrialAvatar({ type }) {
  switch (type) {
    case 'gas':
      return AvatarShow(imgGas);
    case 'coal':
      return AvatarShow(imgCoal);
    case 'oil':
      return AvatarShow(imgOil);
    case 'uranium':
      return AvatarShow(imgNuclear);
    case 'solar':
      return AvatarShow(imgSolar);
    case 'geoThermal':
      return AvatarShow(imgGeo);
    case 'hydro':
      return AvatarShow(imgElectric);
    case 'wind':
      return AvatarShow(imgWind);
    default:
      return <></>;
  }
}

function AvatarShow(imageUrl) {
  return <Image src={imageUrl} className="industrial-avatar-size" />;
}

export default IndustrialAvatar;
