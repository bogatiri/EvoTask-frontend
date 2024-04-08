'use client'

import { Draggable } from '@hello-pangea/dnd'
import { Trash } from 'lucide-react'
import { toast } from 'sonner'

import { ICardResponse } from '@/types/card.types'

import { useAction } from '@/hooks/use-action'

import { useCardModal } from '../../../hooks/card/use-card-modal'

import { cardService } from '@/services/card.service'

interface CardItemProps {
	data: ICardResponse | undefined
	index: number
	onDeleteCard: (id: string) => void
}

export const CardItem = ({ data, index, onDeleteCard }: CardItemProps) => {
	const cardModal = useCardModal()

	const handleOpenModal = () => {
		cardModal.onOpen(data!.id)
	}

	const { execute: executeDeleteCard, isLoading: isLoadingDelete } = useAction(
		cardService.deleteCard.bind(cardService),
		{
			onSuccess: data => {
				onDeleteCard(data.id)
				toast.success(`Card "${data.id}" deleted`)
			},
			onError: error => {
				toast.error(error)
			}
		}
	)

	const onDelete = () => {
		executeDeleteCard(data!.id)
	}

	return (
		<Draggable
			draggableId={data!.id}
			index={index}
		>
			{provided => (
				<>
					<div
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						ref={provided.innerRef}
						role='button'
						onClick={handleOpenModal}
						className='truncate flex border-2 border-transparent hover:border-black py-2 text-foreground px-3 text-sm bg-white rounded-md shadow-sm'
					>
						{data?.name}
					</div>
					<div>
						<Trash
							onClick={onDelete}
							className='hover:cursor-pointer'
						/>
					</div>
				</>
			)}
		</Draggable>
	)
}
