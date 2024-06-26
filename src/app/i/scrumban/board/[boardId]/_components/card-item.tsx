'use client'

import { ChevronDown, ChevronUp, GripVertical, Settings } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TransparentField } from '@/components/ui/fields/TransparentField'
import CardCheckbox from '@/components/ui/items-options/card-checkbox'
import CardPoints from '@/components/ui/items-options/card-points'
import CardPriority from '@/components/ui/items-options/card-priority'

import { ICardResponse, TypeCardFormState } from '@/types/card.types'

import { useCardDebounce } from '../../../hooks/card/useCardDebounce'

import CardModalContent from './card-modal-content'
import { IListResponse } from '@/types/list.types'

interface CardItemProps {
	data: ICardResponse
	orderedData?:IListResponse[]
	boardId: string
}

const CardItem = ({ data, boardId, orderedData }: CardItemProps) => {
	const [isSubtaskVisible, setIsSubtaskVisible] = useState(
		data?.isSubtaskVisible
	)

	const { register, control, watch, setValue } = useForm<TypeCardFormState>({
		defaultValues: {
			name: data?.name,
			completed: data.completed,
			updatedAt: data?.updatedAt,
			priority: data?.priority,
			description: data?.description,
			list: data!.list,
			order: data?.order,
			points: data?.points,
			isSubtaskVisible: data?.isSubtaskVisible
		}
	})

	useEffect(() => {
		setValue('completed', data.completed)
	}, [data])

	const ShowSubTasks = () => {
		setIsSubtaskVisible(!isSubtaskVisible)
		setValue('isSubtaskVisible', !isSubtaskVisible)
	}

	useCardDebounce({ watch, cardId: data!.id })

	return (
		<>
			<div
				className={`flex flex-col  border ${data.completed && 'opacity-60 hover:opacity-100'} bg-[#0e0f0f] border-border ${data.parentId ? 'p-2' : 'py-2 px-3 '} rounded-lg hover:border-black`}
			>
				<Dialog>
					<div className='flex md:items-center'>
						<div
							onClick={event => event.stopPropagation()}
							className='flex w-full gap-x-3 text-sm items-center justify-center'
						>
							<CardCheckbox control={control} />
							<TransparentField
								className='text-xs'
								{...register('name')}
							/>
						</div>
						{!data.parentId && (
							<GripVertical className='hidden md:block cursor-grab active:cursor-grabbing opacity-45 hover:opacity-100' />
						)}
						<DialogTrigger className='md:hidden opacity-45 hover:opacity-100'>
							<Settings />
						</DialogTrigger>
					</div>
					<DialogTrigger className='hidden md:block'>
						{!data.parentId && (
							<div className='hidden md:flex items-center w-full mt-3 gap-3  text-sm  rounded-md shadow-sm justify-start'>
								<CardPriority control={control} />
								<CardPoints control={control} />
							</div>
						)}
					</DialogTrigger>
					{!data.parentId && data.subtasks.length > 0 && (
						<div
							className='cursor-pointer'
							onClick={() => ShowSubTasks()}
						>
							{!isSubtaskVisible ? (
								<div className='flex text-xs items-center gap-3 justify-start'>
									<ChevronDown size={20} />
									<span className=''>Show subtasks</span>
								</div>
							) : (
								<div className='flex text-xs items-center gap-3 justify-start'>
									<ChevronUp size={20} />
									<span className=''>Hide subtasks</span>
								</div>
							)}
						</div>
					)}
					{isSubtaskVisible &&
						data.subtasks &&
						data.subtasks?.map(subtask => (
							<CardItem
								orderedData={orderedData}
								boardId={boardId}
								key={subtask.id}
								data={subtask}
							/>
						))}
					<CardModalContent
						orderedData={orderedData}
						data={data}
						boardId={boardId}
						register={register}
						control={control}
					/>
				</Dialog>
			</div>
		</>
	)
}

export default CardItem
