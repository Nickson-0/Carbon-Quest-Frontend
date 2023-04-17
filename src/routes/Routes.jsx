import React, { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// project imports
import Layout from 'components/Layout/Layout';
import Loadable from 'components/Loadable';
import Register from 'pages/Auth/Register';
import Room from 'pages/Room';
import Home from 'pages/Home';

// pages routing
const Lobby = Loadable(lazy(() => import('pages/Lobby')));
const MainGame = Loadable(lazy(() => import('pages/MainGame')));
const MarketPlace = Loadable(lazy(() => import('pages/MarketPlace')));
const TradingScreen = Loadable(lazy(() => import('pages/TradingScreen')));
const Evaluation = Loadable(lazy(() => import('pages/Evaluation')));
const FuelingStation = Loadable(lazy(() => import('pages/FuelingStation')));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Register />,
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    element: <Layout />,
    children: [
      {
        path: '/room/:id',
        element: <Room />,
      },
      {
        path: '/lobby',
        element: <Lobby />,
      },
      {
        path: '/main_game',
        element: <MainGame />,
      },
      {
        path: '/market_place',
        element: <MarketPlace />,
      },
      {
        path: '/trading_screen',
        element: <TradingScreen />,
      },
      {
        path: '/evaluation',
        element: <Evaluation />,
      },
      {
        path: '/fueling_station',
        element: <FuelingStation />,
      },
    ],
  },
]);

function Routes() {
  return <RouterProvider router={router} />;
}

export default Routes;
