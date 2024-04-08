'use client'

import { Copy, Trash } from 'lucide-react'
import { useParams } from 'next/navigation'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

import { ICardResponse } from '@/types/card.types'

import { useAction } from '@/hooks/use-action'

// import { copyCard } from '@/actions/copy-card'
import { useCardModal } from '@/app/i/scrumban/hooks/card/use-card-modal'
import { cardService } from '@/services/card.service'

interface ActionsProps {
	data: ICardResponse
}

export const Actions = ({ data }: ActionsProps) => {
	const params = useParams()
	const cardModal = useCardModal()

	// const { execute: executeCopyCard, isLoading: isLoadingCopy } = useAction(
	//   copyCard,
	//   {
	//     onSuccess: (data) => {
	//       toast.success(`Card "${data.title}" copied`)
	//       cardModal.onClose()
	//     },
	//     onError: (error) => {
	//       toast.error(error)
	//     },
	//   }
	// )

	const onCopy = () => {
		const boardId = params.boardId as string

		// executeCopyCard({
		//   id: data.id,
		//   boardId,
		// })
	}


	// const { execute: executeDeleteCard, isLoading: isLoadingDelete } = useAction(
	// 	cardService.deleteCard.bind(cardService),
	// 	{
	// 		onSuccess: data => {

	// 			toast.success(`Card "${data.name}" deleted`)
	// 			cardModal.onClose()
	// 		},
	// 		onError: error => {
	// 			toast.error(error)
	// 		}
	// 	}
	// )


	// const onDelete = () => {
	// 	executeDeleteCard(data.id)
	// }

	return (
		<div className='space-y-2 mt-2'>
			<p className='text-xs font-semibold'>Actions</p>
			<Button
				onClick={onCopy}
				// disabled={isLoadingCopy}
				variant='gray'
				className='w-full justify-start'
				size='inline'
			>
				<Copy className='h-4 w-4 mr-2' />
				Copy
			</Button>
			<Button
				// onClick={onDelete}
				// disabled={isLoadingDelete}
				variant='gray'
				className='w-full justify-start'
				size='inline'
			>
				<Trash className='h-4 w-4 mr-2' />
				Delete
			</Button>
		</div>
	)
}

Actions.Skeleton = function ActionsSkeleton() {
	return (
		<div className='space-y-2 mt-2'>
			<Skeleton className='w-20 h-4 bg-neutral-200' />
			<Skeleton className='w-full h-8 bg-neutral-200' />
			<Skeleton className='w-full h-8 bg-neutral-200' />
		</div>
	)
}
