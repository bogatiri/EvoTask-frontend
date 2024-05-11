import { useEffect, useState } from 'react'

import SocketApi from '@/api/socket-api'

type Message = {
	dto: string
}

export const useSocketConnect = (chatId: string | undefined) => {
	const [message, setMessages] = useState<any>()

	const connectSocket = () => {
		SocketApi.createConnection()

		if (SocketApi.socket) {
			SocketApi.socket.emit('joinRoom', { chatId });
		
		

		SocketApi.socket?.on('new-message', newMessage => {
			setMessages(newMessage)
		})
	}
}
	useEffect(() => {
		connectSocket()

		return () => {
			if (SocketApi.socket) {
				SocketApi.socket.off('new-message')
			}
		}
	}, [chatId])

	return { message } 
}
