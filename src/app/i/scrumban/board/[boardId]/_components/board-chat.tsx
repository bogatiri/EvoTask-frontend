import { MessageCircle, SendHorizonal } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger
} from '@/components/ui/context-menu'
import { Input } from '@/components/ui/input'
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger
} from '@/components/ui/sheet'
import { Textarea } from '@/components/ui/textarea'

import { IMessageResponse } from '@/types/message.types'

import { useSocketConnect } from '@/hooks/useConnectSocket'

import SocketApi from '@/api/socket-api'

interface IBoardChatProps {
	messages: IMessageResponse[]
	chatId: string
	onMessageSend: (message: IMessageResponse[]) => void
}

const BoardChat = ({ messages, chatId, onMessageSend }: IBoardChatProps) => {
	const currentUser = localStorage.getItem('userId')
	const [editingMessageId, setEditingMessageId] = useState('')
	const [textUpdatedMessage, setTextUpdatedMessage] = useState('')
	const messagesEndRef = useRef<HTMLDivElement>(null)
	const [text, setText] = useState('')
	const inputRef = useRef<HTMLInputElement>(null)
	const handleInputMessageEdited = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setTextUpdatedMessage(event.target.value)
	}

	const { message } = useSocketConnect(chatId, messages)

	useEffect(() => {
		onMessageSend(message)
	}, [message])

	const sendMessage = () => {
		SocketApi.socket?.emit('send-message', { text, chatId })
		setText('')
		if (messagesEndRef.current) {
			messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
		}
	}

	const deleteMessage = (id: string) => {
		SocketApi.socket?.emit('delete-message', { id })
	}

	const updateMessage = (id: string) => {
		SocketApi.socket?.emit('update-message', { id, textUpdatedMessage })
		setTextUpdatedMessage('')
		setEditingMessageId('')
	}

	const formatDate = (isoString: string) => {
		const date = new Date(isoString)

		date.setHours(date.getHours())

		return date.toLocaleTimeString('en-GB', {
			hour: '2-digit',
			minute: '2-digit',
			hour12: false
		})
	}

	const urlPattern = new RegExp(
		'^(https?:\\/\\/)' + // Протокол (http или https)
			'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,6}|' + // Доменное имя
			'((\\d{1,3}\\.){3}\\d{1,3}))' + // IPv4 адрес
			'(\\:\\d+)?' + // Порт
			'(\\/[-a-z\\d%_.~+]*)*' + // Путь
			'(\\?[;&a-z\\d%_.~+=-]*)?' + // Параметры запроса
			'(\\#[-a-z\\d_]*)?$', // Якорь
		'i'
	)

	const isUrl = (textMessage: string) => {
		return urlPattern.test(textMessage)
	}

	useEffect(() => {
		if (editingMessageId && inputRef.current) {
			inputRef.current.focus()
		}

		const handleClickOutside = (event: MouseEvent) => {
			if (
				inputRef.current &&
				!inputRef.current.contains(event.target as Node)
			) {
				updateMessage(editingMessageId)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [editingMessageId, updateMessage])

	return (
		<div>
			<Sheet>
				<SheetTrigger>
					<div className='flex justify-center items-center h-10 rounded-md px-3 border border-input bg-background hover:bg-accent hover:text-accent-foreground'>
						<MessageCircle className='h-4 w-4' />
						<span className='text-sm mx-3 my-1.5'>Chat</span>
					</div>
				</SheetTrigger>
				<SheetContent>
					<SheetHeader>
						<SheetTitle>Messages</SheetTitle>
						<SheetDescription>
							You can chat here with other members of this board
						</SheetDescription>
					</SheetHeader>
					<div className='flex flex-col mt-auto h-full  mb-5'>
						<ul className='space-y-2 max-h-[85%] overflow-y-auto flex flex-col p-4'>
							{messages?.map((message, index) => (
								<div
									className='flex gap-2'
									key={index}
								>
									{message.userId !== currentUser && (
										<Link
											href={`/i/profile/${message.userId}`}
											key={message.userId}
										>
											<div className='flex items-center'>
												{message.user.avatar ? (
													<Avatar className='h-8 w-8 border border-border'>
														<AvatarImage
															src={message.user.avatar}
														></AvatarImage>
													</Avatar>
												) : (
													<Avatar className='h-8 w-8 border border-border'>
														<AvatarFallback>
															{message.user.name
																? message.user.name.charAt(0).toUpperCase()
																: message.user.email.charAt(0).toUpperCase()}
														</AvatarFallback>
													</Avatar>
												)}
											</div>
										</Link>
									)}
									<ContextMenu>
										<ContextMenuTrigger
											className={`rounded-lg px-4 py-2 max-w-xs ${message.userId === currentUser ? 'ml-auto bg-blue-500 text-white' : 'mr-auto bg-gray-900'} `}
										>
											<li key={index}>
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
												<div className='flex justify-between gap-4'>
													{editingMessageId === message.id ? (
														<Input
															ref={inputRef}
															type='text'
															value={textUpdatedMessage}
															onChange={handleInputMessageEdited}
															className='text-black underline break-all max-w-[200px] text-sm'
															onKeyDown={e => {
																if (e.key === 'Enter' && !e.shiftKey) {
																	e.preventDefault()
																	updateMessage(message.id)
																}
															}}
															onBlur={() => updateMessage(message.id)}
														/>
													) : isUrl(message.text) ? (
														<a
															href={message.text}
															target='_blank'
															rel='noopener noreferrer'
															className='text-black underline break-all max-w-[200px] text-sm'
														>
															{message.text}
														</a>
													) : (
														<span className='block break-all max-w-[200px] text-sm'>
															{message.text}
														</span>
													)}
													<div className='flex gap-2'>
														{message.createdAt !== message.updatedAt &&
															editingMessageId !== message.id && (
																<span className='block text-xs text-right text-gray-600 self-end'>
																	edited
																</span>
															)}
														<span className='block text-xs text-right text-gray-600 self-end'>
															{formatDate(message.createdAt)}
														</span>
													</div>
												</div>
											</li>
										</ContextMenuTrigger>
										{message.userId === currentUser && (
											<ContextMenuContent>
												<ContextMenuItem
													onClick={() => deleteMessage(message.id)}
												>
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
							))}
							<div ref={messagesEndRef}></div>
						</ul>

						<div className='flex items-center gap-2 mt-3 ml-1'>
							<Textarea
								value={text}
								onChange={e => setText(e.currentTarget.value)}
								className='resize-none'
								onKeyDown={e => {
									if (e.key === 'Enter' && !e.shiftKey) {
										e.preventDefault()
										sendMessage()
									}
								}}
							/>
							<div className='flex items-end'>
								<div
									className='opacity-70 hover:opacity-100 cursor-pointer hover:bg-blueSecondary rounded-md p-3'
									onClick={sendMessage}
								>
									<SendHorizonal />
								</div>
							</div>
						</div>
					</div>
				</SheetContent>
			</Sheet>
		</div>
	)
}

export default BoardChat
