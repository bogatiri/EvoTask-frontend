'use client'

import { Controller, useForm } from 'react-hook-form'

import { TransparentField } from '@/components/ui/fields/TransparentField'
import { TypeSelect } from '@/components/ui/list-edit/TypeSelect'

import { IListResponse, TypeListFormState, TypeListUpdateFormState } from '@/types/list.types'

import { useListDebounce } from '../../../hooks/list/useListDebounce'

import { ListOptions } from './list-options'
import { SingleSelect } from '@/components/ui/task-edit/SingleSelect'

interface ListHeaderProps {
	data: IListResponse
	onAddCard: () => void
	onListDelete: (id: string) => void
	onListCopy: (newCard: IListResponse) => void
}

export const ListHeader = ({
	data,
	onAddCard,
	onListDelete,
	onListCopy
}: ListHeaderProps) => {
	const { register, control, watch } = useForm<TypeListUpdateFormState>({
		defaultValues: {
			name: data?.name,
			description: data?.description,
			order: data?.order,
			type: data?.type
		}
	})
	useListDebounce({ watch, listId: data!.id })

	return (
		<div className='pt-2 px-2 text-sm  rounded-md m-2 font-semibold flex justify-between items-start- gap-x-2'>
			<div className='flex rounded-md w-full flex-col gap-3 '>
				<div className='flex'>
				<TransparentField {...register('name')} />
				<ListOptions
				onListCopy={onListCopy}
				onListDelete={onListDelete}
				onAddCard={onAddCard}
				data={data}
				register={register}
				control={control}
				watch={watch}
			/>
				</div>
				<div className='grid grid-cols-2 gap-2'>
					<Controller
						control={control}
						name='type'
						render={({ field: { value, onChange } }) => (
							<TypeSelect
								data={['backlog', 'to_do', 'in_progress', 'done'].map(item => ({
									value: item,
									label: item
								}))}
								onChange={onChange}
								value={value || ''}
							/>
						)}
					/>
					<p className='justify-self-center text-xs'>
						{data.cards?.length} cards this list
					</p>
				</div>
			</div>
		</div>
	)
}
