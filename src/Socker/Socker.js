import { socketUrl } from 'env';
import { io } from 'socket.io-client';

export function SockerInit(username, roomId, password, flag) {
  const socker = io(`${socketUrl}`, {
    path: '/classic-mode',
    transports: ['websocket'],
    query: {
      username,
      roomId,
      password,
      flag,
    },
  });
  return socker;
}
