import { useEffect, useState } from 'react'

import SocketApi from '@/api/socket-api'

type Message = {
	dto: string
}

export const useSocketConnect = () => {
	const [messages, setMessages] = useState<Message[]>([])

	const connectSocket = () => {
		SocketApi.createConnection()

		SocketApi.socket?.on('client-path', newMessage => {
			setMessages(prevMessages => [...prevMessages, newMessage])
		})
	}

	useEffect(() => {
		connectSocket()

		return () => {
			if (SocketApi.socket) {
				SocketApi.socket.off('client-path')
			}
		}
	}, [])

	return { messages } // Возвращаем массив сообщений
}
