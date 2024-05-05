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
	onCardDelete: (listId: string, id: string) => void
	onCardCreate: (listId: string, newCard: ICardResponse) => void
	onCardCopy: (listId: string, newCard: ICardResponse) => void
	onListCopy: ( newList: IListResponse) => void
}

export const ListItem = ({ list, index, onListDelete, onCardCreate, onCardDelete, onCardCopy, onListCopy }: ListItemProps) => {
	const textareaRef = useRef<ElementRef<'textarea'>>(null)
	const [isEditing, setIsEditing] = useState(false)

	const disableEditing = () => {
		setIsEditing(false)
	}

	const enableEditing = () => {
		setIsEditing(true)
		setTimeout(() => {
			textareaRef.current?.focus()
		})
	}

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
							className='w-full rounded-md bg-[#0e0f0f] shadow-md pb-2'
						>
							<ListHeader
							onListCopy={onListCopy}
								onListDelete={onListDelete}
								onAddCard={enableEditing}
								data={list}
							/>
							<Droppable
								droppableId={list!.id}
								type='card'
							>
								{(provided, snapshot) => (
									<ol
										ref={provided.innerRef}
										{...provided.droppableProps}
										className={cn('mx-1 px-1 py-0.5 flex flex-col gap-y-2', snapshot.isDraggingOver ? 'border border--border border-dashed rounded-md' : '' )}
									>
										{list.cards &&
											list.cards.map((card, index) => (

												<Draggable
												key={card.id}
												draggableId={card.id}
												index={index}
											>
												{(provided, snapshot) => (
													<div
														ref={provided.innerRef}
														{...provided.draggableProps}
														{...provided.dragHandleProps}
		
													>
										<CardItem
										onCardCopy={onCardCopy}
													onDeleteCard={onCardDelete}
													index={index}
													key={card.id}
													data={card}
												/>
													</div>
												)}
											</Draggable>
		
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
