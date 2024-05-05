'use client'

import {
	AlignLeft,
	Copy,
	List,
	Loader,
	MoreHorizontal,
	Trash
} from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
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

import { IBoardResponse, TypeBoardFormState } from '@/types/board.types'

import { useAction } from '@/hooks/use-action'
import { useSocketConnect } from '@/hooks/useConnectSocket'

import SocketApi from '@/api/socket-api'

import { useBoardDebounce } from '../../../hooks/board/useBoardDebounce'
import { useDeleteBoard } from '../../../hooks/board/useDeleteBoard'

import { boardService } from '@/services/board.service'

interface IBoardTitleForm {
	board: IBoardResponse | undefined
}

export const BoardTitleForm = ({ board }: IBoardTitleForm) => {
	const [email, setEmail] = useState('')
	const [text, setText] = useState('')
	const [users, setUsers] = useState(board!.users)

	const { register, control, watch } = useForm<TypeBoardFormState>({
		defaultValues: {
			name: board?.name,
			createdAt: board?.createdAt,
			description: board?.description
		}
	})

	useBoardDebounce({ watch, boardId: board!.id })

	const { deleteBoard, isDeletePending } = useDeleteBoard()

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value)
	}
	const { execute: executeAddUserToBoard, isLoading: isLoadingAdding } =
		useAction(boardService.addUserToBoard.bind(boardService), {
			onSuccess: data => {
				setUsers([...users, data[1]])
				toast.success(`User "${data[1].name}" added`)
			},
			onError: error => {
				toast.error(error)
			}
		})

	const onAddUserToBoard = () => {
		const boardId = board!.id
		executeAddUserToBoard({ email, boardId })
		setEmail('')
	}

	const { messages } = useSocketConnect()
	const sendMessage = () => {
		SocketApi.socket?.emit('server-path', text)
		setText('')
	}

	return (
		<div className='flex w-full justify-between items-center border-b border-border p-2'>
			<div className='w-full'>
				<TransparentField
					className='text-lg w-[400px] font-bold px-[7px] h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-foreground'
					{...register('name')}
				/>
			</div>
			<div>
				<Dialog>
					<DialogTrigger>
						<MoreHorizontal className=' hover:bg-accent hover:text-accent-foreground h-6 w-6 rounded-md p-1' />
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle autoFocus={false}>
								<div className='flex gap-3'>
									<List />
									<TransparentField
										autoFocus={false}
										{...register('name')}
									/>
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
									<TransparentFieldTextarea {...register('description')} />
								</div>
							</div>
							<div className='flex flex-col gap-3'>
								<Button
									type='submit'
									size='sm'
									className='px-3'
									onClick={() => deleteBoard(board!.id)}
								>
									{isDeletePending ? <Loader size={15} /> : <Trash size={15} />}
									<span className='ml-1'>Delete</span>
								</Button>

								<Sheet>
									<SheetTrigger>
										<Button
											// onClick={onCopy}
											type='submit'
											size='sm'
											className='px-3'
										>
											<Copy className='h-4 w-4' />
											<span className='ml-1'>Copy</span>
										</Button>
									</SheetTrigger>
									<SheetContent>
										<SheetHeader>
											<SheetTitle>Are you absolutely sure?</SheetTitle>
											<SheetDescription>
												This action cannot be undone. This will permanently
												delete your account and remove your data from our
												servers.
											</SheetDescription>
										</SheetHeader>
										<div className='flex flex-col h-[50%] overflow-y-auto mb-5'>
											<ul className='gap-y-4 flex flex-col'>
												{messages.map((message, index) => (
													<li
														className='flex pl-3 items-center h-12 border border-border rounded-xl '
														key={index}
													>
														{message.dto}
													</li>
												))}
											</ul>
										</div>
										<SheetFooter>
											<Input
												value={text}
												onChange={e => setText(e.currentTarget.value)}
											/>

											<Button onClick={sendMessage}>Send</Button>
										</SheetFooter>
									</SheetContent>
								</Sheet>

								<div className='flex flex-col opacity-70 hover:opacity-100 cursor-pointer justify-start items-start gap-2 transition-opacity '>
									<div className='flex pl-1'>
										{users.slice(0, 5).map((user, index) => (
											<div
												key={user.id}
												className='flex justify-start -mr-5'
											>
												{user.avatar ? (
													<Avatar className='h-8 w-8 border border-border'>
														<AvatarImage src={user.avatar}></AvatarImage>
													</Avatar>
												) : (
													<Avatar className='h-8 w-8 border border-border'>
														<AvatarFallback>
															{user.name
																? user.name.charAt(0).toUpperCase()
																: 'A'}
														</AvatarFallback>
													</Avatar>
												)}
											</div>
										))}
									</div>
									{users.length > 5 && (
										<div className=' flex pl-2 justify-start items-center'>
											<span className='text-gray-500 text-xs'>
												and {users.length - 5} other
											</span>
										</div>
									)}
								</div>
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
									/>

									<Button onClick={onAddUserToBoard}>Add</Button>
								</div>
							</div>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>
		</div>
	)
}
