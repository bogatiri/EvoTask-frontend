'use client'

import { Draggable, Droppable } from '@hello-pangea/dnd'
import { ElementRef, useRef, useState } from 'react'

import { IListResponse } from '@/types/list.types'

import CardForm from './card-form'
import CardItem from './card-item'
import ListHeader from './list-header'
import { cn } from '@/lib/utils'

interface ListItemProps {
	list: IListResponse
	index: number
}

const ListItem = ({ list, index }: ListItemProps) => {
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
						<ListHeader data={list} />
						<Droppable
							droppableId={list!.id}
							type='card'
						>
							{(provided, snapshot) => (
								<ol
									ref={provided.innerRef}
									{...provided.droppableProps}
									className={cn(
										'mx-1 px-1 py-0.5 flex flex-col gap-y-2',
										snapshot.isDraggingOver
											? 'border border--border border-dashed rounded-md'
											: ''
									)}
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
															boardId={list.boardId}
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

export default ListItem
