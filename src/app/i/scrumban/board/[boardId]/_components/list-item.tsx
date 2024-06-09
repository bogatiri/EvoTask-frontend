'use client'

import { Draggable, Droppable } from '@hello-pangea/dnd'
import { ElementRef, useRef, useState } from 'react'

import { IListResponse } from '@/types/list.types'

import CardForm from './card-form'
import CardItem from './card-item'
import ListHeader from './list-header'
import { cn } from '@/lib/utils'

interface ListItemProps {
	orderedData: IListResponse[]
	list: IListResponse
	index: number
}

const ListItem = ({ list, index, orderedData }: ListItemProps) => {
	const textareaRef = useRef<ElementRef<'textarea'>>(null)
	const [isEditing, setIsEditing] = useState(false)
	const cardsEndRef = useRef<HTMLDivElement>(null)

	const disableEditing = () => {
		setIsEditing(false)
		setTimeout(() => {
			if (cardsEndRef.current) {
				cardsEndRef.current.scrollIntoView({
					behavior: 'smooth',
					block: 'end',
					inline: 'nearest'
				})
			}
		}, 100)
	}

	const enableEditing = () => {
		setIsEditing(true)
		setTimeout(() => {
			textareaRef.current?.focus()
		})
	}

	const scrollContainer = document.querySelector('.board-container')
	let isScrolling: any
	let lastScrollLeft = scrollContainer?.scrollLeft // Сохраняем начальное положение горизонтального скролла

	scrollContainer?.addEventListener('scroll', (e) => {
		if (window.innerWidth < 768) {
			const currentScrollLeft = scrollContainer.scrollLeft;
			if (lastScrollLeft !== currentScrollLeft) {
				window.clearTimeout(isScrolling);
				isScrolling = setTimeout(() => {
					const items = scrollContainer.querySelectorAll('.list-item');
					let nearestItem;
					let nearestDistance = Infinity;
		
					for (const item of items) {
						const rect = item.getBoundingClientRect();
						const distance = Math.abs(rect.left + (rect.width / 2) - (window.innerWidth / 2));
		
						if (distance < nearestDistance) {
							nearestDistance = distance;
							nearestItem = item;
						}
					}
		
					if (nearestItem) {
						nearestItem.scrollIntoView({
							behavior: 'smooth',
							block: 'center',
							inline: 'center',
						});
					}
				}, 66); 
			}
		
			lastScrollLeft = currentScrollLeft;
		} 
	}, false);

	return (
		<Draggable
			draggableId={list!.id}
			index={index}
		>
			{provided => (
				<li
					id={list.id}
					{...provided.draggableProps}
					ref={provided.innerRef}
					className=' shrink-0 top-30  w-[45vh] md:w-[272px] select-none'
				>
					<div
						{...provided.dragHandleProps}
						className='w-full rounded-2xl max-h-full bg-[#0e0f0f] shadow-md pb-2'
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
										'mx-1 px-1 py-0.5 custom-scrollbar flex flex-col max-h-[65vh] gap-y-2 overflow-x-hidden overflow-y-auto',
										snapshot.isDraggingOver
											&& 'border border--border border-dashed rounded-md'
											
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
															orderedData={orderedData}
															boardId={list.boardId}
															key={card.id}
															data={card}
														/>
													</div>
												)}
											</Draggable>
										))}
									{provided.placeholder}
									<div ref={cardsEndRef}></div>
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
