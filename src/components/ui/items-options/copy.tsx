import { CopyIcon } from 'lucide-react'
import React from 'react'

import { Button } from '@/components/ui/button'

import { useCopyCard } from '../../../app/i/scrumban/hooks/card/useCopyCard'
import { useCopyList } from '../../../app/i/scrumban/hooks/list/useCopyList'

interface ICopyProps {
	cardId?: string
	listId: string
	boardId?: string
}

const Copy = ({ cardId, listId, boardId }: ICopyProps) => {
	const { copyCard } = useCopyCard()
	const { copyList } = useCopyList()

	const onCopy = (event: React.MouseEvent) => {
		event.stopPropagation()
		if (cardId) {
			copyCard({ cardId, listId })
		} else if (boardId) {
			copyList({ listId, boardId })
		}
	}

	return (
		<Button
			onClick={onCopy}
			variant='outline'
			type='submit'
			size='sm'
			className='px-3'
		>
			<CopyIcon className='h-4 w-4' />
			<span className='ml-1'>Copy</span>
		</Button>
	)
}

export default Copy
