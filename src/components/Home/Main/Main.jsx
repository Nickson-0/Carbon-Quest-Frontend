import React, { useEffect, useState } from 'react';
import { GridItem } from '@chakra-ui/react';

import backgroundUrl from '../../../png/background.jpg';
import Avatar from 'components/Base/Avatar';
import './Main.css';

import manUrl from '../../../png/1.png';
import manUrl1 from '../../../png/7.png';
import womanUrl from '../../../png/23.png';
import womanUrl1 from '../../../png/12.png';
import womanUrl2 from '../../../png/10.png';

function Main({ setMe }) {
  const [url, setUrl] = useState([
    manUrl,
    manUrl1,
    womanUrl,
    womanUrl1,
    womanUrl2,
  ]);

  const onMe = (id, index) => {
    localStorage.setItem('recipient', JSON.stringify({ id: id, index: index }));
    setMe({ id: id, urlId: url[index] });
  };

  return (
    <GridItem className="home-main" sx={{ backgroundImage: backgroundUrl }}>
      {JSON.parse(localStorage.getItem('userList')).map((item, index) => {
        return (
          <div key={index}>
            <Avatar
              fileUrl={url[index]}
              point={{ x: item.country.positionX, y: item.country.positionY }}
              onClick={() => onMe(item._id, index)}
            />
          </div>
        );
      })}
    </GridItem>
  );
}

export default Main;
