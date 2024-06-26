'use client'

import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import { useEffect, useState } from 'react'

import { IListResponse } from '@/types/list.types'

import { useUpdateOrderCard } from '../../../hooks/card/useUpdateOrderCard'
import { useUpdateOrderList } from '../../../hooks/list/useUpdateOrderList'

import ListForm from './list-form'
import ListItem from './list-item'

interface ListContainerProps {
	list: IListResponse[]
}

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
	const result = Array.from(list)
	const [removed] = result.splice(startIndex, 1)
	result.splice(endIndex, 0, removed)

	return result
}

const ListContainer = ({ list }: ListContainerProps) => {
	const [orderedData, setOrderedData] = useState(list)
	const { updateOrderList } = useUpdateOrderList()

	const { updateOrderCard } = useUpdateOrderCard()

	useEffect(() => {
		setOrderedData(list)
	}, [list])

	const onDragEnd = (result: any) => {
		const { destination, source, type } = result

		if (!destination) {
			document.body.style.overflow = ''

			return
		}
		//if dropped in the same position
		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			document.body.style.overflow = ''

			return
		}

		// User moves a list
		if (type === 'list') {
			const items = reorder(orderedData, source.index, destination.index).map(
				(item, index) => ({ ...item, order: index })
			)

			setOrderedData(items)
			updateOrderList(items)
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
				document.body.style.overflow = ''

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
				updateOrderCard(reorderedCards)
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
				updateOrderCard(destList.cards)
			}
		}
		document.body.style.overflow = ''
	}

	const onDragStart = () => {
		document.body.style.overflow = 'hidden'
	}

	return (
		<DragDropContext
			onDragStart={onDragStart}
			onDragEnd={onDragEnd}
		>
			<Droppable
				droppableId='lists'
				type='list'
				direction='horizontal'
			>
				{provided => (
					<ol
						{...provided.droppableProps}
						ref={provided.innerRef}
						className='board-container flex gap-x-3 mt-16 h-auto pl-3 md:pl-6 pr-20'
					>
						{orderedData.map((list, index) => {
							return (
								<ListItem
									orderedData={orderedData}
									key={list.id}
									index={index}
									list={list}
								/>
							)
						})}
						{provided.placeholder}
						<ListForm
							sprintId={
								orderedData.find(list => list.sprintId !== null)?.sprintId
							}
						/>
						<div className='flex-shrink-0 w-1' />
					</ol>
				)}
			</Droppable>
		</DragDropContext>
	)
}

export default ListContainer
