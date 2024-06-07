'use client'

import { useForm } from 'react-hook-form'

import { TransparentField } from '@/components/ui/fields/TransparentField'
import ListType from '@/components/ui/items-options/list-type'

import { IListResponse, TypeListUpdateFormState } from '@/types/list.types'

import { useListDebounce } from '../../../hooks/list/useListDebounce'

import { ListOptions } from './list-options'

interface ListHeaderProps {
	data: IListResponse
}

const ListHeader = ({ data }: ListHeaderProps) => {
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
		<div className=' list-item pt-2 px-2 text-sm  rounded-md m-2 font-semibold  justify-between items-start- gap-x-2'>
			<div className='flex rounded-md w-full flex-col gap-3 '>
				<div className='flex'>
					<TransparentField {...register('name')} />
					<ListOptions
						data={data}
						register={register}
						control={control}
						watch={watch}
					/>
				</div>
				<div className='grid grid-cols-2 gap-2'>
					<ListType control={control} />
					<p className='justify-self-center text-xs'>
						{data.cards?.length} cards this list
					</p>
				</div>
			</div>
		</div>
	)
}

export default ListHeader
