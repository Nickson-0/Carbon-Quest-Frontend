import { Grid } from '@chakra-ui/react';
import { Outlet, useLocation } from 'react-router-dom/dist';
import './Layout.css';

import Header from './Header';
function Layout() {
  const location = useLocation();
  let background = '';
  switch (location.pathname) {
    case '/lobby':
    case '/main_game':
    case '/market_place':
    case '/trading_screen':
    case '/evaluation':
    case '/fueling_station':
      background = 'white';
      break;
    default:
      break;
  }
  return (
    <Grid className="layout" style={{ background: background }}>
      <Header URL={location.pathname} />
      <Outlet />
    </Grid>
  );
}

export default Layout;
