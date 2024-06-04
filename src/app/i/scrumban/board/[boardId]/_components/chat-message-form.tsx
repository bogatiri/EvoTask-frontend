import { useEffect, useRef, useState } from 'react'

import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger
} from '@/components/ui/context-menu'
import User from '@/components/ui/items-options/user'

import { IMessageResponse } from '@/types/message.types'

import SocketApi from '@/api/socket-api'

import ChatMessage from './chat-message'

interface IChatMesageFormProps {
	message: IMessageResponse
}

const ChatMessageForm = ({  message }: IChatMesageFormProps) => {
	const currentUser = localStorage.getItem('userId')
	const [editingMessageId, setEditingMessageId] = useState('')
	const [textUpdatedMessage, setTextUpdatedMessage] = useState('')
	const inputRef = useRef<HTMLInputElement>(null)

	const deleteMessage = (id: string) => {
		SocketApi.socket?.emit('delete-message', { id })
	}

	const updateMessage = (id: string) => {
		SocketApi.socket?.emit('update-message', { id, textUpdatedMessage })
		setTextUpdatedMessage('')
		setEditingMessageId('')
	}

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [editingMessageId, updateMessage])

	const handleClickOutside = (event: MouseEvent) => {
		if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
			updateMessage(editingMessageId)
		}
	}

	return (
		<div
			className='flex '
		>
			{message.userId !== currentUser && <User userToAvatar={message.user} />}
			<ContextMenu>
				<ContextMenuTrigger
					className={`rounded-lg px-4 py-2 max-w-xs ${message.userId === currentUser ? 'ml-auto bg-blue-500 text-white' : 'mr-auto bg-gray-900'} `}
				>
					<li >
						{message.userId !== currentUser && (
							<div className='flex mb-1 justify-start items-center '>
								{message.user.name ? (
									<span className='font-bold font-mono'>
										{message.user.name}
									</span>
								) : (
									<span className='font-bold font-mono'>
										{message.user.email}
									</span>
								)}
							</div>
						)}
						<ChatMessage
							updateMessage={updateMessage}
							message={message}
							editingMessageId={editingMessageId}
							textUpdatedMessage={textUpdatedMessage}
							setTextUpdatedMessage={setTextUpdatedMessage}
						/>
					</li>
				</ContextMenuTrigger>
				{message.userId === currentUser && (
					<ContextMenuContent>
						<ContextMenuItem onClick={() => deleteMessage(message.id)}>
							Delete
						</ContextMenuItem>
						<ContextMenuItem
							onClick={() => {
								setEditingMessageId(message.id)
								setTextUpdatedMessage(message.text)
							}}
						>
							Edit
						</ContextMenuItem>
					</ContextMenuContent>
				)}
			</ContextMenu>
		</div>
	)
}

export default ChatMessageForm
