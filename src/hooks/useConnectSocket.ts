import { useEffect, useState } from 'react'

import { IMessageResponse } from '@/types/message.types'

import SocketApi from '@/api/socket-api'

import { useChatById } from '@/app/i/scrumban/hooks/chat/useChats'



export const useSocketConnect = (chatId: string, messages: IMessageResponse[]) => {
	const [message, setMessages] = useState<IMessageResponse[]>(messages)


	const connectSocket = () => {
		SocketApi.createConnection()

		if (SocketApi.socket) {
			SocketApi.socket.emit('joinRoom', { chatId })

			const handleNewMessage = (newMessage: IMessageResponse) => {
				setMessages(prevMessages => [...prevMessages, newMessage])
			}

			const handleDeleteMessage = (deletedMessage: IMessageResponse) => {
				setMessages(prevMessages =>
					prevMessages!.filter(message => message.id !== deletedMessage.id)
				)
			}

			const handleUpdateMessage = (updatedMessage: IMessageResponse) => {
				setMessages(prevMessages => {
						const index = prevMessages.findIndex(message => message.id === updatedMessage.id);
						if (index !== -1) {
								const updatedMessages = [...prevMessages];
								updatedMessages[index] = updatedMessage;
								return updatedMessages;
						}
						return prevMessages;
				});
		};
			if (SocketApi.socket) {
				SocketApi.socket.on('new-message', handleNewMessage)
				SocketApi.socket.on('delete-message', handleDeleteMessage)
				SocketApi.socket.on('update-message', handleUpdateMessage)
			}
		}
	}
	useEffect(() => {
		connectSocket()

		return () => {
			if (SocketApi.socket) {
				SocketApi.socket.off('new-message')
				SocketApi.socket.off('delete-message')
				SocketApi.socket.off('update-message')
			}
		}
	}, [chatId])

	return { message }
}
