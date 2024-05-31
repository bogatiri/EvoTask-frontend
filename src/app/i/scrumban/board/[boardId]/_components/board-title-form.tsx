'use client'

import {
	AlignLeft,
	ChevronsUpDown,
	CornerDownLeft,
	List,
	Loader,
	MoreHorizontal,
	Plus,
	Settings,
	Trash
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { PawPrint } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Command, CommandGroup } from '@/components/ui/command'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog'
import { TransparentField } from '@/components/ui/fields/TransparentField'
import { TransparentFieldTextarea } from '@/components/ui/fields/TransparentFieldTextarea'
import { Input } from '@/components/ui/input'
import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarSeparator,
	MenubarTrigger
} from '@/components/ui/menubar'
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'

import { IBoardResponse, TypeBoardFormState } from '@/types/board.types'
import { IMessageResponse } from '@/types/message.types'

import { useAddUserToBoard } from '../../../hooks/board/useAddUserToBoard'
import { useBoardDebounce } from '../../../hooks/board/useBoardDebounce'
import { useDeleteBoard } from '../../../hooks/board/useDeleteBoard'
import { useCreateSprint } from '../../../hooks/sprint/useCreateSprint'
import { useSprints } from '../../../hooks/sprint/useSprints'

import BoardChat from './board-chat'
import BoardRoles from './board-roles'

import SprintNavbar from './sprint-navbar'

interface IBoardTitleForm {
	board: IBoardResponse 
	onSprintPick: (sprintId: string) => void
	backToMainBoard: () => void
}

export const BoardTitleForm = ({
	board,
	onSprintPick,
	backToMainBoard
}: IBoardTitleForm) => {
	const [email, setEmail] = useState('')

	const [messages, setMessages] = useState(board!.chats[0].messages)

	const { deleteBoard, isDeletePending } = useDeleteBoard()
	const { createSprint } = useCreateSprint()
	const { addUserToBoard } = useAddUserToBoard()

	const { register, control, watch } = useForm<TypeBoardFormState>({
		defaultValues: {
			name: board?.name,
			createdAt: board?.createdAt,
			description: board?.description
		}
	})

	console.log('board', board)

	useBoardDebounce({ watch, boardId: board!.id })

	const onAddUserToBoard = () => {
		const boardId = board!.id
		addUserToBoard({ email, boardId })
		setEmail('')
	}

	const creator = board!.users[0]
	const chatId = board!.chats[0].id

	const onMessageSend = (message: IMessageResponse[]) => {
		setMessages(message)
	}

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value)
	}
	const { items, setItems } = useSprints(board!.id)

	const handleCreateSprint = () => {
		const boardId = board!.id
		createSprint({ boardId })
	}

	if (items?.length === 0) {
		backToMainBoard()
	}
console.log('asdasd')
	return (
		<>
			<div className='flex w-full justify-between items-center border-b border-border p-2 gap-2'>
				<div className='w-full flex flex-col gap-3'>
					<TransparentField
						className='text-lg w-[400px] font-bold px-[7px] h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-foreground'
						{...register('name')}
					/>
				</div>
				<BoardRoles
				roles={board.roles}
				users={board.users}
				/>
				<BoardChat
					messages={messages}
					chatId={chatId}
					onMessageSend={onMessageSend}
				/>
				<div>
					<Menubar>
						<MenubarMenu>
							<MenubarTrigger>
							<div className='flex justify-center items-center h-10 pl-3'>
						<PawPrint className='h-4 w-4' />
						<span className='text-sm mx-3 my-1.5'>Sprints</span>
					</div>
							</MenubarTrigger>
							<MenubarContent>
								<MenubarItem
									className='cursor-pointer'
									onClick={handleCreateSprint}
								>
									<span className='ml-1'>Create a new sprint</span> <Plus />
								</MenubarItem>
								<MenubarSeparator />
								{items?.map((item, index) => (
									<div key={index}>
										<div onClick={() => onSprintPick(item.id)}>
											<SprintNavbar
												item={item}
												index={index}
											/>
										</div>
										<MenubarSeparator />
									</div>
								))}
								<MenubarItem
									className='cursor-pointer'
									onClick={() => backToMainBoard()}
								>
									<span>Back to main board</span>
									<CornerDownLeft
										className='mr-1'
										size={16}
									/>
								</MenubarItem>
							</MenubarContent>
						</MenubarMenu>
					</Menubar>
				</div>
				<div>
					<Dialog>
							<div className='flex items-center justify-center h-10'>
						<DialogTrigger>
							<div className='flex justify-center items-center h-10 rounded-md px-3 border border-input bg-background hover:bg-accent hover:text-accent-foreground'>
						<Settings className='h-4 w-4' />
						<span className='text-sm mx-3 my-1.5'>Settings</span>
					</div>
						</DialogTrigger>
							</div>
						<DialogContent>
							<DialogHeader>
								<DialogTitle autoFocus={false}>
									<div className='flex gap-3'>
										<List />
										<TransparentField
											autoFocus={false}
											{...register('name')}
										/>
										<div className='flex gap-2 justify-center items-center mr-5'>
											<p className='font-semibold text-sm text-neutral-700 mb-2'>
												Creator:
											</p>

											<div className='flex gap-1 items-center justify-center'>
												<Avatar className='h-6 w-6 border border-border'>
													<AvatarImage src={creator.avatar}></AvatarImage>
												</Avatar>
												<p className='font-semibold flex items-center justify-center text-sm text-neutral-700 mb-2'>
													{creator.name}
												</p>
											</div>
										</div>
									</div>
								</DialogTitle>
								<DialogDescription>
									You can change all of this attributes
								</DialogDescription>
							</DialogHeader>
							<div className='flex flex-col-[0.5fr_1fr] justify-between gap-4'>
								<div className='flex flex-col gap-y-3 w-full'>
									<div className='w-[35%]'></div>
									<div className='w-full'></div>
									<div className=' w-full'>
										<div className='flex gap-x-3'>
											<AlignLeft className='h-5 w-5 mt-0.5 text-neutral-700' />
											<p className='font-semibold text-neutral-700 mb-2'>
												Description
											</p>
										</div>
										<TransparentFieldTextarea
											placeholder='You can write a description to your board'
											{...register('description')}
										/>
									</div>
								</div>
								<div className='flex flex-col gap-3'>
									<Button
										type='submit'
										size='sm'
										className='px-3'
										onClick={() => deleteBoard(board!.id)}
									>
										{isDeletePending ? (
											<Loader size={15} />
										) : (
											<Trash size={15} />
										)}
										<span className='ml-1'>Delete</span>
									</Button>

									<Popover>
										<PopoverTrigger>
											<div className='flex justify-between items-center'>
												<div className='flex flex-col opacity-70 hover:opacity-100 cursor-pointer justify-start items-start gap-2 transition-opacity '>
													<div className='flex pl-1'>
														{board!.users.slice(0, 4).map((user, index) => (
															<div
																key={user.id}
																className='flex justify-start -mr-5'
															>
																{user.avatar ? (
																	<Avatar className='h-8 w-8 border border-border'>
																		<AvatarImage
																			src={user.avatar}
																		></AvatarImage>
																	</Avatar>
																) : (
																	<Avatar className='h-8 w-8 border border-border'>
																		<AvatarFallback>
																			{user.name
																				? user.name.charAt(0).toUpperCase()
																				: user.email.charAt(0).toUpperCase()}
																		</AvatarFallback>
																	</Avatar>
																)}
															</div>
														))}
													</div>
													{board!.users.length > 4 && (
														<div className=' flex pl-2 justify-start items-center'>
															<span className='text-gray-500 text-xs'>
																and {board!.users.length - 4} other
															</span>
														</div>
													)}
												</div>
												<ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
											</div>
										</PopoverTrigger>
										<PopoverContent className='w-auto  p-0 rounded-xl'>
											<Command>
												<CommandGroup className='w-auto'>
													{board!.users.length > 0 ? (
														board!.users?.map((user, index) => (
															<Link
																href={`/i/profile/${user.id}`}
																key={user.id}
															>
																<div className='flex gap-1 w-full rounded-md cursor-pointer opacity-70 hover:opacity-100  p-1 justify-between mt-2 items-center '>
																	{user.avatar ? (
																		<Avatar className='h-8 w-8 border border-border'>
																			<AvatarImage
																				src={user.avatar}
																			></AvatarImage>
																		</Avatar>
																	) : (
																		<Avatar className='h-8 w-8 border border-border'>
																			<AvatarFallback>
																				{user.name
																					? user.name.charAt(0).toUpperCase()
																					: user.email.charAt(0).toUpperCase()}
																			</AvatarFallback>
																		</Avatar>
																	)}
																	{user.name ? (
																		<p className='font-semibold text-neutral-700 text-sm mb-2'>
																			{user.name}
																		</p>
																	) : (
																		<p className='font-semibold text-sm text-neutral-700 mb-2'>
																			{user.email}
																		</p>
																	)}
																</div>
															</Link>
														))
													) : (
														<div>no users</div>
													)}
												</CommandGroup>
											</Command>
										</PopoverContent>
									</Popover>
								</div>
							</div>

							<Separator />
							<DialogFooter className='sm:justify-start'>
								<div className='w-full'>
									<div className='flex -mr-3'></div>
									<div className=' w-full flex gap-3 justify-between'>
										<Input
											className='w-full'
											placeholder='write an email of user that you want to add'
											onChange={handleInputChange}
											value={email}
											onKeyDown={e => {
												if (e.key === 'Enter' && !e.shiftKey) {
													e.preventDefault()
													onAddUserToBoard()
												}
											}}
										/>

										<Button onClick={onAddUserToBoard}>Add</Button>
									</div>
								</div>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</div>
			</div>
		</>
	)
}
