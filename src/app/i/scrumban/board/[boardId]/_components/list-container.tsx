'use client'

import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { IListResponse } from '@/types/list.types'

import { useAction } from '@/hooks/use-action'

import { ListForm } from './list-form'
import { ListItem } from './list-item'
import { cardService } from '@/services/card.service'
import { listService } from '@/services/list.service'

interface ListContainerProps {
	list: IListResponse[]
	boardId: string
}

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
	const result = Array.from(list)
	const [removed] = result.splice(startIndex, 1)
	result.splice(endIndex, 0, removed)

	return result
}

export const ListContainer = ({ list, boardId }: ListContainerProps) => {
	const [orderedData, setOrderedData] = useState(list)
	const onListCreate = (newList: IListResponse) => {
		const updatedLists = [...orderedData!, newList]
		setOrderedData(updatedLists)
	}

	const onListDelete = (id: string) => {
		setOrderedData(currentLists => currentLists.filter(list => list.id !== id))
	}

	const { execute: executeUpdateListOrder } = useAction(
		listService.updateOrder.bind(listService),
		{
			onSuccess: () => {
				toast.success('List reordered')
			},
			onError: error => {
				toast.error(error)
			}
		}
	)

	const { execute: executeUpdateCardOrder } = useAction(
		cardService.updateOrder.bind(cardService),
		{
			onSuccess: () => {
				toast.success('Card reordered')
			},
			onError: error => {
				toast.error(error)
			}
		}
	)



	useEffect(() => {
		setOrderedData(list)
	}, [list])

	const onDragEnd = (result: any) => {
		const { destination, source, type } = result

		if (!destination) {
			return
		}
		//if dropped in the same position
		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			return
		}

		// User moves a list
		if (type === 'list') {
			const items = reorder(orderedData, source.index, destination.index).map(
				(item, index) => ({ ...item, order: index })
			)

			setOrderedData(items)
			executeUpdateListOrder(items)
		}

		// User moves a card
		if (type === 'card') {
			let newOrderedData = [...orderedData]

			// Source and destination list
			const sourceList = newOrderedData.find(
				cards => cards.id === source.droppableId
			)
			const destList = newOrderedData.find(
				cards => cards.id === destination.droppableId
			)

			if (!sourceList || !destList) {
				return
			}

			// Check if cards exists on the sourceCard
			if (!sourceList.cards) {
				sourceList.cards = []
			}

			// Check if cards exists on the destCard
			if (!destList.cards) {
				destList.cards = []
			}

			// Moving the card in the same card
			if (source.droppableId === destination.droppableId) {
				const reorderedCards = reorder(
					sourceList.cards,
					source.index,
					destination.index
				)

				reorderedCards.forEach((card, idx) => {
					card.order = idx
				})

				sourceList.cards = reorderedCards

				setOrderedData(newOrderedData)
				executeUpdateCardOrder(
					reorderedCards
				)
				//User moves the card to another list
			} else {
				// Remove card from the source list
				const [movedCard] = sourceList.cards.splice(source.index, 1)

			 	// Assign the new listId to the moved card
				movedCard.listId = destination.droppableId

			 	// Add card to the destination list
				destList.cards.splice(destination.index, 0, movedCard)

				sourceList.cards.forEach((card, idx) => {
					card.order = idx
				})

				//Update the order for each card in the destination list
				destList.cards.forEach((card, idx) => {
					card.order = idx
				})

				setOrderedData(newOrderedData)
				executeUpdateCardOrder(
					destList.cards
				)
			}
		}
	}

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable
				droppableId='lists'
				type='list'
				direction='horizontal'
			>
				{provided => (
					<ol
						{...provided.droppableProps}
						ref={provided.innerRef}
						className='flex gap-x-3 mt-24 h-full'
					>
						{orderedData.map((list, index) => {
							return (
								<ListItem
									onListDelete={onListDelete}
									key={list.id}
									index={index}
									list={list}
								/>
							)
						})}
						{provided.placeholder}
						<ListForm onListCreate={onListCreate} />
						<div className='flex-shrink-0 w-1' />
					</ol>
				)}
			</Droppable>
		</DragDropContext>
	)
}
