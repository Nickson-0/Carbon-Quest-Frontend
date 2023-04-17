import React from 'react';
import { VStack, Box } from '@chakra-ui/layout';
import IndustrialAvatar from 'components/Base/IndustrialAvatar';

function EvaMain({ userData }) {
  return (
    <>
      {userData &&
        userData.map((user, index) => {
          return (
            <Box key={index}>
              <VStack spacing={2} align="center" width={'230px'}>
                <Box h="170px" fontSize={'20px'}></Box>
                <Box style={{ height: '80px', fontSize: '20px' }}>
                  {user.count} Units
                </Box>
                <Box h="80px" fontSize={'20px'}>
                  {user.energyProduction * user.count}
                </Box>
                <Box h="80px" fontSize={'20px'}>
                  {user.count} Units
                </Box>
                <Box h="80px" fontSize={'20px'}>
                  {user.co2Production * user.count}
                </Box>
                <Box h="80px">
                  <IndustrialAvatar type={user.type} />
                </Box>
              </VStack>
            </Box>
          );
        })}
    </>
  );
}

export default EvaMain;
