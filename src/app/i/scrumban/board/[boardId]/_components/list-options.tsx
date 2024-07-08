'use client'

import { List, MoreHorizontal } from 'lucide-react'
import { Control, UseFormRegister, UseFormWatch } from 'react-hook-form'

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog'
import { TransparentField } from '@/components/ui/fields/TransparentField'
import Delete from '@/components/ui/items-options/delete'
import Description from '@/components/ui/items-options/description'
import ListType from '@/components/ui/items-options/list-type'

import { IListResponse, TypeListFormState } from '@/types/list.types'

import Copy from '../../../../../../components/ui/items-options/copy'
import { useListDebounce } from '../../../hooks/list/useListDebounce'

interface ListOptionsProps {
	data: IListResponse
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

	return (
		<Dialog>
			<DialogTrigger>
				<MoreHorizontal className=' hover:bg-accent hover:text-accent-foreground h-6 w-6 rounded-md p-1'/>
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
						<ListType control={control} />
						<Description
							register={register}
							placeholder='you can add a description to list'
						/>
					</div>
					<div className='flex flex-col gap-3'>
						<Delete listId={data.id} />
						<Copy
							listId={data.id}
							boardId={data.boardId}
						/>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}
