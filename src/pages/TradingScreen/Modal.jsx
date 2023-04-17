import React, { useEffect } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalOverlay,
  ModalFooter,
  ModalContent,
  Button,
  useToast,
} from '@chakra-ui/react';

function NotificationModal({ isOpen, onClick }) {
  const toast = useToast();
  const toastIdRef = React.useRef();

  function addToast(status, value) {
    toastIdRef.current = toast({
      status: status,
      position: 'top',
      duration: 2000,
      description: value,
    });
  }

  const body = () => {
    let string = '';
    let roundFlag = Number(localStorage.getItem('round'));
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const value =
      Number(localStorage.getItem('EnergyTarget')) -
      2500 -
      userInfo.energyProduction;
    if (value <= 0) {
      string = `Successfully pass Round ${roundFlag - 1}`;
    } else {
      string = `Round ${
        roundFlag - 1
      } energy target not met, penalty imposed 500€`;
    }
    return string;
  };

  return (
    <Modal isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Round {Number(localStorage.getItem('round')) - 1}
        </ModalHeader>
        <ModalBody>{body()}</ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClick}>
            Okay
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default NotificationModal;
