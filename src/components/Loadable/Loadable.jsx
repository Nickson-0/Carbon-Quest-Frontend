import { Suspense } from 'react';
import { Spinner } from '@chakra-ui/react';
// ==============================|| LOADABLE - LAZY LOADING ||============================== //

const Loadable = (Component) => (props) =>
  (
    <Suspense
      fallback={
        <div
          style={{
            display: 'flex',
          }}
        >
          <Spinner
            thickness="4px"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
            sx={{ margin: 'auto' }}
          />
        </div>
      }
    >
      <Component {...props} />
    </Suspense>
  );

export default Loadable;
