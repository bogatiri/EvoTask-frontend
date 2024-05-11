'use client'

import {
	AlertCircle,
	AlignLeft,
	CalendarX2,
	Copy,
	GripVertical,
	MessageCircle,
	Paperclip,
	Send,
	Trash
} from 'lucide-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import Checkbox from '@/components/ui/check'
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
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui/popover'
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger
} from '@/components/ui/sheet'
import { SingleSelect } from '@/components/ui/task-edit/SingleSelect'
import { DatePicker } from '@/components/ui/task-edit/date-picker/DatePicker'

import { ICardResponse, TypeCardFormState } from '@/types/card.types'

import { useBoardId } from '../../../hooks/board/useBoardId'
import { useAddUserToCard } from '../../../hooks/card/useAddUserToCard'
import { useCardDebounce } from '../../../hooks/card/useCardDebounce'
import { useCopyCard } from '../../../hooks/card/useCopyCard'
import { useDeleteCard } from '../../../hooks/card/useDeleteCard'

interface CardItemProps {
	data: ICardResponse
}

export const CardItem = ({ data }: CardItemProps) => {
	const [email, setEmail] = useState('')
	const creator = data.users[0]

	const { copyCard } = useCopyCard()

	const { deleteCard, isDeletePending } = useDeleteCard()

	const { addUserToCard, isPending } = useAddUserToCard()

	const { board, isLoading: isBoardLoading } = useBoardId()

	const boardId = board!.id

	const onAddUserToCard = () => {
		const cardId = data?.id
		addUserToCard({ email, boardId, cardId })
		setEmail('')
	}
	const { register, control, watch } = useForm<TypeCardFormState>({
		defaultValues: {
			name: data?.name,
			completed: data?.completed,
			updatedAt: data?.updatedAt,
			priority: data?.priority,
			description: data?.description,
			list: data!.list,
			order: data?.order
		}
	})

	useCardDebounce({ watch, cardId: data!.id })

	const onDelete = (event: React.MouseEvent) => {
		event.stopPropagation()
		deleteCard(data!.id)
	}

	const onCopy = (event: React.MouseEvent) => {
		event.stopPropagation()
		const cardId = data!.id
		const listId = data!.list
		copyCard({ cardId, listId })
	}

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value)
	}

	return (
		<>
			<div className='flex flex-col gap-y-5 border bg-[#0e0f0f] border-border py-2 px-3 rounded-md hover:border-black'>
				<Dialog>
					<DialogTrigger>
						<div className='flex flex-col  gap-y-3  text-sm  rounded-md shadow-sm justify-between'>
							<div
								className='flex gap-x-3'
								onClick={event => event.stopPropagation()}
							>
								<Controller
									control={control}
									name='completed'
									render={({ field: { value, onChange } }) => (
										<Checkbox
											onChange={onChange}
											checked={value}
											color='green'
										/>
									)}
								/>

								<div onClick={event => event.stopPropagation()}>
									<TransparentField {...register('name')} />
								</div>

								<GripVertical className='opacity-45 hover:opacity-100' />
							</div>
							<div className='flex mt-4 items-center justify-between w-full'>
								<div className='flex gap-2'>
									<span className='flex items-center justify-center text-xs opacity-50'>
										Priority:
									</span>
									<Controller
										control={control}
										name='priority'
										render={({ field: { value, onChange } }) => (
											<SingleSelect
												data={['high', 'medium', 'low'].map(item => ({
													value: item,
													label: item
												}))}
												onChange={onChange}
												value={value || ''}
											/>
										)}
									/>
								</div>
								<Trash
									size={15}
									onClick={onDelete}
									className='hover:cursor-pointer mr-2'
								/>
							</div>
						</div>
					</DialogTrigger>
					<DialogContent className='sm:max-w-md md:max-w-xl xl:max-w-2xl'>
						<DialogHeader>
							<DialogTitle>
								<div className='flex gap-4 items-center'>
									<Controller
										control={control}
										name='completed'
										render={({ field: { value, onChange } }) => (
											<Checkbox
												onChange={onChange}
												checked={value}
												color='green'
											/>
										)}
									/>
									<TransparentField {...register('name')} />
									<div className='flex gap-2 justify-center items-center mr-5'>
										<p className='font-semibold text-sm text-neutral-700 mb-2'>
											Creator:
										</p>

										<div className='flex gap-1 items-center justify-center'>
											{creator.avatar ? (
												<Avatar className='h-8 w-8 border border-border'>
													<AvatarImage src={creator.avatar}></AvatarImage>
												</Avatar>
											) : (
												<Avatar className='h-8 w-8 border border-border'>
													<AvatarFallback>
														{creator.name
															? creator.name.charAt(0).toUpperCase()
															: creator.email.charAt(0).toUpperCase()}
													</AvatarFallback>
												</Avatar>
											)}
											<p className='font-semibold flex items-center justify-center text-sm text-neutral-700 mb-2'>
												{creator.name ? creator.name : creator.email}
											</p>
										</div>
									</div>
								</div>
							</DialogTitle>
							<DialogDescription>
								You can change all of this attributes
							</DialogDescription>
						</DialogHeader>
						<div className='grid grid-cols-[0.5fr_1.1fr_1fr] gap-2 items-center space-x-2'>
							<div className='grid gap-1 flex-1'>
								<div className='border border-border rounded-md p-2'>
									<div className='flex gap-x-3'>
										<AlertCircle size={18} />
										<p className='font-semibold text-sm text-neutral-700 mb-2'>
											Priority
										</p>
									</div>
									<Controller
										control={control}
										name='priority'
										render={({ field: { value, onChange } }) => (
											<SingleSelect
												data={['high', 'medium', 'low'].map(item => ({
													value: item,
													label: item
												}))}
												onChange={onChange}
												value={value || ''}
											/>
										)}
									/>
								</div>
							</div>
							<div className='grid border border-border gap-y-1 rounded-md p-2'>
								<div className='flex gap-x-3 '>
									<CalendarX2 size={18} />
									<p className='font-semibold text-sm text-neutral-700 mb-2'>
										Date end
									</p>
								</div>
								<Controller
									control={control}
									name='updatedAt'
									render={({ field: { value, onChange } }) => (
										<DatePicker
											onChange={onChange}
											value={value || ''}
											position='right'
										/>
									)}
								/>
							</div>
							<div className='flex flex-col gap-y-2 border border-border p-2 rounded-md'>
								<Button
									onClick={onCopy}
									type='submit'
									size='sm'
									className='px-3'
								>
									<Copy className='h-4 w-4' />
									<span className='ml-1'>Copy</span>
								</Button>
								<Button
									type='submit'
									size='sm'
									className='px-3'
									onClick={onDelete}
								>
									<Trash size={15} />
									<span className='ml-1'>Delete</span>
								</Button>
								<Popover>
									<PopoverTrigger>
										{data.users.length > 0 ? (
											<div className='flex flex-col opacity-70 hover:opacity-100 cursor-pointer justify-start items-start gap-2 transition-opacity '>
												<div className='flex pl-1'>
													{data.users.slice(0, 5).map((user, index) => (
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
																			: user.email.charAt(0).toUpperCase()}
																	</AvatarFallback>
																</Avatar>
															)}
														</div>
													))}
												</div>
												{data.users.length > 5 && (
													<div className=' flex pl-2 justify-start items-center'>
														<span className='text-gray-500 text-xs'>
															and {data.users.length - 5} other
														</span>
													</div>
												)}
											</div>
										) : (
											<span>no users </span>
										)}
									</PopoverTrigger>
									<PopoverContent className='w-auto min-w-[210px] p-0 rounded-xl'>
										<Command>
											<CommandGroup className='w-auto'>
												{data.users.length > 0 ? (
													data.users?.map((user, index) => (
														<div
															key={user.id}
															className='flex gap-1 cursor-pointer opacity-70 hover:opacity-100 border-b p-1  justify-between mt-2 items-center '
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
						<div className=' w-full'>
							<div className='flex gap-x-3'>
								<AlignLeft className='h-5 w-5 mt-0.5 text-neutral-700' />
								<p className='font-semibold text-neutral-700 mb-2'>
									Description
								</p>
							</div>
							<TransparentFieldTextarea {...register('description')} />
						</div>
						<DialogFooter className='sm:justify-start'>
							<div className=' w-full flex gap-3 justify-between'>
								<Input
									className='w-full'
									placeholder='write an email of user that you want to add'
									onChange={handleInputChange}
									value={email}
									type='email'
									onKeyDown={e => {
										if (e.key === 'Enter' && !e.shiftKey) {
											e.preventDefault() // Предотвратить перенос на новую строку
											onAddUserToCard()
										}
									}}
								/>

								<Button onClick={onAddUserToCard}>Add</Button>
							</div>
							<Sheet>
								<SheetTrigger>
									<div className='w-15 bg-primary px-3  py-5 rounded-md h-6 flex  justify-between items-center'>
										<MessageCircle className='h-5 w-5' />
										<span className='ml-1'>Chat</span>
									</div>
								</SheetTrigger>
								<SheetContent>
									<SheetHeader>
										<SheetTitle>{data.name}</SheetTitle>
										<SheetDescription>
											This action cannot be undone. This will permanently delete
											your account and remove your data from our servers.
										</SheetDescription>
									</SheetHeader>
									<div className='h-[70%] mt-5 border border-border rounded-md flex'></div>
									<SheetFooter>
										<div className='flex relative bottom-0 items-center mt-5 gap-2 w-full'>
											<Paperclip
												size={28}
												className='opacity-50 hover:opacity-100 cursor-pointer'
											/>
											<Input placeholder='Message...'></Input>

											<Send />
										</div>
									</SheetFooter>
								</SheetContent>
							</Sheet>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>
		</>
	)
}
