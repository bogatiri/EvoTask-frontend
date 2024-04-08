'use client'

import { Draggable, Droppable } from '@hello-pangea/dnd'
import { ElementRef, useEffect, useRef, useState } from 'react'

import { ICardResponse } from '@/types/card.types'
import { IListResponse } from '@/types/list.types'

import { useCardById } from '../../../hooks/card/useCard'

import { CardForm } from './card-form'
import { CardItem } from './card-item'
import { ListHeader } from './list-header'
import { cn } from '@/lib/utils'


interface ListItemProps {
	list: IListResponse
	index: number
	onListDelete: (id: string) => void
}

export const ListItem = ({ list, index, onListDelete }: ListItemProps) => {
	const textareaRef = useRef<ElementRef<'textarea'>>(null)
	const [isEditing, setIsEditing] = useState(false)

	const { card, isLoading, error } = useCardById(list.id)

	const [cards, setCards] = useState<ICardResponse[]>([])

	useEffect(() => {
		setCards(card!)
	}, [card])

	const onCardCreate = (newCard: ICardResponse) => {
		const newCards = [...cards!, newCard]
		setCards(newCards)
	}

	const onDeleteCard = (id: string) => {
		setCards(cards.filter(card => card.id !== id))
		console.log(cards)
	}

	const disableEditing = () => {
		setIsEditing(false)
	}

	const enableEditing = () => {
		setIsEditing(true)
		setTimeout(() => {
			textareaRef.current?.focus()
		})
	}

	if (isLoading) return <div>Loading...</div>
	if (!isLoading && card !== undefined) {
		return (
			<Draggable
				draggableId={list!.id}
				index={index}
			>
				{provided => (
					<li
						{...provided.draggableProps}
						ref={provided.innerRef}
						className='shrink-0 top-30 h-full w-[272px] select-none'
					>
						<div
							{...provided.dragHandleProps}
							className='w-full rounded-md bg-[#f1f2f4] shadow-md pb-2'
						>
							<ListHeader
								onListDelete={onListDelete}
								onAddCard={enableEditing}
								data={list}
							/>
							<Droppable
								droppableId={list!.id}
								type='card'
							>
								{provided => (
									<ol
										ref={provided.innerRef}
										{...provided.droppableProps}
										className={cn('mx-1 px-1 py-0.5 flex flex-col gap-y-2')}
									>
										{list.cards &&
											list.cards.map((card, index) => (
												<CardItem
													onDeleteCard={onDeleteCard}
													index={index}
													key={card.id}
													data={card}
												/>
											))}
										{provided.placeholder}
									</ol>
								)}
							</Droppable>
							<CardForm
								onCardCreate={onCardCreate}
								listId={list!.id}
								ref={textareaRef}
								isEditing={isEditing}
								enableEditing={enableEditing}
								disableEditing={disableEditing}
							/>
						</div>
					</li>
				)}
			</Draggable>
		)
	}
}
