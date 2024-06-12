import { MessageCircle, SendHorizonal } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { Separator } from '@/components/ui/separator'
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger
} from '@/components/ui/sheet'
import { Textarea } from '@/components/ui/textarea'

import { IMessageResponse } from '@/types/message.types'

import { useSocketConnect } from '@/hooks/useConnectSocket'

import SocketApi from '@/api/socket-api'

import ChatMessageForm from './chat-message-form'

interface IBoardChatProps {
	messages: IMessageResponse[]
	chatId: string
	onMessageSend: (message: IMessageResponse[]) => void
}

const BoardChat = ({ messages, chatId, onMessageSend }: IBoardChatProps) => {
	const [text, setText] = useState('')

	const messagesEndRef = useRef<HTMLDivElement>(null)

	const { message } = useSocketConnect(chatId, messages)

	const sendMessage = () => {
		SocketApi.socket?.emit('send-message', { text, chatId })
		setText('')
		setTimeout(() => {
			if (messagesEndRef.current) {
				messagesEndRef.current.scrollIntoView({
					behavior: 'smooth',
					block: 'end',
					inline: 'nearest'
				})
			}
		}, 100)
	}

	useEffect(() => {
		onMessageSend(message)
	}, [message])

	return (
		<Sheet>
			<SheetTrigger>
				<div className='flex justify-center items-center h-10 rounded-md px-3 border border-input bg-background hover:bg-accent hover:text-accent-foreground'>
					<MessageCircle className='hidden md:block h-4 w-4' />
					<span className=' text-sm mx-3 my-1.5'>Chat</span>
				</div>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Messages</SheetTitle>
					<SheetDescription>
						You can chat here with other members of this board
					</SheetDescription>
				</SheetHeader>
				<div className='flex flex-col h-full'>
					<div className='space-y-2  h-full max-h-[75%] md:max-h-[80%] overflow-y-auto overflow-x-hidden custom-scrollbar flex flex-col p-4 pl-0'>
						{messages?.map((message, index) => (
							<ChatMessageForm
								message={message}
								key={index}
							/>
						))}
						<div ref={messagesEndRef}></div>
					</div>
					<Separator />
					<SheetFooter className='w-full'>
						<div className='flex items-center w-full gap-2 mt-3 ml-1 relative'>
							{' '}
							{/* Добавлен класс relative */}
							<Textarea
								maxLength={500}
								value={text}
								onChange={e => setText(e.currentTarget.value)}
								className='resize-none '
								onKeyDown={e => {
									if (e.key === 'Enter' && !e.shiftKey) {
										e.preventDefault()
										sendMessage()
									}
								}}
							/>
							<div
								className='opacity-70 hover:opacity-100 cursor-pointer hover:bg-blueSecondary rounded-md p-3'
								onClick={sendMessage}
							>
								<SendHorizonal />
							</div>
							{/* Элемент для отображения счётчика символов */}
							<div className='absolute bottom-0 right-0 mr-2 mb-2 text-sm text-gray-600'>
								{text.length} / 500
							</div>
						</div>
					</SheetFooter>
				</div>
			</SheetContent>
		</Sheet>
	)
}

export default BoardChat
