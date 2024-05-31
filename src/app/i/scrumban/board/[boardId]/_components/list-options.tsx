'use client'

import { Copy, List, MoreHorizontal, Trash } from 'lucide-react'
import {
	Control,
	Controller,
	UseFormRegister,
	UseFormWatch
} from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog'
import { TransparentField } from '@/components/ui/fields/TransparentField'
import { TransparentFieldTextarea } from '@/components/ui/fields/TransparentFieldTextarea'
import { TypeSelect } from '@/components/ui/list-edit/TypeSelect'

import { IListResponse, TypeListFormState } from '@/types/list.types'

import { useCopyList } from '../../../hooks/list/useCopyList'
import { useDeleteList } from '../../../hooks/list/useDeleteList'
import { useListDebounce } from '../../../hooks/list/useListDebounce'

interface ListOptionsProps {
	data: IListResponse | undefined
	register: UseFormRegister<TypeListFormState>
	control: Control<TypeListFormState>
	watch: UseFormWatch<TypeListFormState>
}

export const ListOptions = ({
	data,
	register,
	control,
	watch
}: ListOptionsProps) => {
	useListDebounce({ watch, listId: data!.id })

	const { deleteList, isDeletePending } = useDeleteList()

	const onDelete = (event: React.MouseEvent) => {
		event.stopPropagation()
		deleteList(data!.id)
	}

	const { copyList, isPending } = useCopyList()

	const onCopy = (event: React.MouseEvent) => {
		event.stopPropagation()
		const listId = data!.id
		const boardId = data!.boardId
		copyList({ listId, boardId })
	}


	return (
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
						<div className='w-[35%]'>
							<Controller
								control={control}
								name='type'
								render={({ field: { value, onChange } }) => (
									<TypeSelect
										data={['backlog', 'to_do', 'in_progress', 'done'].map(
											item => ({
												value: item,
												label: item
											})
										)}
										onChange={onChange}
										value={value || ''}
									/>
								)}
							/>
						</div>
						<div className='w-full'>
							<TransparentFieldTextarea {...register('description')} />
						</div>
					</div>
					<div className='flex flex-col gap-3'>
					
						<Button
							type='submit'
							size='sm'
							className='px-3'
							onClick={onDelete}
						>
							<Trash size={15} />
							<span className='ml-1'>Delete</span>
						</Button>
						<Button
							onClick={onCopy}
							type='submit'
							size='sm'
							className='px-3'
						>
							<Copy className='h-4 w-4' />
							<span className='ml-1'>Copy</span>
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}
