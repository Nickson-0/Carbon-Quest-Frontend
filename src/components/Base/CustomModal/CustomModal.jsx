import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
} from '@chakra-ui/react';

import { socker } from 'pages/Room/Room';

function CustomModal({ isOpen, onClose }) {
  const onClick = () => {
    socker.emit('start_game', {
      id: JSON.parse(localStorage.getItem('userInfo')).roomId,
      name: JSON.parse(localStorage.getItem('userInfo')).username,
    });
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Carbon Quest</ModalHeader>
          <ModalCloseButton onClose={onClose} />
          <ModalBody>
            <Text>Are you really going to start playing?</Text>
          </ModalBody>

          <ModalFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              No
            </Button>
            <Button colorScheme="blue" mr={3} onClick={onClick}>
              Yes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CustomModal;
