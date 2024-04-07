'use client'

import { ICardResponse } from '@/types/card.types'
import { Draggable } from '@hello-pangea/dnd'
import { useCardModal } from '../../../hooks/card/use-card-modal'


interface CardItemProps {
  data: ICardResponse | undefined
  index: number
}

export const CardItem = ({ data, index }: CardItemProps) => {
  const cardModal = useCardModal()

  return (
    <Draggable
      draggableId={data!.id}
      index={index}
    >
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          role="button"
          onClick={() => {cardModal.onOpen(data!.id); console.log('asdasd')}}
          className="truncate border-2 border-transparent hover:border-black py-2 text-foreground px-3 text-sm bg-white rounded-md shadow-sm"
        >
          {data?.name}
        </div>
      )}
    </Draggable>
  )
}
