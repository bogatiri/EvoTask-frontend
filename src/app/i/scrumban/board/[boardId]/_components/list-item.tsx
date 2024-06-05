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

	// window.addEventListener('scroll', () => {
	// 	const item = document.getElementById(list.id)
	// 	const rect = item!.getBoundingClientRect();
	// 	console.log('asd')
	// 	if (rect.top < window.innerHeight && rect.bottom > 0) {
	// 		// Элемент частично виден, выполняем доскролл
	// 		item?.scrollIntoView({
	// 			behavior: 'smooth',
	// 			block: 'nearest'
	// 		});
	// 	}
	// }, { passive: true });

	const scrollContainer = document.querySelector('.board-container');
	console.log('asdasd', scrollContainer)

	let isScrolling: any;

	scrollContainer && scrollContainer.addEventListener('scroll', (e) => {
  window.clearTimeout(isScrolling);
  isScrolling = setTimeout(() => {
    // Логика для определения ближайшего элемента к центру видимой части
    const items = scrollContainer!.querySelectorAll('.list-item');
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
    nearestItem!.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    });
  }, 66); // Задержка в миллисекундах (часто используются 100 или 66 для 15 FPS)
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
					className='list-item shrink-0 top-30 h-full w-[300px] md:w-[272px] select-none'
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
