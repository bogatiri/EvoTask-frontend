import { Trash } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { useDeleteBoard } from '../../../app/i/scrumban/hooks/board/useDeleteBoard'
import { useDeleteCard } from '../../../app/i/scrumban/hooks/card/useDeleteCard'
import { useDeleteList } from '../../../app/i/scrumban/hooks/list/useDeleteList'

interface IDeleteProps {
	cardId?: string
	listId?: string
	boardId?: string
}

const Delete = ({ cardId, listId, boardId }: IDeleteProps) => {
	const { deleteCard } = useDeleteCard()
	const { deleteList } = useDeleteList()
	const { deleteBoard } = useDeleteBoard()

	const onDelete = (event: React.MouseEvent) => {
		event.stopPropagation()
		if (cardId) {
			deleteCard(cardId)
		} else if (listId) {
			deleteList(listId)
		} else if (boardId) {
			deleteBoard(boardId)
		}
	}
	return (
		<Button
			type='submit'
			variant='outline'
			size='sm'
			className='px-3'
			onClick={onDelete}
		>
			<Trash size={15} />
			<span className='ml-1'>Delete</span>
		</Button>
	)
}

export default Delete
