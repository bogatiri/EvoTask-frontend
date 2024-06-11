import { useMutation, useQueryClient } from '@tanstack/react-query'

import { TypeCardFormState } from '@/types/card.types'

import { cardService } from '@/services/card.service'
import { toast } from 'sonner'

export function useMoveCardToAnotherList() {
	const queryClient = useQueryClient()

	const { mutate: moveCardToAnotherList } = useMutation({
		mutationKey: ['move card to another list'],
		mutationFn: ({ cardId, listId }: { cardId: string; listId: string}) =>
			cardService.moveCardToAnotherList({cardId, listId}),
		onSuccess: data => {
			console.log(data)
			toast.success(`Card moved successfully`)
			queryClient.invalidateQueries({ queryKey: ['sprint'] })
			queryClient.invalidateQueries({ queryKey: ['list'] })
			queryClient.invalidateQueries({queryKey: ['cards']})
		}
	})

	return { moveCardToAnotherList }
}
