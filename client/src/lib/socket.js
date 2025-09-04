import { io } from 'socket.io-client'
import useAuth from '../store/auth'

let socket = null

export const getSocket = () => {
  const { token } = useAuth.getState()
  if (!socket) {
    socket = io(import.meta.env.VITE_API_URL || 'http://localhost:3000', {
      auth: { token },
    })
  }
  return socket
}
