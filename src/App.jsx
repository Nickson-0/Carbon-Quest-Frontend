import React, { useEffect } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './theme/theme';
import Routes from 'routes/Routes';

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Routes />
    </ChakraProvider>
  );
};

export default App;
